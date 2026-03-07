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
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        background: "#000000",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: "900px",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
          minHeight: "500px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Left Side - Image/Illustration */}
        <Box
          sx={{
            flex: 1,
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            background: "#0a0a0a",
            position: "relative",
            borderRight: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Box sx={{ textAlign: "center", zIndex: 2, px: 4 }}>
            <FaRobot size={80} color="#ececec" style={{ marginBottom: 24 }} />
            <Typography variant="h4" sx={{ mb: 2.5, fontWeight: 600, color: "#ececec" }}>
              Welcome Back
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.5)", maxWidth: "260px", lineHeight: 1.8 }}>
              Continue your AI-powered conversations and unlock new possibilities.
            </Typography>
          </Box>
        </Box>

        {/* Right Side - Form */}
        <Box
          sx={{
            flex: { xs: 1, md: 0.6 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: { xs: 4, md: 5 },
            background: "#000000",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: "340px" }}>
            <Typography
              variant="h4"
              textAlign="center"
              sx={{
                mb: 1.5,
                fontWeight: 600,
                color: "#ececec",
              }}
            >
              Sign In
            </Typography>

            <Typography
              variant="body2"
              textAlign="center"
              sx={{
                mb: 5,
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: "0.9rem",
              }}
            >
              Enter your email to access your AI assistant
            </Typography>

            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 3.5 }}>
                <CustomizedInput type="email" name="email" label="Email Address" />
              </Box>
              <Box sx={{ mb: 5 }}>
                <CustomizedInput type="password" name="password" label="Password" />
              </Box>

              <Button
                type="submit"
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: 1.5,
                  background: "#ececec",
                  color: "#000000",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  textTransform: "none",
                  "&:hover": {
                    background: "#d4d4d4",
                  },
                }}
              >
                Sign In
              </Button>
            </form>

            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
                Don't have an account?{" "}
                <Button
                  onClick={() => navigate("/signup")}
                  sx={{
                    color: "#ececec",
                    textTransform: "none",
                    p: 0,
                    minWidth: "auto",
                    fontWeight: 500,
                    "&:hover": {
                      background: "none",
                      color: "#ffffff",
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

