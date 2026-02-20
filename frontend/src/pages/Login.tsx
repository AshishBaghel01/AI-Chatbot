import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.login(email, password);
      toast.success("Signed In Successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Signing In Failed", { id: "login" });
    }
  };

  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth, navigate]);

  return (
    <Box
      width={"100%"}
      minHeight={"100vh"}
      className="gradient-bg"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: "1200px",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,255,252,0.1)",
          minHeight: "650px",
        }}
        className="glassmorphism"
      >
        {/* Left Side - Image/Illustration */}
        <Box
          sx={{
            flex: 1,
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, rgba(0,255,252,0.08), rgba(102,126,234,0.08))",
            position: "relative",
            borderRight: "1px solid rgba(0,255,252,0.1)",
          }}
        >
          <Box sx={{ textAlign: "center", zIndex: 2, px: 4 }}>
            <FaRobot size={100} color="#00fffc" style={{ marginBottom: 30 }} />
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 800, color: "#e4e4e7" }}>
              Welcome Back
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", maxWidth: "280px", lineHeight: 1.8 }}>
              Continue your AI-powered conversations and unlock new possibilities.
            </Typography>
          </Box>
          {/* Decorative elements */}
          <Box
            sx={{
              position: "absolute",
              top: "15%",
              left: "10%",
              width: "60px",
              height: "60px",
              background: "rgba(0,255,252,0.1)",
              borderRadius: "50%",
              animation: "pulse 4s ease-in-out infinite",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "15%",
              right: "10%",
              width: "40px",
              height: "40px",
              background: "rgba(102,126,234,0.1)",
              borderRadius: "50%",
              animation: "pulse 5s ease-in-out infinite reverse",
            }}
          />
        </Box>

        {/* Right Side - Form */}
        <Box
          sx={{
            flex: { xs: 1, md: 0.5 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: { xs: 3, md: 5 },
            background: "rgba(15, 15, 30, 0.7)",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: "380px" }}>
            <Typography
              variant="h4"
              textAlign="center"
              sx={{
                mb: 2,
                fontWeight: 800,
                color: "#e4e4e7",
              }}
            >
              Sign In
            </Typography>

            <Typography
              variant="body2"
              textAlign="center"
              sx={{
                mb: 6,
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.95rem",
              }}
            >
              Enter your email to access your AI assistant
            </Typography>

            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 4 }}>
                <CustomizedInput type="email" name="email" label="Email Address" />
              </Box>
              <Box sx={{ mb: 6 }}>
                <CustomizedInput type="password" name="password" label="Password" />
              </Box>

              <Button
                type="submit"
                fullWidth
                sx={{
                  py: 1.7,
                  borderRadius: 2,
                  background: "linear-gradient(135deg, #00fffc, #00d4d4)",
                  color: "#0a0a0a",
                  fontWeight: 700,
                  fontSize: "1rem",
                  textTransform: "none",
                  boxShadow: "0 10px 30px rgba(0,255,252,0.2)",
                  border: "none",
                  "&:hover": {
                    background: "linear-gradient(135deg, #00e5e0, #00b8b0)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 15px 40px rgba(0,255,252,0.3)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                Sign In
              </Button>
            </form>

            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
                Don't have an account?{" "}
                <Button
                  onClick={() => navigate("/signup")}
                  sx={{
                    color: "#00fffc",
                    textTransform: "none",
                    p: 0,
                    minWidth: "auto",
                    fontWeight: 600,
                    "&:hover": {
                      background: "none",
                      color: "#00e5e0",
                    },
                  }}
                >
                  Sign up here
                </Button>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
