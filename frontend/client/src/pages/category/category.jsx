import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import Breadcrumb from "../../components/ui/breadcrumb/breadcrumb";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, useLoaderData } from "react-router-dom";
import { menuCategories } from "../../store";

const Category = () => {
  const products = useLoaderData();
  console.log(products);
  return (
    <div className="flex flex-col p-6 md:px-12 py-20 lg:p-20">
      <div>
        <Breadcrumb />
        <Typography>
          Nullam faucibus, sem et bibendum finibus, sapien ipsum congue felis,
          sit amet pretium ex nisl ut eros.
        </Typography>
      </div>

      <div className="flex flex-wrap w-full lg:flex-nowrap mt-8">
        <div className="mr-4 flex flex-col w-full lg:basis-1/4 ">
          <ul>
            {menuCategories[1].subCategories[0].productCategories.map(
              (productCategoryNavigation) => (
                <li key={productCategoryNavigation}>
                  <Link
                    to={`/category/${menuCategories[1].name.toLowerCase()}/${productCategoryNavigation.toLowerCase()}`}
                  >
                    {productCategoryNavigation}
                  </Link>
                </li>
              )
            )}
          </ul>
          <div>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Size</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Link to={"/somewhere"}>Likn</Link>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>Color</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>Price</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div className="bg-red-300 w-full"></div>
      </div>
    </div>
  );
};

export default Category;
