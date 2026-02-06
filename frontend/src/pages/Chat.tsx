import { useLayoutEffect, useState } from "react";
import { Box, Avatar, Typography, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";
import Footer from "../components/footer/Footer";
import { FaRobot, FaUser, FaTrash, FaComments } from "react-icons/fa";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const handleSubmit = async (content: string) => {
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);



  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        pt: 2,
        gap: 3,
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.25,
          flexDirection: "column",
          px: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "80vh",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(15px)",
            borderRadius: 4,
            border: "1px solid rgba(255,255,255,0.1)",
            flexDirection: "column",
            p: 3,
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          }}
        >
          {/* User Profile Section */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Avatar
              sx={{
                mx: "auto",
                mb: 2,
                width: 80,
                height: 80,
                bgcolor: auth?.isLoggedIn ? "linear-gradient(45deg, #ff6b6b, #ffa500)" : "linear-gradient(45deg, #00fffc, #667eea)",
                color: "white",
                fontWeight: 700,
                fontSize: "24px",
                boxShadow: auth?.isLoggedIn ? "0 8px 25px rgba(255,107,107,0.3)" : "0 8px 25px rgba(0,255,252,0.3)",
                border: "3px solid rgba(255,255,255,0.2)",
              }}
            >
              {auth?.isLoggedIn ? <FaUser /> : <FaRobot />}
            </Avatar>
            <Typography
              sx={{
                fontWeight: 600,
                color: "white",
                fontSize: "18px",
                mb: 1,
              }}
            >
              {auth?.isLoggedIn ? "Welcome back!" : "Try our AI Assistant"}
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "14px",
              }}
            >
              {auth?.isLoggedIn ? auth.user?.name : ""}
            </Typography>
          </Box>

          {/* AI Info Section */}
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Box sx={{ mb: 2 }}>
              <FaRobot size={40} color="#00fffc" />
            </Box>
            <Typography
              sx={{
                fontWeight: 600,
                color: "#00fffc",
                mb: 2,
                fontSize: "16px",
              }}
            >
              AI Assistant Active
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "14px",
                lineHeight: 1.5,
                px: 1,
              }}
            >
              Ask questions about knowledge, business, advice, education, and more. Keep conversations productive!
            </Typography>
          </Box>

          {/* Stats Section */}
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "14px",
                mb: 1,
              }}
            >
              Messages in this session:
            </Typography>
            <Typography
              sx={{
                color: "#00fffc",
                fontSize: "24px",
                fontWeight: 700,
              }}
            >
              {chatMessages.length}
            </Typography>
          </Box>

          {/* Clear Conversation Button */}
          <Button
            onClick={handleDeleteChats}
            sx={{
              width: "100%",
              py: 1.5,
              color: "white",
              fontWeight: 600,
              borderRadius: 3,
              background: "linear-gradient(45deg, #ff6b6b, #ffa500)",
              border: "1px solid rgba(255,107,107,0.3)",
              "&:hover": {
                background: "linear-gradient(45deg, #ff5252, #ff8c00)",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(255,107,107,0.4)",
              },
              transition: "all 0.3s ease",
            }}
            startIcon={<FaTrash />}
          >
            Clear Chat
          </Button>
        </Box>
      </Box>

      {/* Main Chat Area */}
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.75, xs: 1, sm: 1 },
          flexDirection: "column",
          px: { md: 3, xs: 1 },
          pb: 2,
        }}
      >
        {/* Chat Header */}
        <Box sx={{ mb: 3, textAlign: "center" }}>
          <Typography
            sx={{
              fontSize: { xs: "28px", md: "40px" },
              fontWeight: 700,
              background: "linear-gradient(45deg, #00fffc, #667eea)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            AI Chat Assistant
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "16px",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Your intelligent companion for knowledge, advice, and engaging conversations
          </Typography>
        </Box>

        {/* Messages Container */}
        <Box
          sx={{
            flex: 1,
            width: "100%",
            maxWidth: "800px",
            mx: "auto",
            background: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(10px)",
            borderRadius: 4,
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          }}
        >
          <Box
            sx={{
              flex: 1,
              p: 3,
              overflow: "auto",
              overflowX: "hidden",
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-track": {
                background: "rgba(255,255,255,0.1)",
                borderRadius: "3px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "rgba(0,255,252,0.3)",
                borderRadius: "3px",
                "&:hover": {
                  background: "rgba(0,255,252,0.5)",
                },
              },
            }}
          >
            {chatMessages.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  textAlign: "center",
                  py: 4,
                }}
              >
                <FaComments size={60} color="#00fffc" style={{ marginBottom: 20, opacity: 0.6 }} />
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "18px",
                    mb: 2,
                    fontWeight: 500,
                  }}
                >
                  Start a conversation
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "14px",
                    maxWidth: "400px",
                    lineHeight: 1.6,
                  }}
                >
                  Ask me anything! I'm here to help with knowledge, advice, education, and more.
                </Typography>
              </Box>
            ) : (
              chatMessages.map((chat, index) => (
                <ChatItem content={chat.content} role={chat.role} key={index} />
              ))
            )}
          </Box>
        </Box>

        <Footer onSend={handleSubmit} />
      </Box>
    </Box>
  );
};

export default Chat;
