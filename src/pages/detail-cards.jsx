import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StyleDataUser from "../components/style-data-user";
// import { motion } from "framer-motion";

export default function DetailCards() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [carts, setCarts] = useState([]);

  const fetchCarts = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/carts/user/${userId}`);
      setCarts(res.data.carts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, [userId]);

  const handleProduct = (productId) => {
    navigate(`/product-detail/${productId}`);
  };

  return (
    <div className="min-h-screen">
      <button onClick={() => navigate("/data-user")}>Back</button>
      <h1 className="text-4xl font-bold text-dark-grey mb-2">Cart Details</h1>
      <>
        <StyleDataUser carts={carts} handleProduct={handleProduct} />
      </>
    </div>
  );
}
