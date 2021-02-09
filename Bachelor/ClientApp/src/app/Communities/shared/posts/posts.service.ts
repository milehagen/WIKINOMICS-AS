import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { Comment } from '../../../Models/Comment';
import { Community } from '../../../Models/Community';
import { Post } from '../../../Models/Post';
import { PostTag } from '../../../Models/PostTag';
import { UserPostVote } from '../../../Models/UserPostVote';
import { CommentsService } from '../comments/comments.service';
import { CommunitiesService } from '../communities/communities.service';
import { SharedService } from '../shared.service';

@Injectable()
export class PostsService {
  //Posts from selected community
  public allPostsSource = new BehaviorSubject<Post[]>([]);
  public allPostsCurrent = this.allPostsSource.asObservable();

  //The post the user is viewing
  public selectedPostSource = new BehaviorSubject<Post>(new Post());
  public selectedPostCurrent = this.selectedPostSource.asObservable();

  public allPostTagsSource = new BehaviorSubject<PostTag[]>([]);
  public allPostTagsCurrent = this.allPostTagsSource.asObservable();

  constructor(
    private _http: HttpClient,
    private sharedService: SharedService,
  ) {
  }

  changeAllPosts(posts: Post[]) {
    this.allPostsSource.next(posts);
  }

  changeSelectedPost(post: Post) {
    this.selectedPostSource.next(post);
  }

  changeAllPostTags(postTags: PostTag[]) {
    this.allPostTagsSource.next(postTags);
  }



  getPostsForCommunity(communityId: number) {
    this._http.get<Post[]>("api/Community/GetPostsFromCommunity/" + communityId)
      .subscribe(data => {
        this.changeAllPosts(data);
      },
        error => console.log(error)
      );
  }

  getPost(Id: number) {
    this._http.get<Post>("api/Community/GetPost/" + Id)
      .subscribe(data => {
        this.changeSelectedPost(data);
      },
        error => console.log(error)
      );
  }

  getPostTags() {
    this._http.get<PostTag[]>("api/Community/GetPostTags")
      .subscribe(data => {
        this.changeAllPostTags(data);
      },
        error => console.log(error)
      );
  }

  //Posts post to Community
  //Updates post from community and shows a snackbar if succesful
  async sendPost(post: Post): Promise<boolean> {
    await this._http.post("api/Community/Publish", post, { responseType: 'text' })
      .subscribe(response => {
        if (response == "Post published") {
          this.getPostsForCommunity(post.community.id);
          this.sharedService.openSnackBarMessage("Post was published in " + post.community.title, "Ok");
          return true;
        }
      },
        error => {
          console.log(error);
          return false;
        });
    return false;
  }

  //Checks if a user can vote.
  checkIfCanVote = (voteCheck: UserPostVote): Promise<any> => {
    console.log("5");
    return new Promise((resolve => {
      this._http.post("api/Community/CheckVotePost/", voteCheck)
        .subscribe(response => {
          var ok = response;
          resolve(ok);
        });
    }));
  }

  logVote(voteRecord: UserPostVote) {
    this._http.post("api/Community/LogVotePost/", voteRecord, { responseType: 'text' })
      .subscribe(response => {
        console.log(response);
      });
  }

  votePost(postId: number, votedPost: Post) {
    this._http.patch("api/Community/VotePost/" + postId, votedPost, { responseType: 'text' })
      .subscribe(response => {
      })
  }
}
