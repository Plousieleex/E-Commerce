/*<TextField
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
*/
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function GroupedAutocompleteInput() {
  const options = top100Films.map((option) => {
    const firstLetter = option.parentName[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  return (
    <Autocomplete
      size="small"
      id="grouped-demo"
      options={options.sort(
        (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
      )}
      groupBy={(option) => option.parentName}
      getOptionLabel={(option) => option.name}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="With category name" />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { name: "T-shirt", parentName: "Men" },
  { name: "T-shirt", parentName: "Women" },
  { name: "Shoes", parentName: "Men" },
  { name: "Shoes", parentName: "Women" },
  { name: "Watch", parentName: "Men" },
  { name: "Skirt", parentName: "Women" },
  { name: "Bag", parentName: "Men" },
  { name: "Bag2", parentName: "Men" },
  { name: "Shoes", parentName: "Children" },
  { name: "Hat", parentName: "Men" },
];
