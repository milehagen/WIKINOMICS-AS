import { Comment } from "../Communities/Comment";

export class CommentReport {
  id: number;
  comment: Comment;
  lastReportDate: string;
  numberOfReports: number;
}
