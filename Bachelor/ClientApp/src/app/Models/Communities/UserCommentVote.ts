import { User } from "../Users/User";
import { Comment } from "./Comment";

export class UserCommentVote {
  id: number;
  UserId: number;
  CommentId: number;
  Voted: number
}
