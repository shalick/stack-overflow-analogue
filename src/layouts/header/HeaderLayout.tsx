import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../../components/header/Header.tsx";

const HeaderLayout = () => {
  return (
    <Box>
      <Header />
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default HeaderLayout;
