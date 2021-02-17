import { Post } from "../Communities/Post";

export class PostReport {
  id: number;
  post: Post;
  lastReportDate: string;
  numberOfReports: number;
}
