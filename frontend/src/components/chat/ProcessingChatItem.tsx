import { Box, Avatar, Typography } from "@mui/material";
import { FaRobot } from "react-icons/fa";

const ProcessingChatItem = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        px: { xs: 1, md: 3 },
        my: 2,
        animation: "fadeIn 0.3s ease-out",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          maxWidth: "85%",
          alignItems: "flex-start",
        }}
      >
        {/* AI Avatar with pulse animation */}
        <Avatar
          sx={{
            bgcolor: "linear-gradient(135deg, #00fffc, #00d4d4)",
            color: "white",
            width: 44,
            height: 44,
            boxShadow: "0 8px 25px rgba(0,255,252,0.3)",
            border: "2px solid rgba(255,255,255,0.1)",
            flexShrink: 0,
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        >
          <FaRobot size={22} />
        </Avatar>

        {/* Processing Message Bubble with dots animation */}
        <Box
          sx={{
            p: 3,
            borderRadius: 3,
            bgcolor: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.08)",
            border: "1px solid rgba(0,255,252,0.15)",
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: 1,
            minWidth: "120px",
            "&::before": {
              content: '""',
              position: "absolute",
              top: "18px",
              left: "-6px",
              width: 0,
              height: 0,
              borderStyle: "solid",
              borderWidth: "6px 6px 6px 0",
              borderColor: "rgba(255,255,255,0.06) transparent rgba(255,255,255,0.06) rgba(255,255,255,0.06)",
            },
          }}
        >
          {/* Three bouncing dots */}
          <Box sx={{ display: "flex", gap: 0.8 }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#00fffc",
                animation: "bounce 1s ease-in-out infinite",
                animationDelay: "0s",
              }}
            />
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#00fffc",
                animation: "bounce 1s ease-in-out infinite",
                animationDelay: "0.2s",
              }}
            />
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#00fffc",
                animation: "bounce 1s ease-in-out infinite",
                animationDelay: "0.4s",
              }}
            />
          </Box>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.9rem",
              fontWeight: 500,
            }}
          >
            Processing
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProcessingChatItem;

