import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, MenuItem, Button, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";

const validationSchema = Yup.object({
  categoryName: Yup.string()
    .required("Category name is required")
    .min(2, "Category name should be at least 2 character"),
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

const Create = () => {
  return (
    <Formik
      initialValues={{
        categoryName: "",
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
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="categoryName"
                    name="categoryName"
                    label="Category Name"
                    value={formik.values.categoryName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.categoryName &&
                      Boolean(formik.errors.categoryName)
                    }
                    helperText={
                      formik.touched.categoryName && formik.errors.categoryName
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    id="parentCategory"
                    name="parentCategory"
                    label="Select Parent Category"
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
                  <Button variant="contained" color="primary" type="submit">
                    Save Category
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

export default Create;
