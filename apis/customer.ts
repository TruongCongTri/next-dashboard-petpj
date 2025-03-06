import { IUserType, ICartType } from "@/models/dummyType";

export const fetchUsers = async (): Promise<IUserType[]> => {
  const res = await fetch("https://dummyjson.com/users");
  return res.json();
};

const customers = {
  async getAllUsers(): Promise<IUserType[]> {
    const res = await fetch("https://dummyjson.com/users");
    return res.json();
  },

  async getUser(userId: number): Promise<IUserType> {
    const res = await fetch(`https://dummyjson.com/users/${userId}`);
    return res.json();
  },

  async postUser(user: IUserType) {
    const res = await fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then(console.log);
  },

  async getCartsByUser(userId: string): Promise<ICartType[]> {
    const res = await fetch(`https://dummyjson.com/carts/user/${userId}`);
    return res.json();
  }
};



export default customers;
