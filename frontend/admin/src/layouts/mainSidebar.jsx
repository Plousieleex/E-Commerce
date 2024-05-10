import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const drawerWidth = 260;

function MainSidebar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const menuItems = [
    {
      icon: "pi pi-shopping-bag",
      label: "Products",
      subMenu: [
        {
          label: "Product List",
          whereToNavigate: "products",
        },
        {
          label: "Create Product",
          whereToNavigate: "products/create",
        },
      ],
    },
    {
      icon: "pi pi-shopping-bag",
      label: "Categories",
      subMenu: [
        {
          label: "Category List",
          whereToNavigate: "categories",
        },
        {
          label: "Create Category",
          whereToNavigate: "categories/create",
        },
      ],
    },
    {
      icon: "pi pi-users",
      label: "Customers",
      subMenu: [
        {
          label: "List",
          whereToNavigate: "customers",
        },
        {
          label: "Details",
          whereToNavigate: "customers/details",
        },
        {
          label: "Edit",
          whereToNavigate: "customers/edit",
        },
      ],
    },
    {
      icon: "pi pi-shopping-cart",
      label: "Orders",
      subMenu: [
        {
          label: "List",
          whereToNavigate: "orders/list",
        },
        {
          label: "Details",
          whereToNavigate: "orders/details",
        },
      ],
    },
  ];
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      {menuItems.map((menuItem) => (
        <MenuItem key={menuItem.label} menuItem={menuItem} />
      ))}
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: {
              sm: "block",
              md: "none",
            },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              border: "none",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: {
              sm: "none",
              md: "block",
              border: "none",
            },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              border: "none",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          marginTop: "64px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
const MenuItem = ({ menuItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <ul
        onClick={toggleSubMenu}
        className={`py-2 my-1 mx-4 text-sm text-gray-300 rounded font-semibold cursor-pointer flex justify-between hover:bg-sidebarHover transition-colors duration-300`}
      >
        <span className="flex items-center justify-between w-full">
          <div>
            {menuItem.icon && <i className={`px-4 ${menuItem.icon}`}></i>}
            {menuItem.label && <span>{menuItem.label}</span>}
          </div>
          <i
            className={`pi pi-angle-right transition-all ${
              isOpen ? "transform rotate-90 " : ""
            } px-4 text-gray-500`}
          />
        </span>
      </ul>
      {menuItem.subMenu && (
        <SubMenu subMenuItems={menuItem.subMenu} isOpen={isOpen} />
      )}
    </div>
  );
};

const SubMenu = ({ subMenuItems, isOpen }) => {
  const necessaryDropdownPixel = subMenuItems.length * 40;
  return (
    <div className="">
      <ul
        className={`px-4 text-xs overflow-hidden transition-height`}
        style={{ height: isOpen ? `${necessaryDropdownPixel}px` : "0px" }}
      >
        {subMenuItems.map((subMenuItem, index) => (
          <li key={index}>
            <NavLink
              to={subMenuItem.whereToNavigate}
              className={`block py-2 my-1 px-12 rounded hover:bg-sidebarHover `}
            >
              {subMenuItem.icon && <i className={subMenuItem.icon}></i>}
              {subMenuItem.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainSidebar;
