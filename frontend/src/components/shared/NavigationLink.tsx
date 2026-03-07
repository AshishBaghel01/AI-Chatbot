import { Link } from "react-router-dom";

type Props = {
  to: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};

const NavigationLink = (props: Props) => {
  return (
    <Link
      onClick={props.onClick}
      className="nav-link"
      to={props.to}
      style={{ 
        background: props.bg, 
        color: props.textColor,
        borderRadius: "6px",
        padding: "10px 20px",
        fontWeight: 500,
        fontSize: "0.9rem",
        transition: "all 0.2s ease"
      }}
    >
      {props.text}
    </Link>
  );
};

export default NavigationLink;

