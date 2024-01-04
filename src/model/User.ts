import Post from "./Post";

interface User {
  id: string;
  fullName: string;
  userName: string;
  age: number;
  email: string;
  password: string;
  posts: Post[];
  createdAt: Date;
  updatedAt: Date;
}

export default User;