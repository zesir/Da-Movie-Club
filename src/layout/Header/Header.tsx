import Nav from "@/layout/Nav/Nav";
import { Box } from "@mui/material";

const Header = () => {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "primary.main",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Nav></Nav>
    </Box>
  );
};
export default Header;
