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
          color: "#ececec",
          background: "rgba(255, 255, 255, 0.05)",
          "& fieldset": {
            borderColor: "rgba(255, 255, 255, 0.2)",
          },
          "&:hover fieldset": {
            borderColor: "rgba(255, 255, 255, 0.3)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "rgba(255, 255, 255, 0.5)",
          },
        },
        "& .MuiInputLabel-root": {
          color: "rgba(255, 255, 255, 0.6)",
          "&.Mui-focused": {
            color: "#ececec",
          },
        },
      }}
    />
  );
};

export default CustomizedInput;

