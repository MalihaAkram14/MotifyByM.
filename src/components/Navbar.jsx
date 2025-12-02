import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingBag } from "react-icons/fa";
import products from "../data/products.json"; 


const Navbar = () => {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

 
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* --------------------------NAVBAR----------------------- */}
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50 px-6 py-3 flex items-center justify-between border-b">

        {/* ---------------LOGO------------------- */}
        <Link to="/" className="text-xl font-bold tracking-wide">
          Motify By M.
        </Link>

        {/* -------------------CENTER LINKS----------------------------- */}
        <div className="hidden md:flex gap-8 font-medium">
          <Link to="/category/clothing" className="hover:text-black">Clothing</Link>
          <Link to="/category/sports" className="hover:text-black">Sports</Link>
          <Link to="/category/electronics" className="hover:text-black">Electronics</Link>
          <Link to="/category/home&kitchen" className="hover:text-black">Kitchen</Link>
          <Link to="/category/shoes" className="hover:text-black">Shoes</Link>
        </div>

        {/* -----------------SEARCH + CART----------------------- */}
        <div className="relative flex items-center gap-4">

          {/* -----------------------SEARCH BAR---------------------- */}
          <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              className="bg-transparent px-2 outline-none text-sm w-40 md:w-60"
              placeholder="Search products..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
            />
          </div>

          {/* -------------------CART ICON------------------- */}
          <Link to="/cart">
            <FaShoppingBag className="text-xl" />
          </Link>

          {/* --------------SEARCH RESULTS------------------------- */}
          {showResults && query.length > 0 && (
            <div
              className="absolute right-0 top-12 bg-white shadow-lg rounded-lg p-4 w-72 md:w-96 max-h-96 overflow-y-auto border"
            >
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
                    to={`/product/${p.id}`} 
                      className="border p-2 rounded hover:shadow block"
                            onClick={() => setShowResults(false)} // close popup
                  >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-24 w-full object-cover rounded"
                      />
                        <p className="text-sm font-medium mt-1">{p.name}</p>
                        <p className="text-xs text-gray-600">${Math.abs(p.price)}</p>

                         <p className="text-xs text-gray-600">${p.description}</p>
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

      {/* --------------Space under navbar------------------ */}
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;
