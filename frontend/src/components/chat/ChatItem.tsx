import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaRobot } from "react-icons/fa";

function extractCodeFromString(message: string) {
  if (message.includes("```")) {
    return message.split("```");
  }
}

function isCodeBlock(str: string) {
  return (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("//") ||
    str.includes("import") ||
    str.includes("const ")
  );
}

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();

  const isAssistant = role === "assistant";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isAssistant ? "flex-start" : "flex-end",
        px: { xs: 1, md: 3 },
        my: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isAssistant ? "row" : "row-reverse",
          gap: 2,
          maxWidth: "85%",
          alignItems: "flex-start",
        }}
      >
        {/* Avatar */}
        <Avatar
          sx={{
            bgcolor: isAssistant ? "#343541" : "#ececec",
            color: isAssistant ? "#ececec" : "#000000",
            width: 36,
            height: 36,
            flexShrink: 0,
          }}
        >
          {isAssistant ? (
            <FaRobot size={18} />
          ) : (
            <>
              {auth?.user?.name?.[0]}
              {auth?.user?.name?.split(" ")?.[1]?.[0]}
            </>
          )}
        </Avatar>

        {/* Message Bubble */}
        <Box
          sx={{
            p: 2.5,
            borderRadius: 2,
            bgcolor: isAssistant ? "#202123" : "#343541",
            color: "#ececec",
            position: "relative",
            maxWidth: "100%",
            wordWrap: "break-word",
            overflow: "hidden",
          }}
        >
          {!messageBlocks && (
            <Typography
              sx={{
                fontSize: "0.95rem",
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              {content}
            </Typography>
          )}

          {messageBlocks &&
            messageBlocks.map((block, index) =>
              isCodeBlock(block) ? (
                <Box key={index} sx={{ my: 1.5 }}>
                  <SyntaxHighlighter
                    style={coldarkDark}
                    language="javascript"
                    customStyle={{
                      borderRadius: "8px",
                      padding: "12px",
                      fontSize: "13px",
                      margin: 0,
                      background: "#1a1a1a",
                    }}
                  >
                    {block.trim()}
                  </SyntaxHighlighter>
                </Box>
              ) : (
                <Typography
                  key={index}
                  sx={{
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                    my: 1,
                  }}
                >
                  {block}
                </Typography>
              )
            )}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatItem;

