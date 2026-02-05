import { Box, IconButton, TextField } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import { useState } from "react";

const Footer = ({ onSend }: { onSend?: (msg: string) => void }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim() || !onSend) return;
    onSend(message);
    setMessage("");
  };

  if (!onSend) {
    return (
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          width: "100%",
          py: 3,
          background: "linear-gradient(to top, rgba(15,23,42,0.9), rgba(15,23,42,0.6), transparent)",
          backdropFilter: "blur(10px)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          textAlign: "center",
        }}
      >

      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "sticky",
        bottom: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        py: 3,
        background: "linear-gradient(to top, rgba(15,23,42,0.95), rgba(15,23,42,0.8), rgba(15,23,42,0.6), transparent)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Box
        sx={{
          width: { xs: "95%", md: "75%", lg: "60%" },
          display: "flex",
          alignItems: "center",
          gap: 2,
          px: 3,
          py: 2,
          borderRadius: "50px",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)",
          transition: "all 0.3s ease",
          "&:focus-within": {
            border: "1px solid #00fffc",
            boxShadow: "0 0 30px rgba(0,255,252,0.3), 0 12px 40px rgba(0,0,0,0.4)",
            background: "rgba(255,255,255,0.12)",
          },
        }}
      >
        {/* Attach Button */}
        <IconButton
          sx={{
            color: "#9ca3af",
            transition: "all 0.2s ease",
            "&:hover": {
              color: "#00fffc",
              transform: "scale(1.1)",
            },
          }}
        >
          <AttachFileRoundedIcon />
        </IconButton>

        {/* Input Field */}
        <TextField
          fullWidth
          variant="standard"
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          InputProps={{
            disableUnderline: true,
            sx: {
              color: "white",
              fontSize: "16px",
              "&::placeholder": {
                color: "rgba(255,255,255,0.6)",
                opacity: 1,
              },
            },
          }}
          sx={{
            "& .MuiInput-root": {
              "&:before, &:after": {
                display: "none",
              },
            },
          }}
        />

        {/* Send Button */}
        <IconButton
          onClick={handleSend}
          disabled={!message.trim()}
          sx={{
            bgcolor: message.trim() ? "#00fffc" : "rgba(255,255,255,0.1)",
            color: message.trim() ? "#000" : "#666",
            width: 48,
            height: 48,
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: message.trim() ? "#00e5e0" : "rgba(255,255,255,0.1)",
              transform: message.trim() ? "scale(1.05)" : "none",
            },
            "&:disabled": {
              bgcolor: "rgba(255,255,255,0.1)",
              color: "#666",
            },
            boxShadow: message.trim() ? "0 0 20px rgba(0,255,252,0.4)" : "none",
          }}
        >
          <SendRoundedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
