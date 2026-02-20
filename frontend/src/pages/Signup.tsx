import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../components/shared/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Creating Account", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("Account Created Successfully", { id: "signup" });
    } catch (error) {
      console.log(error);
      toast.error("Account Creation Failed", { id: "signup" });
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
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(102,126,234,0.1)",
          minHeight: "700px",
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
            background: "linear-gradient(135deg, rgba(102,126,234,0.08), rgba(118,75,162,0.08))",
            position: "relative",
            borderRight: "1px solid rgba(102,126,234,0.1)",
          }}
        >
          <Box sx={{ textAlign: "center", zIndex: 2, px: 4 }}>
            <FaUserPlus size={100} color="#667eea" style={{ marginBottom: 30 }} />
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 800, color: "#e4e4e7" }}>
              Join Our Community
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", maxWidth: "280px", lineHeight: 1.8 }}>
              Create your account and start exploring the power of AI conversations today.
            </Typography>
          </Box>
          {/* Decorative elements */}
          <Box
            sx={{
              position: "absolute",
              top: "15%",
              left: "10%",
              width: "50px",
              height: "50px",
              background: "rgba(102,126,234,0.1)",
              borderRadius: "50%",
              animation: "pulse 4s ease-in-out infinite",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "15%",
              right: "10%",
              width: "35px",
              height: "35px",
              background: "rgba(118,75,162,0.1)",
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
              Create Account
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
              Join thousands of users exploring AI conversations
            </Typography>

            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 4 }}>
                <CustomizedInput type="text" name="name" label="Full Name" />
              </Box>
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
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "1rem",
                  textTransform: "none",
                  boxShadow: "0 10px 30px rgba(102,126,234,0.2)",
                  border: "none",
                  "&:hover": {
                    background: "linear-gradient(135deg, #5a6fd8, #6b5b99)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 15px 40px rgba(102,126,234,0.3)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                Create Account
              </Button>
            </form>

            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
                Already have an account?{" "}
                <Button
                  onClick={() => navigate("/login")}
                  sx={{
                    color: "#667eea",
                    textTransform: "none",
                    p: 0,
                    minWidth: "auto",
                    fontWeight: 600,
                    "&:hover": {
                      background: "none",
                      color: "#7c8ff4",
                    },
                  }}
                >
                  Sign in here
                </Button>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
