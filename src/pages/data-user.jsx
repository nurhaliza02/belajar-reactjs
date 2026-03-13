import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// Loading Component dengan Animasi baru
function LoadingCircleSpinner() {
  return (
    <div className="container">
      <motion.div
        className="spinner"
        animate={{ transform: "rotate(360deg)" }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <StyleSheet />
    </div>
  );
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {
  return (
    <style>
      {`
            /* make overlay cover full screen so spinner is visible */
            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100vw;
                height: 100vh;
                // background-color: #EA7B7B; 
            }

            .spinner {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: 4px solid var(--divider, #ccc);
                border-top-color: #ff0088;
                will-change: transform;
            }
            `}
    </style>
  );
}

export default function DataUser() {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/carts");
      setCarts(response.data.carts);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingCircleSpinner />
      ) : (
        <div className="min-h-screen">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl font-bold text-dark-grey mb-2">
                Cart Overview
              </h1>
              <p className="text-pink-300 text-lg">
                A quick summary of your selected products and total price.
              </p>
            </motion.div>

            <div className="space-y-8">
              {carts.map((cart, cartIndex) => (
                <motion.div
                  key={cart.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: cartIndex * 0.1 }}
                  className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-pink-200 shadow-lg"
                >
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
                        className="bg-white/70 rounded-lg p-4 border border-purple-200 hover:border-pink-300 transition-all duration-300 hover:shadow-md"
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
                                <span className="text-dark-gray-300">
                                  Price:
                                </span>
                                <span className="text-green-400 font-semibold">
                                  ${product.price}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-dark-gray-300">
                                  Discount:
                                </span>
                                <span className="text-blue-400">
                                  {product.discountPercentage}%
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-dark-gray-300">
                                  Quantity:
                                </span>
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
                      <span className="text-gray-500 font-medium">
                        Cart Total:
                      </span>
                      <span className="text-2xl font-bold text-gray-700">
                        ${cart.discountedTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
