/* eslint-disable jsx-a11y/anchor-is-valid */
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Link as RouterLink, useLocation } from "react-router-dom";

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname
    .split("/")
    .filter((x) => x && x !== "categories");
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" component={RouterLink} color="inherit" to="/">
          Home
        </Link>
        {pathnames.map((value, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <span key={routeTo} className="capitalize text-black">
              {value}
            </span>
          ) : (
            <Link
              key={routeTo}
              underline="hover"
              color="inherit"
              className="capitalize"
              component={RouterLink}
              to={routeTo}
            >
              {value}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
