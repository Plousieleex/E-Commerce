import { Button, Typography } from "@mui/material";
import ProductTable from "../../components/products/productTable/productTable";

const ProductList = () => {
  return (
    <div className="xl:mx-28 flex flex-col pt-16">
      <div className="flex justify-between mb-6 items-center">
        <Typography variant="h4">Products</Typography>
        <Button variant="contained">Add Product</Button>
      </div>
      <ProductTable />
    </div>
  );
};

export default ProductList;
