import { IProduct } from "@models/product";
import { addToCart } from "@store/cart/cartSlice";
import { useAppDispatch } from "@store/hooks";
import { memo, useState } from "react";

const Product = memo(({ id, title, price, img, max, quantity }: IProduct) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const currentRemainingQuantity = max - (quantity ?? 0);
  const quantityReachedMax = currentRemainingQuantity <= 0 ? true : false;

  const handleAddToCart = () => {
    setLoading(true);
    dispatch(addToCart(id));

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  console.log("typeof", typeof price)
  return (
    <div className="max-w-xs rounded-lg overflow-hidden shadow-lg bg-white transform transition duration-300 hover:scale-105 hover:shadow-xl m-4">
      <div className="relative">
        <div className="w-full h-56 bg-gray-300 flex items-center justify-center">
          <img
            className="w-full h-full object-cover rounded-t-lg"
            src={img}
            alt={title}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 transition duration-300"></div>
      </div>
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2" title={title}>
          {title}
        </h2>
        <p className="text-gray-700 text-base">Price: {price.toFixed(2)} EGP</p>
        <p>
          {quantityReachedMax
            ? "You reach to the limit"
            : `You can add ${currentRemainingQuantity} item(s)`}
        </p>
      </div>
      <div className="px-6 py-4">
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 w-full"
          onClick={handleAddToCart}
          disabled={loading || quantityReachedMax}
        >
          {loading
            ? "Adding"
            : quantityReachedMax
            ? "Out of stock"
            : "Add to Cart"}
        </button>
      </div>
    </div>
  );
});

export default Product;
