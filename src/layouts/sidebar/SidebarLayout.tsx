import { Box, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import SideBar from "../../components/sidebar/Sidebar";

const SideBarLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <CssBaseline />
      <Box sx={{ display: "flex", flexGrow: 1, minHeight: "0" }}>
        <SideBar />
        <Box sx={{ flexGrow: 1, padding: 3, overflow: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default SideBarLayout;
