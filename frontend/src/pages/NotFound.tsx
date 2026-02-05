
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        px: 2,
        textAlign: "center",
      }}
    >
      <Box sx={{ mb: 4 }}>
        <FaRobot size={150} color="#00fffc" />
      </Box>

      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "6rem", md: "8rem" },
          fontWeight: 900,
          background: "linear-gradient(45deg, #00fffc, #667eea)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 2,
          textShadow: "0 0 40px rgba(0,255,252,0.3)",
        }}
      >
        404
      </Typography>

      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 600,
          color: "rgba(255,255,255,0.9)",
        }}
      >
        Oops! Page Not Found
      </Typography>

      <Typography
        variant="h6"
        sx={{
          mb: 4,
          maxWidth: "500px",
          color: "rgba(255,255,255,0.7)",
          lineHeight: 1.6,
        }}
      >
        The page you're looking for seems to have some error.
      </Typography>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/")}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 3,
            bgcolor: "#00fffc",
            color: "#000",
            fontWeight: 600,
            "&:hover": {
              bgcolor: "#00e5e0",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 25px rgba(0,255,252,0.4)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Go Home
        </Button>

        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate("/chat")}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 3,
            color: "#667eea",
            borderColor: "#667eea",
            fontWeight: 600,
            "&:hover": {
              borderColor: "#5a6fd8",
              color: "#5a6fd8",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 25px rgba(102,126,234,0.2)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Chat with AI
        </Button>
      </Box>

      {/* Decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "60px",
          height: "60px",
          background: "rgba(0,255,252,0.1)",
          borderRadius: "50%",
          animation: "float 6s ease-in-out infinite",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "25%",
          right: "15%",
          width: "40px",
          height: "40px",
          background: "rgba(103,126,234,0.1)",
          borderRadius: "50%",
          animation: "float 8s ease-in-out infinite reverse",
        }}
      />
    </Box>
  );
};

export default NotFound;
