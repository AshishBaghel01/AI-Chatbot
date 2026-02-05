import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
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
            background: "linear-gradient(135deg, rgba(103,126,234,0.1), rgba(118,75,162,0.1))",
            position: "relative",
          }}
        >
          <Box sx={{ textAlign: "center", zIndex: 2 }}>
            <FaUserPlus size={120} color="#667eea" style={{ marginBottom: 20 }} />
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: "#667eea" }}>
              Join Our Community
            </Typography>
            <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.8)", maxWidth: "300px" }}>
              Create your account and start exploring the power of AI conversations today.
            </Typography>
          </Box>
          {/* Decorative elements */}
          <Box
            sx={{
              position: "absolute",
              top: "15%",
              left: "15%",
              width: "50px",
              height: "50px",
              background: "rgba(103,126,234,0.2)",
              borderRadius: "50%",
              animation: "float 5s ease-in-out infinite",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "20%",
              right: "10%",
              width: "35px",
              height: "35px",
              background: "rgba(118,75,162,0.2)",
              borderRadius: "50%",
              animation: "float 7s ease-in-out infinite reverse",
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
                mb: 2,
                fontWeight: 700,
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Create Account
            </Typography>

            <Typography
              variant="body1"
              textAlign="center"
              sx={{ mb: 4, color: "rgba(255,255,255,0.7)" }}
            >
              Join thousands of users exploring AI-powered conversations
            </Typography>

            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 3 }}>
                <CustomizedInput type="text" name="name" label="Full Name" />
              </Box>
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
                  bgcolor: "linear-gradient(45deg, #667eea, #764ba2)",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "16px",
                  "&:hover": {
                    bgcolor: "linear-gradient(45deg, #5a6fd8, #6b5b99)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 25px rgba(102,126,234,0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
                endIcon={<IoIosLogIn />}
              >
                Create Account
              </Button>
            </form>

            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                Already have an account?{" "}
                <Button
                  onClick={() => navigate("/login")}
                  sx={{
                    color: "#667eea",
                    textTransform: "none",
                    p: 0,
                    minWidth: "auto",
                    "&:hover": {
                      background: "none",
                      color: "#5a6fd8",
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
