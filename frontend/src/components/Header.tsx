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
        bgcolor: "rgba(15, 23, 42, 0.8)",
        backdropFilter: "blur(10px)",
        position: "static",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 1,
        }}
      >
        <Logo />

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="linear-gradient(45deg, #00fffc, #667eea)"
                to="/chat"
                text="Go To Chat"
                textColor="white"
              />
              <NavigationLink
                bg="linear-gradient(45deg, #ff6b6b, #ffa500)"
                textColor="white"
                to="/"
                text="Logout"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="linear-gradient(45deg, #00fffc, #667eea)"
                to="/login"
                text="Login"
                textColor="white"
              />
              <NavigationLink
                bg="linear-gradient(45deg, #764ba2, #667eea)"
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
