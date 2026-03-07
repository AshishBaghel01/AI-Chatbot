import { Box, Typography, Card, CardContent, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TypingAnim from "../components/typer/TypingAnim";
import { FaRobot, FaBrain, FaComments, FaShieldAlt, FaArrowRight } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaRobot size={40} color="#ececec" />,
      title: "AI-Powered Conversations",
      description: "Engage in intelligent, context-aware conversations with our advanced AI chatbot.",
    },
    {
      icon: <FaBrain size={40} color="#ececec" />,
      title: "Smart Learning",
      description: "Our AI continuously learns and adapts to provide better responses over time.",
    },
    {
      icon: <FaComments size={40} color="#ececec" />,
      title: "Multi-Topic Support",
      description: "Get help with knowledge, business advice, education, and more.",
    },
    {
      icon: <FaShieldAlt size={40} color="#ececec" />,
      title: "Secure & Private",
      description: "Your conversations are encrypted and your privacy is our top priority.",
    }
  ];

  return (
    <Box width={"100%"} minHeight={"100vh"} sx={{ background: "#000000" }}>
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
        }}
      >
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <TypingAnim />
        </Box>

        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            mb: 8,
            maxWidth: "600px",
            color: "rgba(255, 255, 255, 0.7)",
            fontWeight: 400,
            lineHeight: 1.8,
            fontSize: { xs: "1rem", md: "1.1rem" },
          }}
        >
          Experience the future of AI conversation. Our intelligent chatbot is here to assist you with knowledge, advice, and engaging discussions, available 24/7.
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/chat")}
            endIcon={<FaArrowRight />}
            sx={{
              background: "#ececec",
              color: "#000000",
              px: 4,
              py: 1.5,
              borderRadius: 1.5,
              fontWeight: 600,
              fontSize: "0.95rem",
              textTransform: "none",
              "&:hover": {
                background: "#d4d4d4",
              },
            }}
          >
            Start Chatting
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate("/login")}
            sx={{
              color: "#ececec",
              borderColor: "rgba(255, 255, 255, 0.2)",
              px: 4,
              py: 1.5,
              borderRadius: 1.5,
              fontWeight: 500,
              fontSize: "0.95rem",
              textTransform: "none",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              "&:hover": {
                borderColor: "rgba(255, 255, 255, 0.4)",
                color: "#ececec",
                background: "rgba(255, 255, 255, 0.05)",
              },
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ px: 2, py: 8, background: "#0a0a0a" }}>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            mb: 1.5,
            fontWeight: 600,
            color: "#ececec",
            fontSize: { xs: "1.6rem", md: "2rem" },
          }}
        >
          Why Choose Our AI Chatbot?
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            mb: 6,
            color: "rgba(255, 255, 255, 0.5)",
            fontWeight: 400,
            maxWidth: "500px",
            mx: "auto",
          }}
        >
          Powered by cutting-edge technology for smarter conversations
        </Typography>

        <Grid container spacing={3} sx={{ maxWidth: "1200px", mx: "auto" }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  background: "#1a1a1a",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: 2,
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center", p: 4 }}>
                  <Box sx={{ mb: 2.5, display: "flex", justifyContent: "center" }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600, color: "#ececec" }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.5)", lineHeight: 1.7 }}>
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
          py: 8,
          background: "#000000",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 2.5,
            color: "#ececec",
            fontWeight: 600,
            fontSize: { xs: "1.3rem", md: "1.6rem" },
          }}
        >
          Ready to Chat with AI?
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/chat")}
          sx={{
            background: "#ececec",
            color: "#000000",
            px: 5,
            py: 1.5,
            borderRadius: 1.5,
            fontWeight: 600,
            fontSize: "0.95rem",
            textTransform: "none",
            "&:hover": {
              background: "#d4d4d4",
            },
          }}
        >
          Get Started Now
        </Button>
      </Box>
    </Box>
  );
};

export default Home;

