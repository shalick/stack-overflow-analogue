import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { routes } from "../../routes.ts";
import { useLogout } from "../../hooks/useAuth";
import ButtonLink from "../button-link/ButtonLink.tsx";
import { useAuthStore } from "../../auth/useAuthStore.ts";

const Header = () => {
  const { user } = useAuthStore();
  const logoutMutation = useLogout();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Codelang
        </Typography>

        {user ? (
          <Box>
            <Button color={"inherit"} onClick={() => logoutMutation.mutate()}>
              Logout
            </Button>
          </Box>
        ) : (
          <ButtonLink to={routes.login}>Login</ButtonLink>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
