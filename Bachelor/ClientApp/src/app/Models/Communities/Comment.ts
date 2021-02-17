import { User } from "../User";
import { Post } from "./Post";

export class Comment {
  id: number;
  post: Post;
  text: string;
  user: User;
  date: string;
  upvotes: number;
  downvotes: number;
  anonymous: boolean;
} 
