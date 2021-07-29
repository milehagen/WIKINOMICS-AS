import { Experience } from "../Users/Experience";
import { User } from "../Users/User";
import { Comment } from "./Comment";
import { Community } from "./Community";
import { PostTag } from "./PostTag";

export class Post {
  id: number;
  text: string;
  user: User;
  community: Community;
  date: string;
  upvotes: number;
  downvotes: number;
  comment: Comment[];
  postTag: PostTag;
  anonymous: boolean;
  experience: Experience;
} 
