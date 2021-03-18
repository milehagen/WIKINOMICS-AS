import { User } from "../User/User";
import { Post } from "./Post";

export class UserPostVote {
  id: number;
  UserId: number;
  PostId: number;
  Voted: number
}
