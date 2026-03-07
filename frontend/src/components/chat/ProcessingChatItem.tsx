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
            bgcolor: "#343541",
            color: "#ececec",
            width: 36,
            height: 36,
            flexShrink: 0,
          }}
        >
          <FaRobot size={18} />
        </Avatar>

        {/* Processing Message Bubble with dots animation */}
        <Box
          sx={{
            p: 2.5,
            borderRadius: 2,
            bgcolor: "#202123",
            color: "rgba(255, 255, 255, 0.7)",
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: 1,
            minWidth: "100px",
          }}
        >
          {/* Three bouncing dots */}
          <Box sx={{ display: "flex", gap: 0.6 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#888",
                animation: "bounce 1s ease-in-out infinite",
                animationDelay: "0s",
              }}
            />
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#888",
                animation: "bounce 1s ease-in-out infinite",
                animationDelay: "0.2s",
              }}
            />
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#888",
                animation: "bounce 1s ease-in-out infinite",
                animationDelay: "0.4s",
              }}
            />
          </Box>
          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.5)",
              fontSize: "0.85rem",
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

