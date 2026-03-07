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
          minHeight: "550px",
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
            <FaUserPlus size={80} color="#ececec" style={{ marginBottom: 24 }} />
            <Typography variant="h4" sx={{ mb: 2.5, fontWeight: 600, color: "#ececec" }}>
              Join Our Community
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.5)", maxWidth: "260px", lineHeight: 1.8 }}>
              Create your account and start exploring the power of AI conversations today.
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
              Create Account
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
              Join thousands of users exploring AI conversations
            </Typography>

            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 3.5 }}>
                <CustomizedInput type="text" name="name" label="Full Name" />
              </Box>
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
                Create Account
              </Button>
            </form>

            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
                Already have an account?{" "}
                <Button
                  onClick={() => navigate("/login")}
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

