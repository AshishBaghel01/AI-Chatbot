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
          py: 2,
          px: 2,
          background: "linear-gradient(to top, #000000 0%, #000000 80%, transparent)",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "85%", lg: "70%" },
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 1.5,
            borderRadius: 2,
            background: "#343541",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Attach Button */}
          <IconButton
            sx={{
              color: "#888",
              transition: "all 0.2s ease",
              "&:hover": {
                color: "#ececec",
              },
            }}
          >
            <AttachFileRoundedIcon fontSize="small" />
          </IconButton>

          {/* Voice Button */}
          <IconButton
            sx={{
              color: "#888",
              transition: "all 0.2s ease",
              "&:hover": {
                color: "#ececec",
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
                color: isLoading ? "rgba(255, 255, 255, 0.4)" : "#ececec",
                fontSize: "0.95rem",
                fontWeight: 400,
                "::placeholder": {
                  color: "rgba(255, 255, 255, 0.4)",
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
              background: message.trim() && !isLoading ? "#ececec" : "rgba(255, 255, 255, 0.05)",
              color: message.trim() && !isLoading ? "#000000" : "#555",
              width: 40,
              height: 40,
              minWidth: 40,
              transition: "all 0.2s ease",
              "&:hover": {
                background: message.trim() && !isLoading ? "#d4d4d4" : "rgba(255, 255, 255, 0.05)",
              },
            }}
          >
            {isLoading ? (
              <Box
                sx={{
                  width: 18,
                  height: 18,
                  border: "2px solid rgba(0, 0, 0, 0.2)",
                  borderTop: "2px solid #000000",
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
        background: "#000000",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Grid
          container
          spacing={4}
          sx={{
            py: 6,
            color: "#ececec",
          }}
        >
          {/* Brand Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: "#ececec",
                  mb: 2,
                }}
              >
                AI Chatbot
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255, 255, 255, 0.5)",
                  lineHeight: 1.8,
                }}
              >
                Experience AI-powered conversations. Available 24/7 to help you with knowledge and engaging discussions.
              </Typography>
            </Box>

            {/* Social Links */}
            <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
              <IconButton
                size="small"
                sx={{
                  color: "#888",
                  background: "rgba(255, 255, 255, 0.05)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    color: "#ececec",
                    background: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <FaGithub size={16} />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: "#888",
                  background: "rgba(255, 255, 255, 0.05)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    color: "#ececec",
                    background: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <FaTwitter size={16} />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: "#888",
                  background: "rgba(255, 255, 255, 0.05)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    color: "#ececec",
                    background: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <FaLinkedin size={16} />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: "#888",
                  background: "rgba(255, 255, 255, 0.05)",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    color: "#ececec",
                    background: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <FaFacebook size={16} />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "#ececec",
                mb: 2,
                fontSize: "0.9rem",
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
                    color: "rgba(255, 255, 255, 0.5)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: "#ececec",
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
                fontWeight: 600,
                color: "#ececec",
                mb: 2,
                fontSize: "0.9rem",
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
                    color: "rgba(255, 255, 255, 0.5)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: "#ececec",
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
                fontWeight: 600,
                color: "#ececec",
                mb: 2,
                fontSize: "0.9rem",
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
                    color: "rgba(255, 255, 255, 0.5)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: "#ececec",
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
                fontWeight: 600,
                color: "#ececec",
                mb: 2,
                fontSize: "0.9rem",
              }}
            >
              Subscribe
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255, 255, 255, 0.5)",
                mb: 2,
              }}
            >
              Get updates on new features and AI improvements.
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                background: "rgba(255, 255, 255, 0.05)",
                padding: "4px 8px",
                borderRadius: "6px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <TextField
                placeholder="your@email.com"
                size="small"
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    color: "#ececec",
                    fontSize: "0.85rem",
                    "::placeholder": {
                      color: "rgba(255, 255, 255, 0.4)",
                    },
                  },
                }}
                sx={{ flex: 1 }}
              />
              <IconButton
                size="small"
                sx={{
                  color: "#ececec",
                  transition: "all 0.2s ease",
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
            background: "rgba(255, 255, 255, 0.1)",
            my: 3,
          }}
        />

        {/* Bottom Footer */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            py: 3,
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.4)",
              fontSize: "0.8rem",
            }}
          >
            © 2025 AI Chatbot. All rights reserved.
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "rgba(255, 255, 255, 0.4)",
              fontSize: "0.8rem",
            }}
          >
           
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.4)",
              fontSize: "0.8rem",
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

