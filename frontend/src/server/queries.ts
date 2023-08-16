import { type Product } from "src/types/products";
import api from "./api";

const getProducts = async () => {
  try {
    const products = await api.get<Product[]>("/products");
    return products;
  } catch (err) {
    const error = err as Error;
    console.log(error);
    return [];
  }
};

const searchProducts = async (search: string) => {
  try {
    const products = await api.query<Product[]>("/products/search", {
      query: search,
    });
    return products;
  } catch (err) {
    const error = err as Error;
    console.log(error);
    return [];
  }
};

const selectProduct = async (product: Product) => {
  try {
    await api.put(`/products/${product.id}`, {
      ...product,
      selected: !product.selected,
    });
  } catch (err) {
    const error = err as Error;
    console.log(error);
  }
};

export { getProducts, searchProducts, selectProduct };
