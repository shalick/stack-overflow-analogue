import { routes } from "../../routes.ts";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../auth/useAuthStore.ts";
import { Drawer, List, ListItemButton } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";

const SideBar = () => {
  const { user } = useAuthStore();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 250,
        "& .MuiDrawer-paper": {
          position: "relative",
        },
      }}
    >
      <List sx={{ display: "flex", flexDirection: "column" }}>
        <Link to={routes.home}>
          <ListItemButton sx={{ display: "flex", gap: 2 }}>
            <HomeOutlinedIcon />
            Home
          </ListItemButton>
        </Link>

        {user && (
          <>
            <Link color={"inherit"} to={routes.account}>
              <ListItemButton sx={{ display: "flex", gap: 2 }}>
                <PersonOutlineIcon />
                My Account
              </ListItemButton>
            </Link>

            <Link color={"inherit"} to={routes.createPost}>
              <ListItemButton sx={{ display: "flex", gap: 2 }}>
                <TextSnippetOutlinedIcon />
                Post snippet
              </ListItemButton>
            </Link>

            <Link color={"inherit"} to={routes.userPosts}>
              <ListItemButton sx={{ display: "flex", gap: 2 }}>
                <TextSnippetOutlinedIcon />
                My snippets
              </ListItemButton>
            </Link>

            <Link color={"inherit"} to={routes.questions}>
              <ListItemButton sx={{ display: "flex", gap: 2 }}>
                <QuestionMarkIcon />
                Questions
              </ListItemButton>
            </Link>

            <Link color={"inherit"} to={routes.users}>
              <ListItemButton sx={{ display: "flex", gap: 2 }}>
                <PeopleOutlineIcon />
                Users
              </ListItemButton>
            </Link>
          </>
        )}
      </List>
    </Drawer>
  );
};

export default SideBar;
