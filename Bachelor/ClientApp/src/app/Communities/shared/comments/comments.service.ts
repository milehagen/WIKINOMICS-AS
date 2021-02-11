import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { Comment } from '../../../Models/Comment';
import { Community } from '../../../Models/Community';
import { Post } from '../../../Models/Post';
import { PostTag } from '../../../Models/PostTag';
import { UserPostVote } from '../../../Models/UserPostVote';
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
  ) {
  }

  //Patches comment to the specified Post
  async sendComment(postId: number, comment: Comment): Promise<boolean> {
    this._http.patch("api/Comment/PostComment/" + postId, comment, { responseType: 'text' })
      .subscribe(response => {
        this.postsService.getPost(postId);
        this.sharedService.openSnackBarMessage("Comment added to Post", "Ok");
        return true;
      },
        error => {
          console.log(error);
          return false;
        });
    return false;
  }

  //Votes on a comment, commentId is the comment being voted on. votedComment contains the change in vote
  voteComment(commentId: number, votedComment: Comment) {
    this._http.patch("api/Comment/VoteComment/" + commentId, votedComment, { responseType: 'text' })
      .subscribe(response => {

      })
  }
}
