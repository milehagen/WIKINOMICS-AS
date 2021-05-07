import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommentReport } from '../../../Models/Admin/CommentReport';
import { Comment } from '../../../Models/Communities/Comment';
import { Post } from '../../../Models/Communities/Post';
import { UserCommentVote } from '../../../Models/Communities/UserCommentVote';
import { User } from '../../../Models/Users/User';
import { UserService } from '../../../Users/users.service';
import { CommunitiesService } from '../communities/communities.service';
import { PostsService } from '../posts/posts.service';
import { SharedService } from '../shared.service';

@Injectable()
export class CommentsService {
  constructor(
    private _http: HttpClient,
    private sharedService: SharedService,
    private communitiesService: CommunitiesService,
    private postsService: PostsService,
    private userService: UserService) { }

  //Patches comment to the specified Post
  sendComment = (postId: number, comment: Comment): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      this._http.patch<boolean>("api/Comment/PostComment/" + postId, comment)
        .subscribe(response => {
          resolve(response);
        }, error => {
          console.log(error);
          reject(error);
        });
    });
  }



  //Sends upvote to service.
  //Note: While the object is updated on backend, a new one is not fetched
  //Just a visual update here on the frontend
  async upvoteComment(comment: Comment, user: User) {
    if (await this.userService.checkLoggedIn()) {
      //Checks if this user has ever upvoted this post before
      let voteRecord = new UserCommentVote();
      voteRecord.CommentId = comment.id;
      voteRecord.Voted = 1;
      voteRecord.UserId = user.id;

      //Contains boolean value of whether the user can vote
      let voteCode = await this.checkIfCanVote(voteRecord);

      if (voteCode >= 0) {
        let votedComment = new Comment();

        //Fresh vote
        if (voteCode == 0) {
          votedComment.upvotes = 1;
          comment.upvotes++;
        }
        //Annuling upvote
        else if (voteCode == 1) {
          votedComment.upvotes = -1;
          voteRecord.Voted = 0;
          comment.upvotes--;
        }
        //Changing downvote to upvote
        else if (voteCode == 2) {
          votedComment.upvotes = 1;
          votedComment.downvotes = -1;
          voteRecord.Voted = 1;
          comment.upvotes++;
          comment.downvotes--;
        }

        this.voteComment(comment.id, votedComment);
        this.logVote(voteRecord);
      }
    } else {
      this.sharedService.openSnackBarMessage("Must be logged in to vote", "Ok");
    }
  }

  //Sends downvote to service.
  //Note: While the object is updated on backend, a new one is not fetched
  //Just a visual update here on the frontend
  async downvoteComment(comment: Comment, user: User) {
    if (await this.userService.checkLoggedIn()) {
      let voteRecord = new UserCommentVote();
      voteRecord.CommentId = comment.id;
      voteRecord.Voted = -1;
      voteRecord.UserId = user.id;

      let voteCode = await this.checkIfCanVote(voteRecord);

      if (voteCode >= 0) {
        let votedComment = new Comment();

        //Fresh vote
        if (voteCode == 0) {
          votedComment.downvotes = 1;
          comment.downvotes++;
        }
        //changing upvote to downvote
        else if (voteCode == 1) {
          votedComment.upvotes = -1
          votedComment.downvotes = 1;

          comment.upvotes--;
          comment.downvotes++;

          voteRecord.Voted = -1;
        }
        //Annuling downvote
        else if (voteCode == 2) {
          votedComment.downvotes = -1;
          comment.downvotes--;
          voteRecord.Voted = 0;
        }

        this.voteComment(comment.id, votedComment);
        this.logVote(voteRecord);
      }
    } else {
      this.sharedService.openSnackBarMessage("Must be logged in to vote", "Ok");
    }
  }


  //Checks if a user can vote.
  //Returns a code based on if the user has previously voted or not
  //Code 0 - User has never voted
  //Code 1 - User has upvoted, an upvote then should annul the vote, downvote should annul the upvote and increase downvote
  //Code 2 - User has downvoted, a downvote then should annul the vote, upvote should annul the downvote and increase upvote
  checkIfCanVote = (voteCheck: UserCommentVote): Promise<any> => {
    return new Promise((resolve => {
      this._http.post("api/Comment/CheckVoteComment/", voteCheck)
        .subscribe(response => {
          var ok = response;
          resolve(ok);
        });
    }));
  }

  //Logs the vote so a user can't vote the same direction twice
  logVote(voteRecord: UserCommentVote) {
    this._http.post("api/Comment/LogVoteComment/", voteRecord)
      .subscribe(response => {
        console.log(response);
      });
  }

  //Votes on a comment, commentId is the comment being voted on. votedComment contains the change in vote
  voteComment(commentId: number, votedComment: Comment) {
    this._http.patch("api/Comment/VoteComment/" + commentId, votedComment)
      .subscribe(response => {

      })
  }

  reportComment(comment: Comment) {
    let commentReport = new CommentReport;
    commentReport.comment = comment;
    commentReport.lastReportDate = new Date().toJSON();
    commentReport.numberOfReports = 1;

    this.sendReport(commentReport);
  }

  sendReport(commentReport: CommentReport) {
    this._http.post("api/Comment/Report", commentReport)
      .subscribe(response => {
        this.sharedService.openSnackBarMessage("Comment reported", "Ok");
      },
        error => {
          console.log(error);
        }
      );
  }
}
