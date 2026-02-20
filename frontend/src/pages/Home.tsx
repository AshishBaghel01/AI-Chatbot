import { Box, Typography, Card, CardContent, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TypingAnim from "../components/typer/TypingAnim";
import { FaRobot, FaBrain, FaComments, FaShieldAlt, FaArrowRight } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaRobot size={48} color="#00fffc" />,
      title: "AI-Powered Conversations",
      description: "Engage in intelligent, context-aware conversations with our advanced AI chatbot.",
      gradient: "linear-gradient(135deg, rgba(0,255,252,0.1), rgba(0,255,252,0.05))"
    },
    {
      icon: <FaBrain size={48} color="#667eea" />,
      title: "Smart Learning",
      description: "Our AI continuously learns and adapts to provide better responses over time.",
      gradient: "linear-gradient(135deg, rgba(102,126,234,0.1), rgba(102,126,234,0.05))"
    },
    {
      icon: <FaComments size={48} color="#00fffc" />,
      title: "Multi-Topic Support",
      description: "Get help with knowledge, business advice, education, and more.",
      gradient: "linear-gradient(135deg, rgba(0,255,252,0.1), rgba(0,255,252,0.05))"
    },
    {
      icon: <FaShieldAlt size={48} color="#764ba2" />,
      title: "Secure & Private",
      description: "Your conversations are encrypted and your privacy is our top priority.",
      gradient: "linear-gradient(135deg, rgba(118,75,162,0.1), rgba(118,75,162,0.05))"
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
          pt: { xs: 6, md: 10 },
          pb: 6,
          px: 2,
          position: "relative",
          zIndex: 1,
        }}
        className="fade-in"
      >
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <TypingAnim />
        </Box>

        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            mb: 8,
            maxWidth: "700px",
            color: "#e4e4e7",
            fontWeight: 400,
            lineHeight: 1.8,
            fontSize: { xs: "1rem", md: "1.2rem" },
          }}
        >
          Experience the future of AI conversation. Our intelligent chatbot is here to assist you with knowledge, advice, and engaging discussions, available 24/7.
        </Typography>

        <Box sx={{ display: "flex", gap: 3, mb: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/chat")}
            endIcon={<FaArrowRight />}
            sx={{
              background: "linear-gradient(135deg, #00fffc, #00d4d4)",
              color: "#0a0a0a",
              px: 5,
              py: 1.8,
              borderRadius: 2,
              fontWeight: 700,
              fontSize: "1rem",
              textTransform: "none",
              boxShadow: "0 10px 40px rgba(0,255,252,0.3)",
              border: "none",
              "&:hover": {
                background: "linear-gradient(135deg, #00e5e0, #00b8b0)",
                transform: "translateY(-3px)",
                boxShadow: "0 15px 50px rgba(0,255,252,0.4)",
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            Start Chatting
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate("/login")}
            sx={{
              color: "#e4e4e7",
              borderColor: "rgba(0,255,252,0.3)",
              px: 5,
              py: 1.8,
              borderRadius: 2,
              fontWeight: 700,
              fontSize: "1rem",
              textTransform: "none",
              border: "2px solid rgba(0,255,252,0.3)",
              "&:hover": {
                borderColor: "#00fffc",
                color: "#00fffc",
                background: "rgba(0,255,252,0.1)",
                transform: "translateY(-3px)",
                boxShadow: "0 15px 50px rgba(0,255,252,0.2)",
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ px: 2, py: 10 }}>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            mb: 2,
            fontWeight: 800,
            color: "#e4e4e7",
            fontSize: { xs: "1.8rem", md: "2.5rem" },
          }}
        >
          Why Choose Our AI Chatbot?
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            mb: 8,
            color: "#a1a1a1",
            fontWeight: 400,
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          Powered by cutting-edge technology for smarter conversations
        </Typography>

        <Grid container spacing={4} sx={{ maxWidth: "1400px", mx: "auto" }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
              <Card
                className="slide-up"
                sx={{
                  height: "100%",
                  background: feature.gradient,
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 3,
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(135deg, rgba(255,255,255,0.05), transparent)",
                    pointerEvents: "none",
                  },
                  "&:hover": {
                    transform: "translateY(-15px)",
                    boxShadow: "0 25px 50px rgba(0,255,252,0.2), 0 0 0 1px rgba(0,255,252,0.1)",
                    borderColor: "rgba(0,255,252,0.4)",
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 4, position: "relative", zIndex: 1 }}>
                  <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: "#e4e4e7" }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          pb: 8,
          px: 2,
          textAlign: "center",
          background: "linear-gradient(180deg, transparent, rgba(0,255,252,0.05))",
          py: 8,
          mt: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            color: "#e4e4e7",
            fontWeight: 700,
            fontSize: { xs: "1.5rem", md: "2rem" },
          }}
        >
          Ready to Chat with AI?
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/chat")}
          sx={{
            background: "linear-gradient(135deg, #00fffc, #00d4d4)",
            color: "#0a0a0a",
            px: 6,
            py: 2,
            borderRadius: 2,
            fontWeight: 700,
            fontSize: "1rem",
            textTransform: "none",
            boxShadow: "0 15px 50px rgba(0,255,252,0.3)",
            "&:hover": {
              background: "linear-gradient(135deg, #00e5e0, #00b8b0)",
              transform: "translateY(-3px)",
              boxShadow: "0 20px 60px rgba(0,255,252,0.4)",
            },
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          Get Started Now
        </Button>
      </Box>

      
    </Box>
  );
};

export default Home;
