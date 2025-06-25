import { Link } from "react-router-dom";
import { Button } from "@mui/material";

interface ButtonLinkProps {
  to: string;
  children?: React.ReactNode;
}

const ButtonLink = ({ to, children }: ButtonLinkProps) => {
  return (
    <Button component={Link} color="inherit" to={to}>
      {children}
    </Button>
  );
};

export default ButtonLink;
