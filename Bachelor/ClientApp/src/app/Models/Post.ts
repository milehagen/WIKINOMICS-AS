import { Community } from "./Community";

export class Post {
  id: number;
  text: string;
  userID: string;
  community: Community;
  date: Date;
  upvotes: number;
  downvotes: number;
} 
