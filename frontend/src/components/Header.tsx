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
        bgcolor: "#000000",
        position: "static",
        boxShadow: "none",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
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
            bg="rgba(255, 255, 255, 0.1)"
            to="/"
            text="Home"
            textColor="#ececec"
          />
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="rgba(255, 255, 255, 0.1)"
                to="/chat"
                text="Go To Chat"
                textColor="#ececec"
              />
              <NavigationLink
                bg="rgba(255, 255, 255, 0.1)"
                textColor="#ececec"
                to="/"
                text="Logout"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="rgba(255, 255, 255, 0.1)"
                to="/login"
                text="Login"
                textColor="#ececec"
              />
              <NavigationLink
                bg="rgba(255, 255, 255, 0.1)"
                textColor="#ececec"
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

