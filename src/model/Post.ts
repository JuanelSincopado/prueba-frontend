interface Post {
  user: User;
  _id: string;
  title: string;
  content: string;
  likes: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface User {
  id: string;
  userName: string;
}


export default Post;