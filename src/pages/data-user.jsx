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

  // State for Add Product Form
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    discountPercentage: "",
    thumbnail: "",
  });
  const [addProductLoading, setAddProductLoading] = useState(false);
  const [addProductMessage, setAddProductMessage] = useState("");

  // State for Update Product Form
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    discountPercentage: "",
    thumbnail: "",
  });
  const [editProductLoading, setEditProductLoading] = useState(false);
  const [editProductMessage, setEditProductMessage] = useState("");

  // State for Delete Product
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [deleteProductLoading, setDeleteProductLoading] = useState(false);
  const [deleteProductMessage, setDeleteProductMessage] = useState("");

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

  // Handle Add Product
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = async () => {
    if (
      !formData.title.trim() ||
      !formData.price ||
      !formData.description.trim()
    ) {
      setAddProductMessage("Please fill in all required fields");
      return;
    }

    setAddProductLoading(true);
    setAddProductMessage("");

    try {
      const response = await axios.post("https://dummyjson.com/products/add", {
        title: formData.title,
        price: parseFloat(formData.price),
        description: formData.description,
        category: formData.category || "general",
        stock: formData.stock ? parseInt(formData.stock) : 0,
        discountPercentage: formData.discountPercentage
          ? parseFloat(formData.discountPercentage)
          : 0,
        thumbnail: formData.thumbnail || "https://via.placeholder.com/150",
      });

      console.log("Product added successfully:", response.data);
      setAddProductMessage("✓ Product added successfully!");

      // Reset form
      setFormData({
        title: "",
        price: "",
        description: "",
        category: "",
        stock: "",
        discountPercentage: "",
        thumbnail: "",
      });

      // Close form after 2 seconds
      setTimeout(() => {
        setShowAddForm(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      setAddProductMessage("Failed to add product. Please try again.");
    } finally {
      setAddProductLoading(false);
    }
  };

  // Handle Edit Product
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openEditForm = (product) => {
    setSelectedProductId(product.id);
    setEditFormData({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      stock: product.stock,
      discountPercentage: product.discountPercentage,
      thumbnail: product.thumbnail,
    });
    setShowEditForm(true);
  };

  const handleUpdateProduct = async () => {
    if (!editFormData.title.trim()) {
      setEditProductMessage("Product title is required");
      return;
    }

    setEditProductLoading(true);
    setEditProductMessage("");

    try {
      const response = await axios.put(
        `https://dummyjson.com/products/${selectedProductId}`,
        {
          title: editFormData.title,
          price: editFormData.price
            ? parseFloat(editFormData.price)
            : undefined,
          description: editFormData.description,
          category: editFormData.category,
          stock: editFormData.stock ? parseInt(editFormData.stock) : undefined,
          discountPercentage: editFormData.discountPercentage
            ? parseFloat(editFormData.discountPercentage)
            : undefined,
          thumbnail: editFormData.thumbnail,
        },
      );

      console.log("Product updated successfully:", response.data);
      setEditProductMessage("✓ Product updated successfully!");

      // Update product in the products array
      if (isSearching || isCategoryMode) {
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === selectedProductId ? { ...p, ...editFormData } : p,
          ),
        );
      }

      // Close form after 2 seconds
      setTimeout(() => {
        setShowEditForm(false);
        setSelectedProductId(null);
        setEditFormData({
          title: "",
          price: "",
          description: "",
          category: "",
          stock: "",
          discountPercentage: "",
          thumbnail: "",
        });
      }, 2000);
    } catch (error) {
      console.log(error);
      setEditProductMessage("Failed to update product. Please try again.");
    } finally {
      setEditProductLoading(false);
    }
  };

  // Handle Delete Product
  const openDeleteConfirm = (productId) => {
    setDeleteProductId(productId);
    setShowDeleteConfirm(true);
    setDeleteProductMessage("");
  };

  const handleDeleteProduct = async () => {
    if (!deleteProductId) return;

    setDeleteProductLoading(true);
    setDeleteProductMessage("");

    try {
      const response = await axios.delete(
        `https://dummyjson.com/products/${deleteProductId}`,
      );

      console.log("Product deleted successfully:", response.data);
      setDeleteProductMessage("✓ Product deleted successfully!");

      // Remove product from the products array
      if (isSearching || isCategoryMode) {
        setProducts((prevProducts) =>
          prevProducts.filter((p) => p.id !== deleteProductId),
        );
        setTotalProducts((prev) => Math.max(0, prev - 1));
      }

      // Close confirmation after 1.5 seconds
      setTimeout(() => {
        setShowDeleteConfirm(false);
        setDeleteProductId(null);
      }, 1500);
    } catch (error) {
      console.log(error);
      setDeleteProductMessage("Failed to delete product. Please try again.");
    } finally {
      setDeleteProductLoading(false);
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
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="ml-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                {showAddForm ? "Cancel" : "+ Add New Product"}
              </button>
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

            {/* Add Product Form */}
            {showAddForm && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-8 p-6 bg-white/80 rounded-lg border-2 border-green-300 shadow-md"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Add New Product
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="title"
                    placeholder="Product Title"
                    value={formData.title}
                    onChange={handleFormChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleFormChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  />
                  <textarea
                    name="description"
                    placeholder="Product Description"
                    value={formData.description}
                    onChange={handleFormChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 md:col-span-2"
                    rows="3"
                  />
                  <input
                    type="text"
                    name="category"
                    placeholder="Category (e.g., furniture)"
                    value={formData.category}
                    onChange={handleFormChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  />
                  <input
                    type="number"
                    name="stock"
                    placeholder="Stock Quantity"
                    value={formData.stock}
                    onChange={handleFormChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  />
                  <input
                    type="number"
                    name="discountPercentage"
                    placeholder="Discount Percentage"
                    value={formData.discountPercentage}
                    onChange={handleFormChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  />
                  <input
                    type="url"
                    name="thumbnail"
                    placeholder="Thumbnail URL (optional)"
                    value={formData.thumbnail}
                    onChange={handleFormChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 md:col-span-2"
                  />
                </div>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={handleAddProduct}
                    disabled={addProductLoading}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400"
                  >
                    {addProductLoading ? "Adding..." : "Add Product"}
                  </button>
                </div>
                {addProductMessage && (
                  <div
                    className={`mt-3 p-3 rounded-lg ${
                      addProductMessage.includes("✓")
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {addProductMessage}
                  </div>
                )}
              </motion.div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && deleteProductId && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl"
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-3">
                    Delete Product?
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Are you sure you want to delete this product (ID:{" "}
                    {deleteProductId})? This action cannot be undone.
                  </p>
                  {deleteProductMessage && (
                    <div
                      className={`mb-4 p-3 rounded-lg ${
                        deleteProductMessage.includes("✓")
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {deleteProductMessage}
                    </div>
                  )}
                  <div className="flex gap-3">
                    <button
                      onClick={handleDeleteProduct}
                      disabled={deleteProductLoading}
                      className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-400"
                    >
                      {deleteProductLoading ? "Deleting..." : "Delete"}
                    </button>
                    <button
                      onClick={() => {
                        setShowDeleteConfirm(false);
                        setDeleteProductId(null);
                      }}
                      disabled={deleteProductLoading}
                      className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Update Product Form Modal */}
            {showEditForm && selectedProductId && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-8 p-6 bg-white/90 rounded-lg border-2 border-blue-300 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Update Product (ID: {selectedProductId})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="title"
                    placeholder="Product Title"
                    value={editFormData.title}
                    onChange={handleEditFormChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={editFormData.price}
                    onChange={handleEditFormChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <textarea
                    name="description"
                    placeholder="Product Description"
                    value={editFormData.description}
                    onChange={handleEditFormChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 md:col-span-2"
                    rows="3"
                  />
                  <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={editFormData.category}
                    onChange={handleEditFormChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="number"
                    name="stock"
                    placeholder="Stock Quantity"
                    value={editFormData.stock}
                    onChange={handleEditFormChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="number"
                    name="discountPercentage"
                    placeholder="Discount Percentage"
                    value={editFormData.discountPercentage}
                    onChange={handleEditFormChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="url"
                    name="thumbnail"
                    placeholder="Thumbnail URL"
                    value={editFormData.thumbnail}
                    onChange={handleEditFormChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 md:col-span-2"
                  />
                </div>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={handleUpdateProduct}
                    disabled={editProductLoading}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                  >
                    {editProductLoading ? "Updating..." : "Update Product"}
                  </button>
                  <button
                    onClick={() => {
                      setShowEditForm(false);
                      setSelectedProductId(null);
                    }}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
                {editProductMessage && (
                  <div
                    className={`mt-3 p-3 rounded-lg ${
                      editProductMessage.includes("✓")
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {editProductMessage}
                  </div>
                )}
              </motion.div>
            )}
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
                          <div className="mt-3 flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openEditForm(product);
                              }}
                              className="flex-1 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleProduct(product.id);
                              }}
                              className="flex-1 px-3 py-1 bg-purple-500 text-white text-sm rounded hover:bg-purple-600"
                            >
                              View
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openDeleteConfirm(product.id);
                              }}
                              className="flex-1 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                            >
                              Delete
                            </button>
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
