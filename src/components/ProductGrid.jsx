import { Link } from "react-router-dom";

const ProductGrid = ({ products }) => {
  if (products.length === 0) {
    return <p className="text-center text-gray-600">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded p-4 shadow">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-cover rounded"
            />
            <h3 className="font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-600">{product.category}</p>
            <p className="mt-1 font-bold">${Math.abs(product.price)}</p>
          </Link>

          <button className="mt-3 w-full bg-black text-white py-2 rounded">
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
