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
        animation: "slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
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
            bgcolor: isAssistant
              ? "linear-gradient(135deg, #00fffc, #00d4d4)"
              : "linear-gradient(135deg, #667eea, #764ba2)",
            color: "white",
            width: 44,
            height: 44,
            boxShadow: isAssistant
              ? "0 8px 25px rgba(0,255,252,0.3)"
              : "0 8px 25px rgba(102,126,234,0.3)",
            border: "2px solid rgba(255,255,255,0.1)",
            flexShrink: 0,
          }}
        >
          {isAssistant ? (
            <FaRobot size={22} />
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
            p: 3,
            borderRadius: 3,
            bgcolor: isAssistant
              ? "rgba(255,255,255,0.06)"
              : "linear-gradient(135deg, rgba(102,126,234,0.2), rgba(118,75,162,0.2))",
            color: isAssistant ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.98)",
            backdropFilter: "blur(20px)",
            boxShadow: isAssistant
              ? "0 4px 20px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.08)"
              : "0 8px 30px rgba(102,126,234,0.25), 0 0 0 1px rgba(102,126,234,0.2)",
            border: isAssistant
              ? "1px solid rgba(0,255,252,0.15)"
              : "1px solid rgba(102,126,234,0.3)",
            position: "relative",
            maxWidth: "100%",
            wordWrap: "break-word",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: "18px",
              [isAssistant ? "left" : "right"]: "-6px",
              width: 0,
              height: 0,
              borderStyle: "solid",
              borderWidth: isAssistant ? "6px 6px 6px 0" : "6px 0 6px 6px",
              borderColor: isAssistant
                ? `rgba(255,255,255,0.06) transparent rgba(255,255,255,0.06) rgba(255,255,255,0.06)`
                : `rgba(102,126,234,0.2) rgba(102,126,234,0.2) transparent rgba(102,126,234,0.2)`,
            },
          }}
        >
          {!messageBlocks && (
            <Typography
              sx={{
                fontSize: "0.95rem",
                lineHeight: 1.8,
                fontWeight: 400,
                letterSpacing: "0.2px",
              }}
            >
              {content}
            </Typography>
          )}

          {messageBlocks &&
            messageBlocks.map((block, index) =>
              isCodeBlock(block) ? (
                <Box key={index} sx={{ my: 2 }}>
                  <SyntaxHighlighter
                    style={coldarkDark}
                    language="javascript"
                    customStyle={{
                      borderRadius: "10px",
                      padding: "14px",
                      fontSize: "13px",
                      margin: 0,
                      background: "rgba(0,0,0,0.4)",
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
                    lineHeight: 1.8,
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
