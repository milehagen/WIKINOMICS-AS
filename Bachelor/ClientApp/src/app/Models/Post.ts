import { Comment } from "./Comment";
import { Community } from "./Community";
import { PostTag } from "./PostTag";

export class Post {
  id: number;
  text: string;
  userID: string;
  community: Community;
  date: string;
  upvotes: number;
  downvotes: number;
  comment: Comment[];
  postTag: PostTag;
} 
