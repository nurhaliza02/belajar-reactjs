import { motion } from "framer-motion";

export default function StyleDataUser({ carts, handleView, handleProduct }) {
  return (
    <div className="space-y-8">
      {carts.map((cart, cartIndex) => (
        <motion.div
          key={cart.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: cartIndex * 0.1 }}
          className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-pink-200 shadow-lg"
        >
          {handleView && (
            <button
              className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition mb-4"
              onClick={() => handleView(cart.userId)}
            >
              View {cart.userId}'s Carts
            </button>
          )}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">
              Cart #{cart.id}
            </h2>
            <div className="text-right">
              <p className="text-gray-500 text-sm">Total Items</p>
              <p className="text-gray-700 font-bold text-xl">
                {cart.products.length}
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cart.products.map((product, productIndex) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: productIndex * 0.1,
                }}
                onClick={() => handleProduct && handleProduct(product.id)}
                className="cursor-pointer bg-white/70 rounded-lg p-4 border border-purple-200 hover:border-pink-300 hover:scale-105 transition-all duration-300 hover:shadow-md"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-20 h-20 object-cover rounded-lg border-2 border-pastel-600"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-dark-gray-300">Price:</span>
                        <span className="text-green-400 font-semibold">
                          ${product.price}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-dark-gray-300">Discount:</span>
                        <span className="text-blue-400">
                          {product.discountPercentage}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-dark-gray-300">Quantity:</span>
                        <span className="text-purple-400 font-semibold">
                          {product.quantity}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-600">
                        <span className="text-dark-gray-300 font-medium">
                          Total:
                        </span>
                        <span className="text-yellow-400 font-bold">
                          ${product.discountedTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-pastel-600">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium">Cart Total:</span>
              <span className="text-2xl font-bold text-gray-700">
                ${cart.discountedTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
