import { Box, Typography, Card, CardContent, Grid, useMediaQuery, useTheme, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TypingAnim from "../components/typer/TypingAnim";
import Footer from "../components/footer/Footer";
import { FaRobot, FaBrain, FaComments, FaShieldAlt } from "react-icons/fa";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaRobot size={40} color="#00fffc" />,
      title: "AI-Powered Conversations",
      description: "Engage in intelligent, context-aware conversations with our advanced AI chatbot."
    },
    {
      icon: <FaBrain size={40} color="#00fffc" />,
      title: "Smart Learning",
      description: "Our AI continuously learns and adapts to provide better responses over time."
    },
    {
      icon: <FaComments size={40} color="#00fffc" />,
      title: "Multi-Topic Support",
      description: "Get help with knowledge, business advice, education, and more."
    },
    {
      icon: <FaShieldAlt size={40} color="#00fffc" />,
      title: "Secure & Private",
      description: "Your conversations are encrypted and your privacy is our top priority."
    }
  ];

  return (
    <Box width={"100%"} minHeight={"100vh"} className="hero-gradient">
      {/* Hero Section */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          pt: 8,
          pb: 4,
          px: 2,
        }}
        className="fade-in"
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <TypingAnim />
        </Box>

        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            mb: 6,
            maxWidth: "600px",
            color: "rgba(255,255,255,0.8)",
            fontWeight: 300,
            lineHeight: 1.6,
          }}
        >
          Experience the future of AI conversation. Our intelligent chatbot is here to assist you with knowledge, advice, and engaging discussions.
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 8 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/chat")}
            sx={{
              bgcolor: "#00fffc",
              color: "#000",
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 600,
              "&:hover": {
                bgcolor: "#00e5e0",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(0,255,252,0.4)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Start Chatting
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate("/login")}
            sx={{
              color: "#00fffc",
              borderColor: "#00fffc",
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontWeight: 600,
              "&:hover": {
                borderColor: "#00e5e0",
                color: "#00e5e0",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(0,255,252,0.2)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ px: 2, pb: 8 }}>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            mb: 6,
            fontWeight: 700,
            background: "linear-gradient(45deg, #00fffc, #ffffff)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Why Choose Our AI Chatbot?
        </Typography>

        <Grid container spacing={4} sx={{ maxWidth: "1200px", mx: "auto" }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                className="slide-up"
                sx={{
                  height: "100%",
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 20px 40px rgba(0,255,252,0.2)",
                    borderColor: "rgba(0,255,252,0.3)",
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 3 }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: "#00fffc" }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Image Section */}
      <Box sx={{ display: "flex", justifyContent: "center", pb: 8, px: 2 }}>
        <Box
          sx={{
            position: "relative",
            width: isBelowMd ? "90%" : "70%",
            maxWidth: "800px",
          }}
        >
          <img
            src="chat.png"
            alt="AI Chatbot Interface"
            style={{
              width: "100%",
              borderRadius: 20,
              boxShadow: "0 20px 60px rgba(0,255,252,0.3)",
              filter: "brightness(1.1)",
            }}
            className="fade-in"
          />
          <Box
            sx={{
              position: "absolute",
              top: -20,
              left: -20,
              width: "100px",
              height: "100px",
              background: "linear-gradient(45deg, #00fffc, #00e5e0)",
              borderRadius: "50%",
              opacity: 0.1,
              animation: "pulse 3s infinite",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -20,
              right: -20,
              width: "80px",
              height: "80px",
              background: "linear-gradient(45deg, #764ba2, #667eea)",
              borderRadius: "50%",
              opacity: 0.1,
              animation: "pulse 4s infinite",
            }}
          />
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default Home;
