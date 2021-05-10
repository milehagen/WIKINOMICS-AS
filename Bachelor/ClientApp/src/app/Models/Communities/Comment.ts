import { Experience } from "../Users/Experience";
import { User } from "../Users/User";
import { Post } from "./Post";

export class Comment {
  id: number;
  post: Post;
  text: string;
  user: User;
  date: string;
  upvotes: number;
  downvotes: number;
  responsTo: Comment;
  orderInThread: number;
  anonymous: boolean;
  experience: Experience;
} 
