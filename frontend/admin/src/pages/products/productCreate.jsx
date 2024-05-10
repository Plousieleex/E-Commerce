import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, MenuItem, Button, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const validationSchema = Yup.object({
  productName: Yup.string()
    .required("Product name is required")
    .min(2, "Product name should be at least 2 character"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().required("Description is required"),
  stock: Yup.number()
    .required("Stock is required")
    .positive("Stock must be positive")
    .integer("Stock must be an integer"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
});

const categories = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "books", label: "Books" },
  // Add more categories as needed
];
const vendors = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "books", label: "Books" },
  // Add more categories as needed
];

const ProductCreate = () => {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the dropped files
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Formik
      initialValues={{
        productName: "",
        category: [],
        vendor: [],
        description: "",
        stock: 0,
        price: 0,
        sellingPrice: 0,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        // Handle form submission here
        console.log(values);
      }}
    >
      {(formik) => (
        <div className="w-full md:px-28 mt-16">
          <Typography variant="h4" sx={{ mb: "1.5rem" }}>
            Create Product
          </Typography>
          <Box sx={{ boxShadow: 2, p: 4, borderRadius: 2, minWidth: 250 }}>
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    id="productName"
                    name="productName"
                    label="Product Name"
                    value={formik.values.productName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.productName &&
                      Boolean(formik.errors.productName)
                    }
                    helperText={
                      formik.touched.productName && formik.errors.productName
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    id="category"
                    name="category"
                    label="Category"
                    select
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.category && Boolean(formik.errors.category)
                    }
                    helperText={
                      formik.touched.category && formik.errors.category
                    }
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.value} value={category.value}>
                        {category.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    id="vendor"
                    name="vendor"
                    label="Vendor"
                    select
                    value={formik.values.vendor}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.vendor && Boolean(formik.errors.vendor)
                    }
                    helperText={formik.touched.vendor && formik.errors.vendor}
                  >
                    {vendors.map((vendor) => (
                      <MenuItem key={vendor.value} value={vendor.value}>
                        {vendor.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <div
                    {...getRootProps()}
                    style={{
                      border: "1px dashed black",
                      borderRadius: 8,
                      padding: "40px",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <Typography>Drop the image here ...</Typography>
                    ) : (
                      <Typography>
                        Drag 'n' drop an image here, or click to select an image
                      </Typography>
                    )}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    id="description"
                    name="description"
                    label="Description"
                    multiline
                    rows={4}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    size="small"
                    fullWidth
                    id="stock"
                    name="stock"
                    label="Stock"
                    type="number"
                    value={formik.values.stock}
                    onChange={formik.handleChange}
                    error={formik.touched.stock && Boolean(formik.errors.stock)}
                    helperText={formik.touched.stock && formik.errors.stock}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    size="small"
                    fullWidth
                    id="price"
                    name="price"
                    label="Price"
                    type="number"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    size="small"
                    fullWidth
                    id="sellingPrice"
                    name="sellingPrice"
                    label="Selling price"
                    type="number"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" type="submit">
                    Create Product
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Box>
        </div>
      )}
    </Formik>
  );
};

export default ProductCreate;
