interface Post {
  user: User;
  _id: string;
  title: string;
  content: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

interface User {
  id: string;
  userName: string;
}


export default Post;