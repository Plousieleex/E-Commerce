import { useState } from "react";
import { Link } from "react-router-dom";

const menuCategories = [
  {
    name: "Women",
    subCategories: [
      {
        name: "Clothing",
        img: "https://blocks.primereact.org/demo/images/blocks/ecommerce/storenavigation/storenavigation-2-1.png",
        productCategories: [
          "Dresses",
          "Jeans",
          "Pants",
          "Skirts",
          "Sweaters",
          "Blouses",
        ],
      },
      {
        name: "Shoes",
        img: "https://blocks.primereact.org/demo/images/blocks/ecommerce/storenavigation/storenavigation-2-2.png",
        productCategories: [
          "Athletic",
          "Boots",
          "Sneakers",
          "Flats",
          "Outdoor",
        ],
      },
      {
        name: "Accessories",
        img: "https://blocks.primereact.org/demo/images/blocks/ecommerce/storenavigation/storenavigation-2-3.png/",
        productCategories: ["Handbags", "Gloves", "Belts", "Hats", "Earmuffs"],
      },
    ],
  },
  {
    name: "Men",
    subCategories: [
      {
        name: "Clothingd",
        img: "https://blocks.primereact.org/demo/images/blocks/ecommerce/storenavigation/storenavigation-2-1.png",
        productCategories: ["Jeans", "Pants", "Sweaters", "Blouses"],
      },
      {
        name: "Shoes",
        img: "https://blocks.primereact.org/demo/images/blocks/ecommerce/storenavigation/storenavigation-2-3.png/",
        productCategories: [
          "Athletic",
          "Boots",
          "Sneakers",
          "Flats",
          "Outdoor",
        ],
      },
      {
        name: "Accessories",
        img: "https://blocks.primereact.org/demo/images/blocks/ecommerce/storenavigation/storenavigation-2-2.png",
        productCategories: ["Handbags", "Gloves", "Belts", "Hats"],
      },
    ],
  },
  {
    name: "Kids",

    subCategories: [
      {
        name: "Clothing",
        img: "https://blocks.primereact.org/demo/images/blocks/ecommerce/storenavigation/storenavigation-2-1.png",
        productCategories: [
          "Dresses",
          "Jeans",
          "Pants",
          "Skirts",
          "Sweaters",
          "Blouses",
        ],
      },
      {
        name: "Shoes",
        img: "https://blocks.primereact.org/demo/images/blocks/ecommerce/storenavigation/storenavigation-2-3.png/",
        productCategories: [
          "Athletic",
          "Boots",
          "Sneakers",
          "Flats",
          "Outdoor",
        ],
      },
      {
        name: "Accessories",
        img: "https://blocks.primereact.org/demo/images/blocks/ecommerce/storenavigation/storenavigation-2-2.png",
        productCategories: ["Handbags", "Gloves", "Belts", "Hats", "Earmuffs"],
      },
    ],
  },
];

const Menu = () => {
  const [expandedMenus, setExpandedMenus] = useState({});
  const handleMouseEnter = (menuName) => {
    setExpandedMenus((prevState) => ({
      ...prevState,
      [menuName]: true,
    }));
  };

  const handleMouseLeave = (menuName) => {
    setExpandedMenus((prevState) => ({
      ...prevState,
      [menuName]: false,
    }));
  };

  const handleMouseEnterOnMenu = (menuName) => {
    setExpandedMenus((prevState) => ({
      ...prevState,
      [menuName]: true,
    }));
  };

  const handleMouseLeaveOnMenu = (menuName) => {
    setExpandedMenus((prevState) => ({
      ...prevState,
      [menuName]: false,
    }));
  };

  const handleCloseExpandedMenus = (menuName) => {
    setExpandedMenus((prevState) => ({
      ...prevState,
      [menuName]: false,
    }));
  };

  return (
    <ul className="flex">
      {menuCategories.map((menuCategory) => (
        <div key={menuCategory.name}>
          <li
            key={menuCategory.name}
            onMouseEnter={() => handleMouseEnter(menuCategory.name)}
            onMouseLeave={() => handleMouseLeave(menuCategory.name)}
            className="border-b-2 border-white hover:border-black flex h-full items-center"
          >
            <div className="mx-4 text-center hover:cursor-pointer">
              <Link
                to={menuCategory.name.toLocaleLowerCase()}
                onClick={() => handleCloseExpandedMenus(menuCategory.name)}
              >
                {menuCategory.name}
              </Link>
            </div>
          </li>
          {expandedMenus[menuCategory.name] && (
            <div
              className="absolute z-40 top-full w-full left-0 bg-gray-800 text-white p-4 shadow-lg"
              onMouseEnter={() => handleMouseEnterOnMenu(menuCategory.name)}
              onMouseLeave={() => handleMouseLeaveOnMenu(menuCategory.name)}
            >
              <ul
                className={`w-full grid grid-cols-2 lg:grid-flow-col lg:auto-cols-max`}
              >
                {menuCategory.subCategories.map((subCategory) => (
                  <li className="p-12" key={subCategory.name}>
                    <img
                      className="rounded-xl mb-4"
                      src={subCategory.img}
                      alt={subCategory.name}
                      width={271}
                      height={160}
                    />
                    <div className="my-8 text-white text-lg font-bold">
                      <Link
                        onClick={() =>
                          handleCloseExpandedMenus(menuCategory.name)
                        }
                        to={
                          menuCategory.name.toLocaleLowerCase() +
                          "/" +
                          subCategory.name.toLowerCase()
                        }
                      >
                        {subCategory.name}
                      </Link>
                    </div>
                    <ul>
                      {subCategory.productCategories.map(
                        (productCategory, key) => (
                          <li className="mb-4" key={key}>
                            <Link
                              onClick={() =>
                                handleCloseExpandedMenus(menuCategory.name)
                              }
                              to={
                                menuCategory.name.toLocaleLowerCase() +
                                "/" +
                                subCategory.name.toLowerCase() +
                                "/" +
                                productCategory.toLowerCase()
                              }
                            >
                              {productCategory}
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </ul>
  );
};

export default Menu;
