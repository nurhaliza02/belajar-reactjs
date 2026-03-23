import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center mt-10">Product not found.</p>;
  }

  return (
    <div className="min-h-screen max-w-4xl mx-auto p-6">
      <button
        className="mb-6 text-blue-600 hover:text-blue-800"
        onClick={() => navigate(-1)}
      >
        &larr; Back
      </button>

      <h1 className="text-4xl font-bold text-dark-grey mb-4">
        Product Details
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6 grid gap-6 md:grid-cols-2">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-64 object-cover rounded-lg"
        />

        <div>
          <h2 className="text-3xl font-semibold mb-2">{product.title}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-lg font-semibold mb-2">Price: ${product.price}</p>
          <p className="text-sm text-green-600 mb-2">
            Discount: {product.discountPercentage}%
          </p>
          <p className="text-gray-700 mb-4">Stock: {product.stock}</p>
          <div className="flex flex-wrap gap-2">
            {product.category && (
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                {product.category}
              </span>
            )}
            {product.brand && (
              <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
                {product.brand}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
