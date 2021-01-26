import { Post } from "./Post";

export class Comment {
  id: number;
  post: Post;
  text: string;
  userID: string;
  date: Date;
  upvotes: number;
  downvotes: number;
} 
