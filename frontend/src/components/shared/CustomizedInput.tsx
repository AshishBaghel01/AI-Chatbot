import { TextField } from "@mui/material";

const CustomizedInput = ({
  type,
  name,
  label,
}: {
  type: string;
  name: string;
  label: string;
}) => {
  return (
    <TextField
      type={type}
      name={name}
      label={label}
      variant="outlined"
      fullWidth
      sx={{
        mb: 2,
        "& .MuiOutlinedInput-root": {
          color: "white",
          "& fieldset": {
            borderColor: "rgba(255,255,255,0.23)",
          },
          "&:hover fieldset": {
            borderColor: "rgba(255,255,255,0.4)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#00e5ff",
          },
        },
        "& .MuiInputLabel-root": {
          color: "rgba(255,255,255,0.7)",
          "&.Mui-focused": {
            color: "#00e5ff",
          },
        },
      }}
    />
  );
};

export default CustomizedInput;
