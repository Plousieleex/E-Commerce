const API_URL = "http://127.0.0.1:3000/api/v1";

export async function productLoader(params) {
  let apiUrl = `${API_URL}/parentcategory`;

  if (params.productCategory) {
    apiUrl += `/productcategory/${params.productCategory}`;
  } else if (params.subCategory) {
    apiUrl += `/subcategory/${params.subCategory}`;
  } else if (params.parentCategory) {
    apiUrl += `/parentcategory/${params.parentCategory}`;
  }

  const res = await fetch(apiUrl);
  console.info(apiUrl);
  if (res.ok) {
    const { data } = await res.json();
    return data;
  } else {
    return "error occurred";
  }
}
