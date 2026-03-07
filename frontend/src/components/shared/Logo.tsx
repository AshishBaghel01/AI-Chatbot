import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <Typography
          sx={{
            display: { md: "block", sm: "none", xs: "none" },
            mr: "auto",
            fontWeight: 700,
            color: "#ececec",
            fontSize: "1.25rem",
          }}
        >
          IntelliBot
        </Typography>
      </Link>
    </div>
  );
};

export default Logo;

