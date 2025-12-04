import { useParams } from "react-router-dom";
import products from "../data/products.json";
import { Helmet } from "react-helmet";
import { useCart } from "../context/CartContext";


const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));


  if (!product) {
    return <h2 className="text-center mt-20">Product not found</h2>;
  }
  const { addToCart } = useCart();

  return (
    <div className="max-w-4xl mx-auto p-6 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* ---------------------------------IMAGE--------------------- */}
        <img
          src={product.image}
          alt={product.name}
          
          className="w-full h-96 object-cover rounded"
        />

        {/* ---------------Details for product----------------------- */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl text-gray-700 mt-2">${Math.abs(product.price)}</p>
          <p className="mt-4 text-gray-600">{product.description}</p>

          <button
  className="mt-6 px-6 py-3 bg-black text-white rounded hover:bg-gray-800"
  onClick={() => addToCart(product)}
>
  Add to Cart
</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
