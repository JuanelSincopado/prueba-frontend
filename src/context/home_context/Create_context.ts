import { createContext } from "react";
import Post from "../../model/Post";
import CreateFormData from "../user_context/local_data/Create";
import EnumPostModal from "./local_data/Enum_modal";
import Message_alert from "./local_data/Message_alert";

type HomeContextType = {
  error: string;
  success: string;
  loading: boolean;
  loadingGlobal: boolean;
  posts: Post[];
  openPostModal: EnumPostModal;
  postEdit: Post;
  postFilterSearch: Post[];
  openEditUserModal: boolean;
  messageAlert: Message_alert;
  loadingPost: boolean;
  setError: (error: string) => void;
  setLoading: (loading: boolean) => void;
  setLoadingGlobal: (loading: boolean) => void;
  getAllPosts: () => void;
  addFavorite: (post_id: string) => void;
  deletePost: (post_id: string) => void;
  setOpenPostModal: (openPostModal: EnumPostModal) => void;
  createPost: (post: CreateFormData) => void;
  setPostEdit: (post: Post) => void;
  updatePost: (formData: CreateFormData) => void;
  setSuccess: (success: string) => void;
  filterPosts: (filter: string) => void;
  setOpenEditUserModal: (open: boolean) => void;
  setMessageAlert: (messageAlert: Message_alert) => void;
  setLoadingPost: (loading: boolean) => void;
}

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export default HomeContext;