import { Component } from "@angular/core";
import { CommentReport } from "../../Models/Admin/CommentReport";
import { PostReport } from "../../Models/Admin/PostReport";
import { Post } from "../../Models/Communities/Post";
import { ReportsService } from "./reports.service";
import { Subscription } from "rxjs";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'reports-component',
  templateUrl: './reports.component.html',
  styleUrls: ['../AdminStyle.css'],
  providers: []
})

export class ReportsComponent {
  postReports: PostReport[];
  postReportsSub: Subscription;
  commentReports: CommentReport[];
  commentReportsSub: Subscription;


  constructor(
    private reportsService: ReportsService
  ) { }


  ngOnInit() {
    this.postReportsSub = this.reportsService.postReportsCurrent.subscribe(reports => this.postReports = reports);
    this.commentReportsSub = this.reportsService.commentReportsCurrent.subscribe(reports => this.commentReports = reports);

    this.reportsService.getPostReports();
    this.reportsService.getCommentReports();
  }

  ngOnDestroy() {
    this.postReportsSub.unsubscribe();
    this.commentReportsSub.unsubscribe();
  }

  //If a post is allowed to stay, we only delete the report
  deletePostReport(report: PostReport) {
    this.reportsService.deletePostReport(report);
  }

  //Deleting reported post
  //Deletes the report first, then the post
  async deletePost(report: PostReport) {
    let ok = await this.reportsService.deletePost(report.post.id);

    if (ok) {
      this.reportsService.getPostReports();

      //In case comments that were reported were part of the just deleted post
      this.reportsService.getCommentReports();
    }
  }

  //If a comment is allowed to stay, we only delete the report
  deleteCommentReport(report: CommentReport) {
    this.reportsService.deleteCommentReport(report);
  }

  //Deleting reported comment
  async deleteComment(report: CommentReport) {
    let ok = await this.reportsService.deleteComment(report.comment.id);

    if (ok) {
      this.reportsService.getCommentReports();
    }
  }
}
