import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import TableFilterButton from "./tableFilterButton";
import TableFilterOptions from "./tableFilterOptions";
import {
  Avatar,
  Divider,
  InputAdornment,
  Switch,
  TextField,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";

function createData(id, product, category, price, isPublished, action) {
  return {
    id,
    product,
    category,
    price,
    isPublished,
    action,
  };
}

const rows = [
  createData(
    1,
    {
      productName: "Blue Premium T-shirt",
      barcode: "#34321",
      imageSource:
        "https://bazaar.ui-lib.com/assets/images/products/blu-tshirt.png",
    },
    "Fashion",
    56,
    true,
    4.3
  ),
  createData(
    2,
    {
      productName: "Boston Round Cream Pack",
      barcode: "#efd10563",
      imageSource:
        "https://bazaar.ui-lib.com/assets/images/products/beauty-cream.png",
    },
    "Beauty",
    52,
    false,
    4.9
  ),
  createData(
    3,
    {
      productName: "Casual Shirt for Man",
      barcode: "#5dc1404f",
      imageSource:
        "https://bazaar.ui-lib.com/assets/images/products/blu-tshirt.png",
    },
    "Gadgets",
    25,
    true,
    6.0
  ),
  createData(
    4,
    {
      productName: "Man Trowzer Pant",
      barcode: "#b8711072",
      imageSource:
        "https://bazaar.ui-lib.com/assets/images/products/blu-tshirt.png",
    },
    "Fashion",
    30,
    true,
    4.0
  ),
  createData(
    5,
    {
      productName: "Man Trowzer Pant",
      barcode: "#eecbf3ce",
      imageSource:
        "https://bazaar.ui-lib.com/assets/images/products/blu-tshirt.png",
    },
    "Fashion",
    75,
    true,
    3.9
  ),
  createData(
    6,
    {
      productName: "Tomatto",
      barcode: "#1dd02b91",
      imageSource:
        "https://bazaar.ui-lib.com/assets/images/products/blu-tshirt.png",
    },
    "Gadgets",
    120,
    false,
    6.5
  ),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "product",
    numeric: false,
    disablePadding: true,
    label: "Product",
  },
  {
    id: "category",
    numeric: true,
    disablePadding: false,
    label: "Category",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "isPublished",
    numeric: true,
    disablePadding: false,
    label: "Published",
  },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "Action",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all products",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <div className="flex gap-3 items-center w-full">
        <TableFilterButton name={"Category"} />
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search product by name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          ""
        )}
      </div>
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <TableFilterOptions />
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function ProductTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  const handleRevievProduct = () => {
    console.log("go to product reviev");
  };
  const handleEditProduct = () => {
    console.log("go to product edit");
  };

  const handlePublishProduct = () => {
    console.log("toggle isPublished");
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, borderRadius: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <Divider />
        <TableContainer>
          <Table
            sx={{ minWidth: 650 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={(event) => handleClick(event, row.id)}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      <div className="flex items-center">
                        <Avatar
                          alt="profile"
                          sizes=""
                          src={row.product.imageSource}
                          className="mr-2 my-2"
                          variant="rounded"
                        />
                        <div className="flex flex-col">
                          <div className="font-medium">
                            {row.product.productName}
                          </div>
                          <div className="text-gray-500">
                            {row.product.barcode}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="right">{row.category}</TableCell>
                    <TableCell align="right"> {row.price} $</TableCell>
                    <TableCell align="right">
                      <Switch
                        defaultChecked
                        checked={row.isPublished}
                        onClick={handlePublishProduct}
                      />
                    </TableCell>

                    <TableCell align="right">
                      <IconButton onClick={handleEditProduct}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={handleRevievProduct}>
                        <RemoveRedEyeOutlined />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
