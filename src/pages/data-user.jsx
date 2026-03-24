import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import StyleDataUser from "../components/style-data-user";

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
  const navigate = useNavigate();

  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isCategoryMode, setIsCategoryMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);

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

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products/category-list",
      );
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategoryProducts = async (category, page = 1) => {
    setLoading(true);
    setIsCategoryMode(true);
    setSelectedCategory(category);
    setCurrentPage(page);
    const skip = (page - 1) * limit;
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`,
      );
      setProducts(response.data.products);
      setTotalProducts(response.data.total);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCategories();
  }, []);

  const handlePageChange = (newPage) => {
    if (isSearching) {
      handleSearchPagination(newPage);
    } else if (isCategoryMode) {
      fetchCategoryProducts(selectedCategory, newPage);
    }
  };

  const handleSearchPagination = async (page) => {
    setLoading(true);
    setCurrentPage(page);
    const skip = (page - 1) * limit;
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/search?q=${searchQuery}&limit=${limit}&skip=${skip}`,
      );
      setProducts(response.data.products);
      setTotalProducts(response.data.total);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleView = async (userId) => {
    console.log("view userID:", userId);
    navigate(`/detail-cards/${userId}`);
  };

  const handleProduct = async (productId) => {
    console.log("view productID:", productId);
    navigate(`/product-detail/${productId}`);
  };

  const searchProducts = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setIsSearching(true);
    setCurrentPage(1);
    try {
      const skip = 0;
      const response = await axios.get(
        `https://dummyjson.com/products/search?q=${searchQuery}&limit=${limit}&skip=${skip}`,
      );
      setProducts(response.data.products);
      setTotalProducts(response.data.total);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

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
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg mr-2"
                />
                <button
                  onClick={searchProducts}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Search
                </button>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    if (e.target.value) {
                      fetchCategoryProducts(e.target.value, 1);
                    } else {
                      setIsCategoryMode(false);
                      setSelectedCategory("");
                      setProducts([]);
                      setCurrentPage(1);
                    }
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg mr-2 ml-2"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                {(isSearching || isCategoryMode) && (
                  <button
                    onClick={() => {
                      setIsSearching(false);
                      setIsCategoryMode(false);
                      setSearchQuery("");
                      setSelectedCategory("");
                      setProducts([]);
                      setCurrentPage(1);
                    }}
                    className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    Back to Carts
                  </button>
                )}
              </div>
              <button onClick={() => navigate("/")}>Back to Home</button>{" "}
              {/* navigate biasanya digunakan untuk pindah halaman */}
              {/* <button onClick={() => windows.location.href("/")}>Go to About</button> */}
              <h1 className="text-4xl font-bold text-dark-grey mb-2">
                {isSearching
                  ? "Search Results"
                  : isCategoryMode
                    ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products`
                    : "Cart Overview"}
              </h1>
              <p className="text-pink-300 text-lg">
                {isSearching
                  ? `Results for "${searchQuery}"`
                  : isCategoryMode
                    ? `Products in ${selectedCategory} category`
                    : "A quick summary of your selected products and total price."}
              </p>
            </motion.div>
            {isSearching || isCategoryMode ? (
              <>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      onClick={() => handleProduct(product.id)}
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
                              <span className="text-dark-gray-300">
                                Discount:
                              </span>
                              <span className="text-blue-400">
                                {product.discountPercentage}%
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-dark-gray-300">Stock:</span>
                              <span className="text-purple-400 font-semibold">
                                {product.stock}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination Controls */}
                <div className="mt-8 flex items-center justify-center gap-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="text-lg font-semibold">
                    Page {currentPage} of {Math.ceil(totalProducts / limit)}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= Math.ceil(totalProducts / limit)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <>
                <StyleDataUser
                  carts={carts}
                  handleView={(userId) => handleView(userId)}
                  handleProduct={(productId) => handleProduct(productId)}
                />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
