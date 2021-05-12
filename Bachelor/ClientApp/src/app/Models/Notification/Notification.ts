import { Post } from "../Communities/Post";
import { User } from "../Users/User";

export class Notification {
  id: number;
  user: User;
  post: Post;
  notify: boolean;
  viewed: boolean;
  lastNotification: string;
}
