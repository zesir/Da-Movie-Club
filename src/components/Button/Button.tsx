import { Button } from "@mui/material";
import type { ButtonProps } from "@mui/material/Button";
import type { ReactNode } from "react";

type MyButtonProps = ButtonProps & {
  children: ReactNode;
};
const MyButton = ({ children, ...props }: MyButtonProps) => {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        borderRadius: 2,
        fontWeight: 600,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default MyButton;
