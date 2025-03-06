import { IUserType, ICartType } from "@/models/dummyType";

export const fetchUsers = async (): Promise<IUserType[]> => {
  const res = await fetch("https://dummyjson.com/users");
  return res.json();
};

const orders = {
  async getAllOrders(): Promise<ICartType[]> {
    const res = await fetch("https://dummyjson.com/carts");
    return res.json();
  },

  async getOrderById(cartId: string): Promise<ICartType> {
    const res = await fetch(`https://dummyjson.com/carts/${cartId}`);
    return res.json();
  },

};



export default orders;
