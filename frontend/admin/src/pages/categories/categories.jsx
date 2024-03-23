import { Button, Typography } from "@mui/material";
import CategoryTable from "../../components/categories/categoryTable/categoryTable";

const Categories = () => {
  return (
    <div className="xl:mx-28 flex flex-col pt-16">
      <div className="flex justify-between mb-6 items-center">
        <Typography variant="h4">Categories</Typography>
        <Button variant="contained">Add Category</Button>
      </div>
      <CategoryTable />
    </div>
  );
};

export default Categories;
