import { Community } from "./Community";

export class Post {
  id: number;
  text: string;
  userID: string;
  community: Community;
  date: string;
  upvotes: number;
  downvotes: number;
  comment: Comment[];
} 
