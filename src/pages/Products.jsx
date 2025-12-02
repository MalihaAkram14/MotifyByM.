import { useState } from "react";
import { Link } from "react-router-dom";
import productsData from "../data/products.json";
import { Helmet } from "react-helmet";


const Products = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // ---------------- Pagination States ----------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; 

  // Filter products based on search and category
  const filteredProducts = productsData.filter((item) => {
  const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
  const matchesCategory =
    selectedCategory === "all" || item.category === selectedCategory;
  return matchesSearch && matchesCategory; // remove positivePrice check
});




  // ---------------- Ensure Pagination has only four product ----------------
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="pt-24 px-8 pb-16">
      <h2 className="text-3xl font-bold text-center mb-8">Products</h2>

      {/* ----------------Search & Filter Section----------------- */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
        <input
          type="text"
          placeholder="Search products..."
          className="border px-4 py-2 rounded w-full md:w-1/3"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1); // reset page on search
          }}
        />

        <select
          className="border px-4 py-2 rounded w-full md:w-1/4"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1); // reset page on filter change
          }}
        >
          <option value="all">All Categories</option>
          <option value="sports">Sports</option>
          <option value="clothing">Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="home&kitchen">Kitchen</option>
          <option value="shoes">Shoes</option>
        </select>
      </div>

      {/* ---------------Product List------------------ */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-6 ">

        {currentProducts.length === 0 ? (
          <p className="col-span-full text-center text-gray-600">
            No products found.
          </p>
        ) : (
          currentProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow w-120 mx-auto hover:shadow-lg transition relative"
            >
              <Link to={`/product/${product.id}`}>
                <div className="cursor-pointer">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-40 w-full object-cover rounded mb-3"
                  />
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-gray-600 text-sm">{product.category}</p>
                 <p className="font-bold mt-2">${Math.abs(product.price)}</p>       {/*ensure that negative price is not less then 0 */}
                  <p className="font-bold mt-2">{product.description}</p>
                </div>
              </Link>

              <button className="bg-yellow-500 hover:bg-yellow-600 text-white mt-3 py-1 px-3 rounded w-full">
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>

      {/* ---------------- Pagination Buttons ---------------- */}
      {totalPages > 1 && (
       <div className="fixed bottom-0 left-0 w-full bg-white py-3 shadow-md flex justify-center gap-2 z-50">


          <button
            className="px-3 py-1 border rounded"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === index + 1 ? "bg-gray-800 text-white" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="px-3 py-1 border rounded"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>

        </div>
      )}
    </div>
  );
};

export default Products;
