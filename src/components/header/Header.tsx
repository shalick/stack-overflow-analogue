import {
    AppBar, Box, 
    Toolbar,
    Typography,
} from '@mui/material';
import { routes } from '../../routes.ts';
import ButtonLink from "../button-link/ButtonLink.tsx";
import { useLogin } from '../../hooks/useAuth.ts';

const Header = () => {
    // const { isAuthorized } = useLogin();

    return (
        <AppBar position="sticky" sx={{ padding: 0.5}}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Codelang
                </Typography>

                {/* {isAuthorized
                    ? <Box>
                        Home
                    </Box>

                    : <ButtonLink to={routes.login}>
                        Login
                    </ButtonLink>
                } */}
            </Toolbar>
        </AppBar>
    );
};

export default Header;