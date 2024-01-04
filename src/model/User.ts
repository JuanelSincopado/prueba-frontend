import Post from "./Post";

interface User {
  id: string;
  fullName: string;
  age: number;
  email: string;
  password: string;
  posts: Post[];
  createdAt: Date;
  updatedAt: Date;
}

export default User;