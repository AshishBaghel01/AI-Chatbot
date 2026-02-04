import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

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
        px: { xs: 1, md: 4 },
        my: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isAssistant ? "row" : "row-reverse",
          gap: 1.5,
          maxWidth: "85%",
        }}
      >
        {/* Avatar */}
        <Avatar
          sx={{
            bgcolor: isAssistant ? "#0f172a" : "#111",
            color: "white",
            width: 42,
            height: 42,
            boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
          }}
        >
          {isAssistant ? (
            <img src="openai.png" alt="ai" width="24px" />
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
            p: 2,
            borderRadius: 3,
            bgcolor: isAssistant
              ? "rgba(0, 77, 86, 0.08)"
              : "linear-gradient(135deg, #004d56, #006d77)",
            color: isAssistant ? "#e5e7eb" : "white",
            backdropFilter: "blur(10px)",
            boxShadow: isAssistant
              ? "0 4px 12px rgba(0,0,0,0.2)"
              : "0 6px 16px rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.05)",
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
