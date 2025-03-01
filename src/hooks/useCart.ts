import {
  actGetProductsByItems,
  cartItemChangeQuantity,
  cartItemRemove,
  cleanCartProductsFullInfo,
} from "@/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useEffect } from "react";

const useCart = () => {
  const dispatch = useAppDispatch();
  const { items, productsFullInfo } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(actGetProductsByItems());

    return () => {
      dispatch(cleanCartProductsFullInfo());
    };
  }, [dispatch]);

  const products = productsFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id],
  }));

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }), [dispatch]);
    },
    [dispatch]
  );

  const removeItemHandler = useCallback(
    (id: number) => {
      dispatch(cartItemRemove(id));
    },
    [dispatch]
  );

return {products, changeQuantityHandler, removeItemHandler}
};
export default useCart;
