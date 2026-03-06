import { Box, IconButton, TextField, Typography, Grid, Container, Divider } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import { useState } from "react";
import { FaGithub, FaTwitter, FaLinkedin, FaFacebook, FaHeart } from "react-icons/fa";

const Footer = ({ onSend, isLoading }: { onSend?: (msg: string) => void; isLoading?: boolean }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim() || !onSend) return;
    onSend(message);
    setMessage("");
  };

  // Chat Input Footer
  if (onSend) {
    return (
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          py: 3,
          px: 2,
          background: "linear-gradient(to top, rgba(10,10,10,0.95), rgba(10,10,10,0.85), rgba(10,10,10,0.7), transparent)",
          backdropFilter: "blur(25px)",
          borderTop: "1px solid rgba(0,255,252,0.1)",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "85%", lg: "70%" },
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            px: 3,
            py: 2.5,
            borderRadius: 3,
            background: "linear-gradient(135deg, rgba(0,255,252,0.05), rgba(102,126,234,0.05))",
            border: "1.5px solid rgba(0,255,252,0.15)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,255,252,0.05)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:focus-within": {
              border: "1.5px solid rgba(0,255,252,0.4)",
              boxShadow: "0 0 30px rgba(0,255,252,0.3), 0 12px 40px rgba(0,0,0,0.5)",
              background: "linear-gradient(135deg, rgba(0,255,252,0.08), rgba(102,126,234,0.08))",
            },
          }}
        >
          {/* Attach Button */}
          <IconButton
            sx={{
              color: "#a1a1a1",
              transition: "all 0.3s ease",
              p: 0.8,
              "&:hover": {
                color: "#00fffc",
                transform: "scale(1.15) rotate(10deg)",
                background: "rgba(0,255,252,0.1)",
              },
            }}
          >
            <AttachFileRoundedIcon fontSize="small" />
          </IconButton>

          {/* Voice Button */}
          <IconButton
            sx={{
              color: "#a1a1a1",
              transition: "all 0.3s ease",
              p: 0.8,
              "&:hover": {
                color: "#00fffc",
                transform: "scale(1.15)",
                background: "rgba(0,255,252,0.1)",
              },
            }}
          >
            <MicRoundedIcon fontSize="small" />
          </IconButton>

          {/* Input Field */}
          <TextField
            fullWidth
            variant="standard"
            placeholder={isLoading ? "AI is thinking..." : "Type your message here..."}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && !isLoading && handleSend()}
            disabled={isLoading}
            InputProps={{
              disableUnderline: true,
              sx: {
                color: isLoading ? "rgba(255,255,255,0.4)" : "#e4e4e7",
                fontSize: "0.95rem",
                fontWeight: 500,
                "::placeholder": {
                  color: "rgba(255,255,255,0.5)",
                  opacity: 1,
                },
              },
            }}
            sx={{
              "& .MuiInput-root": {
                "&:before, &:after": {
                  display: "none",
                },
              },
            }}
          />

          {/* Send Button */}
          <IconButton
            onClick={handleSend}
            disabled={!message.trim() || isLoading}
            sx={{
              background: message.trim() && !isLoading ? "linear-gradient(135deg, #00fffc, #00d4d4)" : "rgba(255,255,255,0.08)",
              color: message.trim() && !isLoading ? "#0a0a0a" : "#666",
              width: 44,
              height: 44,
              minWidth: 44,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              p: 0,
              "&:hover": {
                background: message.trim() && !isLoading
                  ? "linear-gradient(135deg, #00e5e0, #00b8b0)"
                  : "rgba(255,255,255,0.08)",
                transform: message.trim() && !isLoading ? "scale(1.1)" : "none",
                boxShadow: message.trim() && !isLoading ? "0 0 25px rgba(0,255,252,0.4)" : "none",
              },
              "&:disabled": {
                background: "rgba(255,255,255,0.05)",
                color: "#666",
              },
            }}
          >
            {isLoading ? (
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  border: "2px solid rgba(0,0,0,0.2)",
                  borderTop: "2px solid #0a0a0a",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  "@keyframes spin": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                  },
                }}
              />
            ) : (
              <SendRoundedIcon fontSize="small" />
            )}
          </IconButton>
        </Box>
      </Box>
    );
  }

  // Landing Page Footer
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        background: "linear-gradient(180deg, rgba(10,10,10,0.5), #0a0a0a 100%)",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(0,255,252,0.1)",
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Grid
          container
          spacing={4}
          sx={{
            py: 8,
            color: "#e4e4e7",
          }}
        >
          {/* Brand Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #00fffc, #667eea)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                }}
              >
                AI Chatbot
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.8,
                }}
              >
                Experience the AI-powered conversations. Available 24/7 to help you with knowledge, advice, and engaging discussions.
              </Typography>
            </Box>

            {/* Social Links */}
            <Box sx={{ display: "flex", gap: 1.5, mt: 3 }}>
              <IconButton
                size="small"
                sx={{
                  color: "#a1a1a1",
                  background: "rgba(0,255,252,0.05)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#00fffc",
                    background: "rgba(0,255,252,0.15)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <FaGithub size={18} />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: "#a1a1a1",
                  background: "rgba(0,255,252,0.05)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#00fffc",
                    background: "rgba(0,255,252,0.15)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <FaTwitter size={18} />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: "#a1a1a1",
                  background: "rgba(0,255,252,0.05)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#667eea",
                    background: "rgba(102,126,234,0.15)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <FaLinkedin size={18} />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: "#a1a1a1",
                  background: "rgba(0,255,252,0.05)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#ff6b6b",
                    background: "rgba(255,107,107,0.15)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <FaFacebook size={18} />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#00fffc",
                mb: 3,
                fontSize: "0.95rem",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Product
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {["Features", "Pricing", "Security", "Documentation"].map((item) => (
                <Typography
                  key={item}
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.6)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "#00fffc",
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Grid>

          {/* Company */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#667eea",
                mb: 3,
                fontSize: "0.95rem",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Company
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {["About Us", "Blog", "Careers", "Contact"].map((item) => (
                <Typography
                  key={item}
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.6)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "#667eea",
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Grid>

          {/* Legal */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#764ba2",
                mb: 3,
                fontSize: "0.95rem",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Legal
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Disclaimer"].map((item) => (
                <Typography
                  key={item}
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.6)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "#764ba2",
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: "#00fffc",
                mb: 3,
                fontSize: "0.95rem",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Subscribe
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255,255,255,0.6)",
                mb: 2,
              }}
            >
              Get updates on new features and AI improvements.
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                background: "rgba(255,255,255,0.05)",
                padding: "6px",
                borderRadius: "8px",
                border: "1px solid rgba(0,255,252,0.15)",
                transition: "all 0.3s ease",
                "&:focus-within": {
                  border: "1px solid rgba(0,255,252,0.3)",
                  boxShadow: "0 0 20px rgba(0,255,252,0.2)",
                },
              }}
            >
              <TextField
                placeholder="your@email.com"
                size="small"
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    color: "#e4e4e7",
                    fontSize: "0.85rem",
                    "::placeholder": {
                      color: "rgba(255,255,255,0.4)",
                    },
                  },
                }}
                sx={{ flex: 1 }}
              />
              <IconButton
                size="small"
                sx={{
                  color: "#00fffc",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              >
                <SendRoundedIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider
          sx={{
            background: "linear-gradient(90deg, transparent, rgba(0,255,252,0.2), transparent)",
            my: 4,
          }}
        />

        {/* Bottom Footer */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            py: 4,
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.85rem",
            }}
          >
            © 2025 AI Chatbot. All rights reserved.
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.85rem",
            }}
          >
            Made with <FaHeart size={14} style={{ color: "#ff6b6b", margin: "0 4px" }} /> by Developers
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.85rem",
            }}
          >
            v1.0.0
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

