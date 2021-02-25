import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CommentReport } from "../../Models/Admin/CommentReport";
import { PostReport } from "../../Models/Admin/PostReport";

@Injectable()
export class ReportsService {

  //Post Reports
  public postReportsSource = new BehaviorSubject<PostReport[]>([]);
  public postReportsCurrent = this.postReportsSource.asObservable();


  //Comment Reports
  public commentReportsSource = new BehaviorSubject<CommentReport[]>([]);
  public commentReportsCurrent = this.commentReportsSource.asObservable();

  constructor(private _http: HttpClient) {
  }

  changePostReports(reports: PostReport[]) {
    this.postReportsSource.next(reports);
  }

  changeCommentReports(reports: CommentReport[]) {
    this.commentReportsSource.next(reports);
  }

  getPostReports() {
    this._http.get<PostReport[]>("api/admin/reports/PostReport/GetAll")
      .subscribe(data => {
        this.changePostReports(data);
      })
  }

  //Deletes posts
  deletePost = (postId: number): Promise<any> => {
    return new Promise((resolve => {
      this._http.delete("api/post/delete/" + postId)
        .subscribe(response => {
          var ok = response;
          resolve(ok);
        });
    }));
  }

  deletePostReport = (report: PostReport): Promise<any> => {
    return new Promise((resolve => {
      this._http.delete("api/admin/reports/PostReport/Delete/" + report.id)
        .subscribe(response => {
          this.getPostReports();
          var ok = response;
          resolve(ok);
        })
    }))
  }


  getCommentReports() {
    this._http.get<CommentReport[]>("api/admin/reports/CommentReport/GetAll")
      .subscribe(data => {
        this.changeCommentReports(data);
      })
  }

  //Deletes posts
  deleteComment = (commentId: number): Promise<any> => {
    console.log(commentId);
    return new Promise((resolve => {
      this._http.delete("api/comment/Delete/" + commentId)
        .subscribe(response => {
          var ok = response;
          resolve(ok);
        });
    }));
  }

  deleteCommentReport = (report: CommentReport): Promise<any> => {
    return new Promise((resolve => {
      this._http.delete("api/admin/reports/CommentReport/Delete/" + report.id, { responseType: 'text' })
        .subscribe(response => {
          this.getCommentReports();
          var ok = response;
          resolve(ok);
        })
    }))
  }

}
