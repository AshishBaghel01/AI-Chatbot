import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
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
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: "1200px",
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
          minHeight: "600px",
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
            background: "linear-gradient(135deg, rgba(0,255,252,0.1), rgba(103,126,234,0.1))",
            position: "relative",
          }}
        >
          <Box sx={{ textAlign: "center", zIndex: 2 }}>
            <FaRobot size={120} color="#00fffc" style={{ marginBottom: 20 }} />
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: "#00fffc" }}>
              Welcome Back
            </Typography>
            <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.8)", maxWidth: "300px" }}>
              Continue your AI-powered conversations and unlock new possibilities.
            </Typography>
          </Box>
          {/* Decorative elements */}
          <Box
            sx={{
              position: "absolute",
              top: "10%",
              left: "10%",
              width: "60px",
              height: "60px",
              background: "rgba(0,255,252,0.2)",
              borderRadius: "50%",
              animation: "float 6s ease-in-out infinite",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "20%",
              right: "15%",
              width: "40px",
              height: "40px",
              background: "rgba(103,126,234,0.2)",
              borderRadius: "50%",
              animation: "float 8s ease-in-out infinite reverse",
            }}
          />
        </Box>

        {/* Right Side - Form */}
        <Box
          sx={{
            flex: { xs: 1, md: 0.6 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
            background: "rgba(255,255,255,0.05)",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: "400px" }}>
            <Typography
              variant="h4"
              textAlign="center"
              sx={{
                mb: 3,
                fontWeight: 700,
                background: "linear-gradient(45deg, #00fffc, #ffffff)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Sign In
            </Typography>

            <Typography
              variant="body1"
              textAlign="center"
              sx={{ mb: 4, color: "rgba(255,255,255,0.7)" }}
            >
              Enter your e-mail to access your AI assistant
            </Typography>

            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 3 }}>
                <CustomizedInput type="email" name="email" label="Email Address" />
              </Box>
              <Box sx={{ mb: 4 }}>
                <CustomizedInput type="password" name="password" label="Password" />
              </Box>

              <Button
                type="submit"
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  bgcolor: "#00fffc",
                  color: "#000",
                  fontWeight: 600,
                  fontSize: "16px",
                  "&:hover": {
                    bgcolor: "#00e5e0",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(0,255,252,0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
                endIcon={<IoIosLogIn />}
              >
                Sign In
              </Button>
            </form>

            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                Don't have an account?{" "}
                <Button
                  onClick={() => navigate("/signup")}
                  sx={{
                    color: "#00fffc",
                    textTransform: "none",
                    p: 0,
                    minWidth: "auto",
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
