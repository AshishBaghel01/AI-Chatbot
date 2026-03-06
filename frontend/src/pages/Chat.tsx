import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { Box, Avatar, Typography, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import ProcessingChatItem from "../components/chat/ProcessingChatItem";
import { AxiosError } from "axios";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";
import Footer from "../components/footer/Footer";
import { FaRobot, FaUser, FaTrash, FaComments, FaHistory } from "react-icons/fa";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type HistorySession = {
  id: string;
  title: string;
  createdAt: string;
  messages: Message[];
};

const MAX_HISTORY_ITEMS = 25;

const getHistoryStorageKey = (email?: string) =>
  `ai-chatbot-history:${(email || "guest").toLowerCase()}`;

const getSessionTitle = (messages: Message[]) => {
  const firstUserMessage = messages.find((message) => message.role === "user");
  if (!firstUserMessage) {
    return "Untitled chat";
  }
  const normalized = firstUserMessage.content.trim().replace(/\s+/g, " ");
  return normalized.length > 44 ? `${normalized.slice(0, 44)}...` : normalized;
};

const createHistorySession = (messages: Message[]): HistorySession => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  title: getSessionTitle(messages),
  createdAt: new Date().toISOString(),
  messages,
});

const Chat = () => {
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [historySessions, setHistorySessions] = useState<HistorySession[]>([]);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null);
  const [loadedHistoryKey, setLoadedHistoryKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const selectedHistory = useMemo(
    () => historySessions.find((session) => session.id === selectedHistoryId),
    [historySessions, selectedHistoryId]
  );

  const displayedMessages = selectedHistory?.messages ?? chatMessages;
  const historyStorageKey = getHistoryStorageKey(auth?.user?.email);

  const handleSubmit = async (content: string) => {
    if (selectedHistoryId) {
      toast.error("Open current chat to send new messages.");
      return;
    }
    
    // Check if user is authenticated before sending message
    if (!auth?.isLoggedIn) {
      toast.error("Please login to send messages.");
      return;
    }
    
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);
    try {
      const chatData = await sendChatRequest(content);
      setIsLoading(false);
      if (chatData?.chats && Array.isArray(chatData.chats)) {
        setChatMessages([...chatData.chats]);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      setIsLoading(false);
      // Remove the user message that failed to send
      setChatMessages((prev) => prev.slice(0, -1));
      
      // Handle specific error cases
      const axiosError = error as AxiosError<unknown>;
      if (axiosError.message?.includes("Session expired")) {
        toast.error("Session expired. Please login again.");
      } else if (axiosError.response?.status === 401) {
        toast.error("Not authenticated. Please login again.");
      } else {
        toast.error("Failed to send message.");
      }
      console.error("Error sending chat:", error);
    }
  };

  const archiveCurrentChat = (messages: Message[]) => {
    if (!messages.length) return;
    const historySession = createHistorySession(messages);
    setHistorySessions((prev) => [historySession, ...prev].slice(0, MAX_HISTORY_ITEMS));
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      const messagesToArchive = [...chatMessages];
      await deleteUserChats();
      archiveCurrentChat(messagesToArchive);
      setChatMessages([]);
      setSelectedHistoryId(null);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 401) {
        toast.error("Please login to delete chats", { id: "deletechats" });
      } else {
        console.log(error);
        toast.error("Deleting chats failed", { id: "deletechats" });
      }
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          if (data && data.chats) {
            setChatMessages([...data.chats]);
          }
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          const axiosError = err as AxiosError;
          if (axiosError?.response?.status === 401) {
            // Clear toasts and redirect to login if auth fails
            toast.error("Session expired. Please login again.", { id: "loadchats" });
          } else {
            console.log(err);
            toast.error("Loading Failed", { id: "loadchats" });
          }
        });
    }
  }, [auth]);

  useEffect(() => {
    try {
      const rawData = localStorage.getItem(historyStorageKey);
      if (!rawData) {
        setHistorySessions([]);
        setLoadedHistoryKey(historyStorageKey);
        return;
      }
      const parsedData = JSON.parse(rawData) as HistorySession[];
      if (!Array.isArray(parsedData)) {
        setHistorySessions([]);
        setLoadedHistoryKey(historyStorageKey);
        return;
      }
      setHistorySessions(parsedData);
      setLoadedHistoryKey(historyStorageKey);
    } catch {
      setHistorySessions([]);
      setLoadedHistoryKey(historyStorageKey);
    }
  }, [historyStorageKey]);

  useEffect(() => {
    if (loadedHistoryKey !== historyStorageKey) return;
    localStorage.setItem(historyStorageKey, JSON.stringify(historySessions));
  }, [historySessions, historyStorageKey, loadedHistoryKey]);

  const clearSavedHistories = () => {
    setHistorySessions([]);
    setSelectedHistoryId(null);
    toast.success("Saved histories cleared");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
        pt: 2,
        gap: 3,
        pb: 2,
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.22,
          flexDirection: "column",
          px: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "calc(100vh - 100px)",
            background: "linear-gradient(135deg, rgba(102,126,234,0.08), rgba(118,75,162,0.08))",
            backdropFilter: "blur(20px)",
            borderRadius: 3,
            border: "1px solid rgba(0,255,252,0.1)",
            flexDirection: "column",
            p: 3,
            boxShadow: "0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)",
            scrollBehavior: "smooth",
            overflow: "auto",
          }}
        >
          {/* User Profile Section */}
          <Box sx={{ textAlign: "center", mb: 5, pb: 4, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <Avatar
              sx={{
                mx: "auto",
                mb: 3,
                width: 72,
                height: 72,
                bgcolor: auth?.isLoggedIn
                  ? "linear-gradient(135deg, #667eea, #764ba2)"
                  : "linear-gradient(135deg, #00fffc, #00d4d4)",
                color: "white",
                fontWeight: 700,
                fontSize: "24px",
                boxShadow: auth?.isLoggedIn
                  ? "0 8px 25px rgba(102,126,234,0.3)"
                  : "0 8px 25px rgba(0,255,252,0.3)",
                border: "3px solid rgba(255,255,255,0.15)",
              }}
            >
              {auth?.isLoggedIn ? <FaUser /> : <FaRobot />}
            </Avatar>
            <Typography
              sx={{
                fontWeight: 700,
                color: "#e4e4e7",
                fontSize: "16px",
                mb: 1,
              }}
            >
              {auth?.isLoggedIn ? "Welcome back!" : "Try our AI Assistant"}
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "13px",
              }}
            >
              {auth?.isLoggedIn ? auth.user?.name : "Guest User"}
            </Typography>
          </Box>

          {/* AI Info Section */}
          <Box sx={{ mb: 5, pb: 4, textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
              <Box sx={{ animation: "pulse 2s ease-in-out infinite" }}>
                <FaRobot size={40} color="#00fffc" />
              </Box>
            </Box>
            <Typography
              sx={{
                fontWeight: 700,
                color: "#00fffc",
                mb: 2,
                fontSize: "15px",
              }}
            >
              AI Assistant
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "13px",
                lineHeight: 1.6,
                px: 1,
              }}
            >
              Ask questions about knowledge, business, advice, education, and more.
            </Typography>
          </Box>

          {/* Stats Section */}
          <Box sx={{ mb: 5, pb: 4, textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "13px",
                mb: 2,
              }}
            >
              Messages in session
            </Typography>
            <Typography
              sx={{
                color: "#00fffc",
                fontSize: "32px",
                fontWeight: 800,
              }}
            >
              {displayedMessages.length}
            </Typography>
          </Box>

          {/* Chat History Section */}
          <Box sx={{ mb: 4, pb: 3, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <Typography
              sx={{
                color: "#e4e4e7",
                fontWeight: 700,
                fontSize: "14px",
                mb: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <FaHistory size={13} />
              Chat Histories
            </Typography>

            <Button
              onClick={() => setSelectedHistoryId(null)}
              fullWidth
              size="small"
              sx={{
                mb: 1.2,
                justifyContent: "flex-start",
                borderRadius: 2,
                textTransform: "none",
                color: !selectedHistoryId ? "#0a0a0a" : "rgba(255,255,255,0.8)",
                background: !selectedHistoryId
                  ? "linear-gradient(135deg, #00fffc, #00d4d4)"
                  : "rgba(255,255,255,0.05)",
                "&:hover": {
                  background: !selectedHistoryId
                    ? "linear-gradient(135deg, #00e5e0, #00b8b0)"
                    : "rgba(255,255,255,0.08)",
                },
              }}
            >
              Current Chat
            </Button>

            <Box sx={{ maxHeight: "180px", overflowY: "auto", pr: 0.6 }}>
              {historySessions.length === 0 && (
                <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", mt: 1 }}>
                  No saved history yet.
                </Typography>
              )}
              {historySessions.map((session) => (
                <Button
                  key={session.id}
                  onClick={() => setSelectedHistoryId(session.id)}
                  fullWidth
                  size="small"
                  sx={{
                    mb: 1,
                    py: 1,
                    px: 1.2,
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    textTransform: "none",
                    borderRadius: 2,
                    background:
                      selectedHistoryId === session.id ? "rgba(102,126,234,0.24)" : "rgba(255,255,255,0.04)",
                    color: "rgba(255,255,255,0.9)",
                    border:
                      selectedHistoryId === session.id
                        ? "1px solid rgba(102,126,234,0.45)"
                        : "1px solid rgba(255,255,255,0.08)",
                    "&:hover": {
                      background: "rgba(102,126,234,0.2)",
                    },
                  }}
                >
                  <Box sx={{ textAlign: "left", width: "100%" }}>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#e4e4e7",
                        lineHeight: 1.3,
                        fontWeight: 600,
                        mb: 0.4,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {session.title}
                    </Typography>
                    <Typography sx={{ fontSize: "11px", color: "rgba(255,255,255,0.55)" }}>
                      {new Date(session.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                </Button>
              ))}
            </Box>

            {historySessions.length > 0 && (
              <Button
                onClick={clearSavedHistories}
                fullWidth
                size="small"
                sx={{
                  mt: 1.5,
                  textTransform: "none",
                  borderRadius: 2,
                  color: "rgba(255,255,255,0.8)",
                  background: "rgba(255,255,255,0.06)",
                  "&:hover": {
                    background: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                Clear Saved Histories
              </Button>
            )}
          </Box>

          {/* Clear Conversation Button - Only show when logged in */}
          {auth?.isLoggedIn && (
            <Button
              onClick={handleDeleteChats}
              fullWidth
              sx={{
                py: 1.5,
                color: "white",
                fontWeight: 700,
                fontSize: "0.9rem",
                borderRadius: 2,
                background: "linear-gradient(135deg, #ff6b6b, #ff5252)",
                border: "1px solid rgba(255,107,107,0.2)",
                boxShadow: "0 8px 20px rgba(255,107,107,0.2)",
                "&:hover": {
                  background: "linear-gradient(135deg, #ff5252, #ff3838)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 30px rgba(255,107,107,0.3)",
                },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              startIcon={<FaTrash />}
            >
              Clear Chat
            </Button>
          )}
        </Box>
      </Box>

      {/* Main Chat Area */}
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.78, xs: 1, sm: 1 },
          flexDirection: "column",
          px: { md: 3, xs: 1 },
          pb: 2,
        }}
      >
        {/* Chat Header */}
        <Box sx={{ mb: 4, textAlign: "center", pt: 2 }}>
          <Typography
            sx={{
              fontSize: { xs: "28px", md: "36px" },
              fontWeight: 800,
              color: "#e4e4e7",
              mb: 2,
            }}
          >
            AI Chat Assistant
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "14px",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Your intelligent companion for knowledge, advice, and engaging conversations
          </Typography>
        </Box>

        <Box
          sx={{
            display: { xs: "block", md: "none" },
            maxWidth: "900px",
            width: "100%",
            mx: "auto",
            mb: 2,
            px: 1,
          }}
        >
          <Typography sx={{ color: "rgba(255,255,255,0.65)", fontSize: "12px", mb: 1 }}>
            Chat Histories
          </Typography>
          <Box sx={{ display: "flex", gap: 1, overflowX: "auto", pb: 0.5 }}>
            <Button
              onClick={() => setSelectedHistoryId(null)}
              size="small"
              sx={{
                textTransform: "none",
                whiteSpace: "nowrap",
                color: !selectedHistoryId ? "#0a0a0a" : "rgba(255,255,255,0.85)",
                background: !selectedHistoryId
                  ? "linear-gradient(135deg, #00fffc, #00d4d4)"
                  : "rgba(255,255,255,0.07)",
              }}
            >
              Current
            </Button>
            {historySessions.map((session) => (
              <Button
                key={session.id}
                onClick={() => setSelectedHistoryId(session.id)}
                size="small"
                sx={{
                  textTransform: "none",
                  whiteSpace: "nowrap",
                  color: "rgba(255,255,255,0.9)",
                  background:
                    selectedHistoryId === session.id ? "rgba(102,126,234,0.28)" : "rgba(255,255,255,0.06)",
                }}
              >
                {session.title}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Messages Container */}
        <Box
          sx={{
            flex: 1,
            width: "100%",
            maxWidth: "900px",
            mx: "auto",
            background: "linear-gradient(135deg, rgba(0,255,252,0.03), rgba(102,126,234,0.03))",
            backdropFilter: "blur(15px)",
            borderRadius: 3,
            border: "1px solid rgba(0,255,252,0.1)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,255,252,0.05)",
          }}
        >
          <Box
            sx={{
              flex: 1,
              p: { xs: 2, md: 3 },
              overflow: "auto",
              overflowX: "hidden",
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: "rgba(0,255,252,0.05)",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "rgba(0,255,252,0.25)",
                borderRadius: "4px",
                "&:hover": {
                  background: "rgba(0,255,252,0.4)",
                },
              },
            }}
          >
            {displayedMessages.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  textAlign: "center",
                  py: 6,
                }}
              >
                <Box sx={{ mb: 3, animation: "pulse 2s ease-in-out infinite" }}>
                  <FaComments size={60} color="#00fffc" style={{ opacity: 0.5 }} />
                </Box>
                <Typography
                  sx={{
                    color: "#e4e4e7",
                    fontSize: "18px",
                    mb: 2,
                    fontWeight: 600,
                  }}
                >
                  Start a conversation
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "14px",
                    maxWidth: "400px",
                    lineHeight: 1.7,
                  }}
                >
                  Ask me anything! I'm here to help with knowledge, advice, education, and more.
                </Typography>
              </Box>
            ) : (
              <>
                {displayedMessages
                  .filter((chat) => chat && chat.content && chat.role)
                  .map((chat, index) => (
                    <ChatItem content={chat.content} role={chat.role} key={index} />
                  ))}
                {isLoading && <ProcessingChatItem />}
              </>
            )}
          </Box>
        </Box>

        {selectedHistory && (
          <Box
            sx={{
              mt: 2,
              mx: "auto",
              width: "100%",
              maxWidth: "900px",
              p: 1.5,
              borderRadius: 2,
              background: "rgba(102,126,234,0.12)",
              border: "1px solid rgba(102,126,234,0.3)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1.5,
            }}
          >
            <Typography sx={{ color: "#d4d4d8", fontSize: "13px", fontWeight: 500 }}>
              Viewing saved history: {selectedHistory.title}
            </Typography>
            <Button
              onClick={() => setSelectedHistoryId(null)}
              size="small"
              sx={{
                textTransform: "none",
                color: "#0a0a0a",
                background: "linear-gradient(135deg, #00fffc, #00d4d4)",
                "&:hover": {
                  background: "linear-gradient(135deg, #00e5e0, #00b8b0)",
                },
              }}
            >
              Back to Current Chat
            </Button>
          </Box>
        )}

        <Footer onSend={handleSubmit} isLoading={isLoading} />
      </Box>
    </Box>
  );
};

export default Chat;
