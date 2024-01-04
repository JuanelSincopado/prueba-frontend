import { createContext } from "react";
import Post from "../../model/Post";
import CreateFormData from "../user_context/local_data/Create";

type HomeContextType = {
  openEditModal: boolean;
  error: string;
  success: string;
  loading: boolean;
  loadingGlobal: boolean;
  posts: Post[];
  openCreateModal: boolean;
  postEdit: Post;
  postFilterSearch: Post[];
  setOpenEditModal: (open: boolean) => void;
  setError: (error: string) => void;
  setLoading: (loading: boolean) => void;
  setLoadingGlobal: (loading: boolean) => void;
  getAllPosts: () => void;
  addFavorite: (post_id: string, like: number) => void;
  deletePost: (post_id: string) => void;
  setOpenCreateModal: (open: boolean) => void;
  createPost: (post: CreateFormData) => void;
  setPostEdit: (post: Post) => void;
  updatePost: (formData: CreateFormData) => void;
  setSuccess: (success: string) => void;
  filterPosts: (filter: string) => void;
}

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export default HomeContext;