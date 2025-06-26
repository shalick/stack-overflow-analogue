import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { routes } from "../../routes.ts";
import ButtonLink from "../button-link/ButtonLink.tsx";
// import { useLogin } from "../../hooks/useAuth.ts";

const Header = () => {
  // const { isAuthorized } = useLogin();
  const isAuthorized = true;

  return (
    <AppBar position="sticky" >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Codelang
        </Typography>

        {isAuthorized ? (
          <Box>
            <Button color={"inherit"}>
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
