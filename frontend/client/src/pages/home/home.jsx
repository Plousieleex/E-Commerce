import HomeProductCard from "../../components/home/homeProductCard";

function Home() {
  const mainPageCategories = [
    {
      url: "https://blocks.primereact.org/demo/images/blocks/ecommerce/storefront/storefront-1-9.png",
      categoryName: "Category name 1",
    },
    {
      url: "https://blocks.primereact.org/demo/images/blocks/ecommerce/storefront/storefront-1-12.png",
      categoryName: "Category name 2",
    },
    {
      url: "https://blocks.primereact.org/demo/images/blocks/ecommerce/storefront/storefront-1-13.png",
      categoryName: "Category name 3",
    },
    {
      url: "https://blocks.primereact.org/demo/images/blocks/ecommerce/storefront/storefront-1-10.png",
      categoryName: "Category name 4",
    },
    {
      url: "https://blocks.primereact.org/demo/images/blocks/ecommerce/storefront/storefront-1-11.png",
      categoryName: "Category name 4",
    },
  ];

  const cards = [
    {
      img: "https://blocks.primereact.org/demo/images/blocks/ecommerce/productlist/product-list-6-1.png",
      name: "Ürün 1",
      brand: "Marka 1",
      cost: "100",
    },
    {
      img: "https://blocks.primereact.org/demo/images/blocks/ecommerce/productlist/product-list-6-2.png",
      name: "Ürün 2",
      brand: "Marka 2",
      cost: "150",
    },
    {
      img: "https://blocks.primereact.org/demo/images/blocks/ecommerce/productlist/product-list-6-3.png",
      name: "Ürün 3",
      brand: "Marka 3",
      cost: "80",
    },
    {
      img: "https://blocks.primereact.org/demo/images/blocks/ecommerce/productlist/product-list-6-4.png",
      name: "Ürün 4",
      brand: "Marka 4",
      cost: "200",
    },
  ];
  /*{
      img: "https://blocks.primereact.org/demo/images/blocks/ecommerce/productlist/product-list-6-5.png",
      name: "Ürün 5",
      brand: "Marka 5",
      cost: "120",
    },
    {
      img: "https://blocks.primereact.org/demo/images/blocks/ecommerce/productlist/product-list-6-6.png",
      name: "Ürün 6",
      brand: "Marka 6",
      cost: "90",
    }, */
  return (
    <div className="mx-auto block">
      <div className="grid grid-cols-12 grid-flow-col min-h-[60rem] text-white">
        {mainPageCategories.map((category, index) =>
          index < 2 ? (
            <div
              key={index}
              className="bg-cover bg-center row-span-6 col-span-3 p-4 flex flex-col justify-end"
              style={{ backgroundImage: `url(${category.url})` }}
            >
              <span className="mb-2 font-bold text-2xl">
                {category.categoryName}
              </span>
              <a href="#" className="flex items-center p-2 font-medium">
                Explore Category <i className="pi pi-arrow-right ml-2 "></i>
              </a>
            </div>
          ) : index < 4 ? (
            <div
              key={index}
              className="bg-cover bg-center row-span-6 col-span-3 p-4 flex flex-col items-end justify-end"
              style={{ backgroundImage: `url(${category.url})` }}
            >
              <span className="mb-2 font-bold text-2xl">
                {category.categoryName}
              </span>
              <a href="#" className="flex items-center p-2 font-medium">
                Explore Category <i className="pi pi-arrow-right ml-2 "></i>
              </a>
            </div>
          ) : index === 4 ? (
            <div
              key={index}
              className="bg-cover bg-center row-span-12 col-span-6 p-4 flex-col ml-[1px]"
              style={{ backgroundImage: `url(${category.url})` }}
            >
              <span className="mb-2 font-bold text-2xl">
                {category.categoryName}
              </span>
              <a href="#" className="flex items-center p-2 font-medium">
                Explore Category <i className="pi pi-arrow-right ml-2 "></i>
              </a>
            </div>
          ) : (
            ""
          )
        )}
      </div>

      <div className="px-16 py-20 md:px-24 lg:px-20 ">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-4 flex flex-col items-center mb-3 md:mb-0">
            <span className="flex justify-center items-center bg-blue-500 rounded-full w-[3rem] h-[3rem] mb-4">
              <i className="pi pi-arrow-right text-white text-xl"></i>
            </span>
            <span className="text-lg  mb-4">Pay Later in 30 Days</span>
            <p className="leading-3 text-sm font-thin text-gray-600 py-0 m-0 px-3">
              Ullamcorper sit amet risus nullam eget felis eget nunc.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 flex flex-col items-center mb-3 md:mb-0">
            <span className="flex justify-center items-center bg-cyan-500 rounded-full w-12 h-12 mb-4">
              <i className="pi pi-shopping-cart text-white text-xl"></i>
            </span>
            <span className="text-lg  mb-4">Pay Later in 30 Days</span>
            <p className="leading-3 text-sm font-thin text-gray-600 py-0 m-0 px-3">
              Ullamcorper sit amet risus nullam eget felis eget nunc.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 flex flex-col items-center mb-3 md:mb-0">
            <span className="flex justify-center items-center bg-orange-500 rounded-full w-[3rem] h-[3rem] mb-4">
              <i className="pi pi-shield text-white text-xl"></i>
            </span>
            <span className="text-lg  mb-4">Pay Later in 30 Days</span>
            <p className="leading-3 text-sm font-thin text-gray-600 py-0 m-0 px-3">
              Ullamcorper sit amet risus nullam eget felis eget nunc.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 mx-4 gap-8 px-12 py-20 md:px-12 lg:px-20 text-white">
        <div
          className="col-span-6 row-span-12 min-h-[40rem] rounded-[6px] "
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://blocks.primereact.org/demo/images/blocks/ecommerce/storefront/storefront-1-28.png)",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="p-8 flex flex-col justify-between h-full">
            <div className="flex flex-col">
              <span className="text-xl font-bold">Category Title</span>
              <p className="mt-2">
                Quis varius quam quisque id diam. A pellentesque sit amet
                porttitor eget. Vitae purus faucibus ornare suspendisse sed nisi
                lacus.
              </p>
            </div>
            <a className="flex justify-end items-center text-xl" href="#">
              Shop Now <i className="pi pi-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
        <div
          className="col-span-6 row-span-6  rounded-[6px]"
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://blocks.primereact.org/demo/images/blocks/ecommerce/storefront/storefront-1-27.png)",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="p-8 flex flex-col justify-between h-full">
            <div className="flex flex-col">
              <span className="text-xl font-bold">Category Title</span>
              <p className="mt-2">Quis varius quam quisque id diam</p>
            </div>
            <a className="flex justify-end items-center text-xl" href="#">
              Shop Now <i className="pi pi-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
        <div
          className="col-span-6 row-span-6 rounded-[6px]"
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(https://blocks.primereact.org/demo/images/blocks/ecommerce/storefront/storefront-1-26.png)",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="p-8 flex flex-col justify-between h-full">
            <div className="flex flex-col">
              <span className="text-xl font-bold">Category Title</span>
              <p className="mt-2">Vitae purus faucibus ornare</p>
            </div>
            <a className="flex justify-end items-center text-xl" href="#">
              Shop Now <i className="pi pi-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="px-12 py-20 md:px-6 lg:px-20 flex flex-wrap">
        <div className="p-4 flex-1">
          <div className="flex bg-no-repeat bg-cover bg-[url('https://blocks.primereact.org/demo/images/blocks/ecommerce/storefront/storefront-1-8.png')] rounded-md p-4">
            <div className="rounded-md border-2 border-white w-full flex">
              <div className="flex-1 flex flex-col text-center font-medium bg-white backdrop-blur-lg bg-opacity-40 py-12">
                <span className="mb-8 text-xl">Up To</span>
                <span className="mb-8 text-[2.5rem]">
                  25 <span className="text-xl"> % OFF</span>
                </span>
                <span className="text-xl">Exclusive JEWELRY</span>
              </div>
              <div className="flex-1 bg-no-repeat bg-[url('https://blocks.primereact.org/demo/images/blocks/ecommerce/storefront/storefront-1-8.png')] bg-cover bg-center rounded-r-md"></div>
            </div>
          </div>
        </div>
        <div className="p-4 flex-1">
          <div className="p-4 rounded-md bg-[url('https://blocks.primereact.org/demo/images/blocks/ecommerce/storefront/storefront-1-7.png')] bg-cover bg-no-repeat">
            <div className="border-2 border-white rounded-md flex">
              <div className="flex-1 flex flex-col text-center py-12 bg-opacity-40 backdrop-blur-lg bg-white">
                <span className="mb-8 text-xl">Up To</span>
                <span className="mb-8 text-[2.5rem]">
                  25 <span className="text-xl"> % OFF</span>
                </span>
                <span className="text-xl">Exclusive JEWELRY</span>
              </div>
              <div className="flex-1 bg-[url('https://blocks.primereact.org/demo/images/blocks/ecommerce/storefront/storefront-1-7.png')] bg-cover bg-no-repeat"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-12 py-20 md:px-6 lg:px-20">
        <div className="p-4">
          <HomeProductCard cards={cards} />
        </div>
      </div>
    </div>
  );
}

export default Home;
