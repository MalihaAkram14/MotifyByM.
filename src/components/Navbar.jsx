import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaSearch, FaShoppingBag } from "react-icons/fa";
import products from "../data/products.json";
import { useCart } from "../context/CartContext"; // ← import your cart context

const Navbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { cartItems } = useCart(); // ← get cart items from context

  const initialQuery = searchParams.get("search") || "";
  const [query, setQuery] = useState(initialQuery);
  const [showResults, setShowResults] = useState(false);

  // Calculate total quantity for badge
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Filter products based on search query
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setShowResults(false);
    navigate(`/products?search=${query}&page=1`);
  };

  return (
    <>
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50 px-6 py-3 flex items-center justify-between border-b">
        <Link to="/" className="text-xl font-bold tracking-wide">
          Motify By M.
        </Link>

        {/* Category Buttons */}
        <div className="hidden md:flex gap-8 font-medium">
          {["clothing","sports","electronics","kitchen","shoes"].map((cat) => (
            <button
              key={cat}
              className="hover:text-black"
              onClick={() => {
                navigate(`/products?category=${cat}&page=1`);
              }}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Search & Cart */}
        <div className="relative flex items-center gap-4">
          <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
            <FaSearch className="text-gray-500" />
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                className="bg-transparent px-2 outline-none text-sm w-40 md:w-60"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setShowResults(true)}
              />
              <button type="submit" className="ml-2 text-sm">Search</button>
            </form>
          </div>

          {/* Cart Icon with Badge */}
          <div className="relative">
            <Link to="/cart">
              <FaShoppingBag className="text-xl" />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalQuantity}
                </span>
              )}
            </Link>
          </div>

          {/* Search Results Dropdown */}
          {showResults && query.length > 0 && (
            <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg p-4 w-72 md:w-96 max-h-96 overflow-y-auto border">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Search Results</h3>
                <button
                  onClick={() => setShowResults(false)}
                  className="text-sm text-gray-500 hover:text-black"
                >
                  Close
                </button>
              </div>

              {filtered.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {filtered.map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.id}?search=${query}`}
                      className="border p-2 rounded hover:shadow block"
                      onClick={() => setShowResults(false)}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-24 w-full object-cover rounded"
                      />
                      <p className="text-sm font-medium mt-1">{p.name}</p>
                      <p className="text-xs text-gray-600">${Math.abs(p.price)}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">No products found</p>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;
