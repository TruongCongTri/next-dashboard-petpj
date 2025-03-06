import { IProductFetch, IProductType } from "@/models/dummyType";

export const fetchProducts = async (): Promise<IProductType[]> => {
  const res = await fetch("https://dummyjson.com/products");
  return res.json();
};

const products = {
  async getAllProducts(): Promise<IProductFetch> {
    const res = await fetch("https://dummyjson.com/products");
    return res.json();
  },

  async getProduct(productId: string): Promise<IProductType> {
    const res = await fetch(`https://dummyjson.com/products/${productId}`);
    return res.json();
  },


  async postProduct(product: IProductType) {
    const res = await fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
    .then(res => res.json())
    .then(console.log);
  }
};



export default products;