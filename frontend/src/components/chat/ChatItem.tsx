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
        my: 3,
        animation: "slideUp 0.5s ease-out",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isAssistant ? "row" : "row-reverse",
          gap: 2,
          maxWidth: "80%",
          alignItems: "flex-start",
        }}
      >
        {/* Avatar */}
        <Avatar
          sx={{
            bgcolor: isAssistant
              ? "linear-gradient(45deg, #00fffc, #667eea)"
              : "linear-gradient(45deg, #ff6b6b, #ffa500)",
            color: "white",
            width: 48,
            height: 48,
            boxShadow: isAssistant
              ? "0 8px 25px rgba(0,255,252,0.3)"
              : "0 8px 25px rgba(255,107,107,0.3)",
            border: "2px solid rgba(255,255,255,0.1)",
          }}
        >
          {isAssistant ? (
            <FaRobot size={24} />
          ) : (
            <>
              {auth?.user?.name[0]}
              {auth?.user?.name.split(" ")[1]?.[0]}
            </>
          )}
        </Avatar>

        {/* Message Bubble */}
        <Box
          sx={{
            p: 3,
            borderRadius: 4,
            bgcolor: isAssistant
              ? "rgba(255,255,255,0.05)"
              : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: isAssistant ? "rgba(255,255,255,0.9)" : "white",
            backdropFilter: "blur(15px)",
            boxShadow: isAssistant
              ? "0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)"
              : "0 12px 40px rgba(102,126,234,0.4), 0 0 0 1px rgba(255,255,255,0.2)",
            border: isAssistant
              ? "1px solid rgba(0,255,252,0.2)"
              : "1px solid rgba(255,255,255,0.3)",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: "20px",
              [isAssistant ? "left" : "right"]: "-8px",
              width: 0,
              height: 0,
              border: "8px solid transparent",
              borderTopColor: isAssistant
                ? "rgba(255,255,255,0.05)"
                : "#667eea",
              borderBottom: "none",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
            },
          }}
        >
          {!messageBlocks && (
            <Typography
              sx={{
                fontSize: "16px",
                lineHeight: 1.7,
                fontWeight: 400,
                letterSpacing: "0.3px",
              }}
            >
              {content}
            </Typography>
          )}

          {messageBlocks &&
            messageBlocks.map((block, index) =>
              isCodeBlock(block) ? (
                <Box key={index} sx={{ my: 1 }}>
                  <SyntaxHighlighter
                    style={coldarkDark}
                    language="javascript"
                    customStyle={{
                      borderRadius: "12px",
                      padding: "16px",
                      fontSize: "14px",
                      margin: 0,
                    }}
                  >
                    {block.trim()}
                  </SyntaxHighlighter>
                </Box>
              ) : (
                <Typography
                  key={index}
                  sx={{
                    fontSize: "16px",
                    lineHeight: 1.7,
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
