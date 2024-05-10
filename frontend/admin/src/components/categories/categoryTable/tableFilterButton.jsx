import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Box from "@mui/material/Box";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import { RemoveCircleOutlineOutlined } from "@mui/icons-material";
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function TableFilterButton({ name }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilterOption, setSelectedFilterOption] = useState("");
  const [buttonSelectedFilterOptionName, setButtonSelectedFilterOptionName] =
    useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setSelectedFilterOption(event.target.value);
  };

  const handleSetFilter = () => {
    setButtonSelectedFilterOptionName(selectedFilterOption);
    setAnchorEl(null);
  };
  const handleRemoveSelectedFilter = () => {
    setButtonSelectedFilterOptionName("");
  };

  return (
    <div>
      {!buttonSelectedFilterOptionName ? (
        <Button
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="outlined"
          disableElevation
          onClick={handleClick}
          startIcon={<AddCircleOutlineIcon />}
        >
          <span>{name}</span>
        </Button>
      ) : (
        <Button
          id="demo-customized-button"
          aria-controls={open ? "demo-customized-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="outlined"
          disableElevation
          onClick={handleRemoveSelectedFilter}
          startIcon={<RemoveCircleOutlineOutlined />}
        >
          {selectedFilterOption === "" ? (
            <span>{name}</span>
          ) : (
            <span>
              {name} <span>: </span>
              {buttonSelectedFilterOptionName}{" "}
            </span>
          )}
        </Button>
      )}

      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="flex flex-col justify-start">
          <Typography sx={{ mx: 2, mt: 2 }} variant="body1">
            Filter by {String(name).toLowerCase()}
          </Typography>
          <Box sx={{ mx: 2, my: 2 }}>
            <FormControl fullWidth>
              <InputLabel size="small" id="demo-simple-select-label">
                {name}
              </InputLabel>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedFilterOption}
                label={name}
                onChange={handleChange}
              >
                <MenuItem value={"Women"}>Women</MenuItem>
                <MenuItem value={"Man"}>Man</MenuItem>
                <MenuItem value={"Children"}>Children</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button
            onClick={handleSetFilter}
            sx={{ mx: 2, mb: 2 }}
            variant="contained"
          >
            Apply
          </Button>
        </div>
      </StyledMenu>
    </div>
  );
}
