import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/material";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

const Header = () => {
  const auth = useAuth();

  return (
    <AppBar
      sx={{
        bgcolor: "rgba(10, 10, 10, 0.85)",
        backdropFilter: "blur(20px)",
        position: "static",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,255,252,0.1)",
        borderBottom: "1px solid rgba(0, 255, 252, 0.1)",
        transition: "all 0.3s ease",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 1.5,
          px: { xs: 1, md: 3 },
        }}
      >
        <Logo />

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <NavigationLink
            bg="linear-gradient(135deg, #667eea, #764ba2)"
            to="/"
            text="Home"
            textColor="white"
          />
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="linear-gradient(135deg, #00fffc, #00d4d4)"
                to="/chat"
                text="Go To Chat"
                textColor="white"
              />
              <NavigationLink
                bg="linear-gradient(135deg, #ff6b6b, #ff5252)"
                textColor="white"
                to="/"
                text="Logout"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="linear-gradient(135deg, #00fffc, #00d4d4)"
                to="/login"
                text="Login"
                textColor="white"
              />
              <NavigationLink
                bg="linear-gradient(135deg, #667eea, #764ba2)"
                textColor="white"
                to="/signup"
                text="Signup"
              />
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
