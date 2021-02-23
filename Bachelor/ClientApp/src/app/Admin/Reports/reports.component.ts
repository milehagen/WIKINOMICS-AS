import { Component } from "@angular/core";
import { CommentsService } from "../../Communities/shared/comments/comments.service";
import { PostsService } from "../../Communities/shared/posts/posts.service";
import { CommentReport } from "../../Models/Admin/CommentReport";
import { PostReport } from "../../Models/Admin/PostReport";
import { Post } from "../../Models/Communities/Post";
import { ReportsService } from "./reports.service";
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'reports-component',
  templateUrl: './reports.component.html',
  styleUrls: ['../AdminStyle.css'],
  providers: []
})

export class ReportsComponent {
  postReports: PostReport[];
  commentReports: CommentReport[];


  constructor(
    private reportsService: ReportsService
  ) { }


  ngOnInit() {
    this.reportsService.postReportsCurrent.subscribe(reports => this.postReports = reports);
    this.reportsService.commentReportsCurrent.subscribe(reports => this.commentReports = reports);

    this.reportsService.getPostReports();
    this.reportsService.getCommentReports();
  }

  //Opens the thread containing the reported post in a new tab
  goToPostThread() {
    
  }

  //If a post is allowed to stay, we only delete the report
  deletePostReport(report: PostReport) {
    this.reportsService.deletePostReport(report);
  }

  //Deleting reported post
  //Deletes the report first, then the post
  async deletePost(report: PostReport) {
    let ok = await this.reportsService.deletePostReport(report);

    if (ok) {
      this.reportsService.deletePost(report.post.id);
    }
  }

  //If a comment is allowed to stay, we only delete the report
  deleteCommentReport(report: CommentReport) {
    this.reportsService.deleteCommentReport(report);
  }

  //Deleting reported comment
  async deleteComment(report: CommentReport) {
    console.log("Deleting record");
    let ok = await this.reportsService.deleteCommentReport(report);

    if (ok) {
      console.log("");
      this.reportsService.deleteComment(report.comment.id);
    }
  }
}
