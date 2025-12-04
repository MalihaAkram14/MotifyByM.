import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import productsData from "../data/products.json";
import { useCart } from "../context/CartContext";


const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "all";
  const page = parseInt(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";

  const [currentPage, setCurrentPage] = useState(page);
  const [searchQuery, setSearchQuery] = useState(search);

  const itemsPerPage = 4;

  // Filter products
  const filteredProducts = productsData.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Sync URL with page, search, category
  useEffect(() => {
    const params = {};
    if (searchQuery) params.search = searchQuery;
    if (category !== "all") params.category = category;
    params.page = currentPage;
    setSearchParams(params);
  }, [currentPage, searchQuery, category, setSearchParams]);

  // Update state if URL changes
  useEffect(() => {
    setCurrentPage(page);
    setSearchQuery(search);
  }, [page, search,category]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const { addToCart } = useCart();

  return (
    <div className="pt-24 px-8 pb-16">
      <h2 className="text-3xl font-bold text-center mb-8">
        {category === "all" ? "Products" : category.toUpperCase()}
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
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
              <Link
                to={`/product/${product.id}?category=${category}&page=${currentPage}`}
              >
                <div className="cursor-pointer">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-40 w-full object-cover rounded mb-3"
                  />
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-gray-600 text-sm">{product.category}</p>
                  <p className="font-bold mt-2">${Math.abs(product.price)}</p>
                  <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                </div>
              </Link>

             <button
  className="bg-yellow-500 hover:bg-yellow-600 text-white mt-3 py-1 px-3 rounded w-full"
  onClick={() => addToCart(product)}
>
  Add to Cart
</button>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="fixed bottom-0 left-0 w-full bg-white py-3 shadow-md flex justify-center gap-2 z-50">
          <button
            className="px-3 py-1 border rounded"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-gray-800 text-white" : ""
              }`}
            >
              {i + 1}
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
