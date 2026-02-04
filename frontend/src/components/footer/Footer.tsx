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
    return null; // Or render a simple footer without input
  }

  return (
    <Box
      sx={{
        position: "sticky",
        bottom: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        py: 2,
        background:
          "linear-gradient(to top, rgba(10,10,10,0.95), rgba(10,10,10,0.6), transparent)",
        backdropFilter: "blur(12px)",
      }}
    >
      <Box
        sx={{
          width: { xs: "95%", md: "70%" },
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 2,
          py: 1,
          borderRadius: "40px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
          transition: "all 0.3s ease",
          "&:focus-within": {
            border: "1px solid #00e5ff",
            boxShadow: "0 0 20px rgba(0,229,255,0.4)",
          },
        }}
      >
        {/* Attach Button */}
        <IconButton sx={{ color: "#9ca3af" }}>
          <AttachFileRoundedIcon />
        </IconButton>

        {/* Input Field */}
        <TextField
          fullWidth
          variant="standard"
          placeholder="Ask anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          InputProps={{
            disableUnderline: true,
            sx: {
              color: "white",
              fontSize: "16px",
            },
          }}
        />

        {/* Send Button */}
        <IconButton
          onClick={handleSend}
          sx={{
            bgcolor: "#00e5ff",
            color: "#000",
            width: 42,
            height: 42,
            "&:hover": { bgcolor: "#00c4db" },
            boxShadow: "0 0 12px rgba(0,229,255,0.6)",
          }}
        >
          <SendRoundedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
