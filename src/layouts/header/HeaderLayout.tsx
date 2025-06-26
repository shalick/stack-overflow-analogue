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
// import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
// import { Link, Outlet, useNavigate } from 'react-router-dom';
// import { useAuthStore } from '../auth/useAuthStore';
// import { toast } from 'react-hot-toast';

// const HeaderLayout = () => {
//   const user = useAuthStore((state) => state.user);
//   const clearUser = useAuthStore((state) => state.clearUser);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     clearUser();
//     toast.success('Logged out');
//     navigate('/login');
//   };

//   return (
//     <>
//       <AppBar position="static">
//         <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
//           <Typography variant="h6" component={Link} to="/" color="inherit" sx={{ textDecoration: 'none' }}>
//             MyApp
//           </Typography>

//           <Box sx={{ display: 'flex', gap: 2 }}>
//             {user ? (
//               <>
//                 <Typography>{user.email}</Typography>
//                 <Button color="inherit" onClick={handleLogout}>
//                   Logout
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Button color="inherit" component={Link} to="/login">
//                   Login
//                 </Button>
//                 <Button color="inherit" component={Link} to="/register">
//                   Register
//                 </Button>
//               </>
//             )}
//           </Box>
//         </Toolbar>
//       </AppBar>

//       <Box sx={{ p: 3 }}>
//         <Outlet />
//       </Box>
//     </>
//   );
// };

// export default HeaderLayout;
