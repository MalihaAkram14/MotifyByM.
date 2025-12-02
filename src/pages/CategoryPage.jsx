import { Link, useParams } from "react-router-dom";
import products from "../data/products.json";
import { Helmet } from "react-helmet";


const CategoryPage = () => {
  const { categoryName } = useParams();

  const filteredProducts = products.filter(
    (p) => p.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <div className="pt-20 px-6">
      <h1 className="text-3xl font-bold mb-6 capitalize text-center">
        {categoryName} Products
      </h1>

      {filteredProducts.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow">

              {/* CLICK to go to Product Details */}
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h2 className="font-semibold mt-2">{product.name}</h2>
                <p className="text-gray-600">${Math.abs(product.price)}</p> 
                <p className="text-gray-600">${product.description}</p>
              </Link>

               
              <button className="mt-3 w-full bg-black text-white py-2 rounded hover:bg-gray-800 ">
                Add to Cart
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;


