import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  // Use Math.abs to handle negative prices
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + Math.abs(item.price) * item.quantity,
    0
  );

  return (
    <div className="pt-24 px-8 pb-16 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">
          Your cart is empty. <Link to="/products" className="text-blue-600 underline">Shop Now</Link>
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cartItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 flex gap-4 items-center shadow hover:shadow-lg transition">
                <img src={item.image} alt={item.name} className="h-24 w-24 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">{item.category}</p>
                  <p className="font-bold mt-1">${Math.abs(item.price)}</p> {/* ← Math.abs here */}

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(item.quantity - 1, 1))}
                      className="px-2 py-1 border rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 text-right">
            <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
            <button
              onClick={clearCart}
              className="mt-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
