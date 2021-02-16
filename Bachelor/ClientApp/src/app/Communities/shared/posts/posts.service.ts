import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { Comment } from '../../../Models/Communities/Comment';
import { Community } from '../../../Models/Communities/Community';
import { Post } from '../../../Models/Communities/Post';
import { PostTag } from '../../../Models/Communities/PostTag';
import { UserPostVote } from '../../../Models/Communities/UserPostVote';
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

  //All Tags that can be put on posts
  public allPostTagsSource = new BehaviorSubject<PostTag[]>([]);
  public allPostTagsCurrent = this.allPostTagsSource.asObservable();

  constructor(
    private _http: HttpClient,
    private sharedService: SharedService) {}

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
    this._http.get<Post[]>("api/Post/GetPostsFromCommunity/" + communityId)
      .subscribe(data => {
        this.changeAllPosts(data);
      },
        error => console.log(error)
      );
  }

  getPost(Id: number) {
    this._http.get<Post>("api/Post/GetPost/" + Id)
      .subscribe(data => {
        this.changeSelectedPost(data);
      },
        error => console.log(error)
      );
  }

  getPostTags() {
    this._http.get<PostTag[]>("api/Post/GetPostTags")
      .subscribe(data => {
        this.changeAllPostTags(data);
      },
        error => console.log(error)
      );
  }

  //Posts post to Community
  //Updates post from community and shows a snackbar if succesful
  async sendPost(post: Post): Promise<boolean> {
    await this._http.post("api/Post/Publish", post, { responseType: 'text' })
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

  //Sends upvote to service.
  //Note: While the object is updated on backend, a new one is not fetched
  //Just a visual update here on the frontend
  async upvotePost(post: Post) {
    if (this.sharedService.checkLogin()) {
      //Checks if this user has ever upvoted this post before
      let voteRecord = new UserPostVote();
      voteRecord.PostId = post.id;
      voteRecord.Voted = 1;
      voteRecord.UserId = sessionStorage.getItem("tempID");

      //Contains boolean value of whether the user can vote
      let voteCode = await this.checkIfCanVote(voteRecord);
      console.log("Voting code " + voteCode);

      if (voteCode >= 0) {
        let votedPost = new Post();

        //Fresh vote
        if (voteCode == 0) {
          votedPost.upvotes = 1;
          post.upvotes++;
        }
        //Annuling upvote
        else if (voteCode == 1) {
          votedPost.upvotes = -1;
          voteRecord.Voted = 0;
          post.upvotes--;
        }
          //Changing downvote to upvote
        else if (voteCode == 2) {
          votedPost.upvotes = 1;
          votedPost.downvotes = -1;
          voteRecord.Voted = 1;
          post.upvotes++;
          post.downvotes--;
        }

        this.votePost(post.id, votedPost);
        this.logVote(voteRecord);
      }
    }
  }

  //Sends downvote to service.
  //Note: While the object is updated on backend, a new one is not fetched
  //Just a visual update here on the frontend
  async downvotePost(post: Post) {
    if (this.sharedService.checkLogin()) {
      let voteRecord = new UserPostVote();
      voteRecord.PostId = post.id;
      voteRecord.Voted = -1;
      voteRecord.UserId = sessionStorage.getItem("tempID");

      let voteCode = await this.checkIfCanVote(voteRecord);
      console.log("Voting code " + voteCode);

      if (voteCode >= 0) {
        let votedPost = new Post();

        //Fresh vote
        if (voteCode == 0) {
          votedPost.downvotes = 1;
          post.downvotes++;
        }
        //changing upvote to downvote
        else if (voteCode == 1) {
          votedPost.upvotes = -1
          votedPost.downvotes = 1;

          post.upvotes--;
          post.downvotes++;

          voteRecord.Voted = -1;
        }
        //Annuling downvote
        else if (voteCode == 2) {
          votedPost.downvotes = -1;
          post.downvotes--;
          voteRecord.Voted = 0;
        }

        this.votePost(post.id, votedPost);
        this.logVote(voteRecord);
      }
    }
  }

  //Checks if a user can vote.
  //Returns a code based on if the user has previously voted or not
  //Code 0 - User has never voted
  //Code 1 - User has upvoted, an upvote then should annul the vote, downvote should annul the upvote and increase downvote
  //Code 2 - User has downvoted, a downvote then should annul the vote, upvote should annul the downvote and increase upvote
  checkIfCanVote = (voteCheck: UserPostVote): Promise<any> => {
    return new Promise((resolve => {
      this._http.post("api/Post/CheckVotePost/", voteCheck)
        .subscribe(response => {
          var ok = response;
          resolve(ok);
        });
    }));
  }

  //Logs the vote so a user can't vote the same direction twice
  logVote(voteRecord: UserPostVote) {
    this._http.post("api/Post/LogVotePost/", voteRecord, { responseType: 'text' })
      .subscribe(response => {
        console.log(response);
      });
  }

  votePost(postId: number, votedPost: Post) {
    this._http.patch("api/Post/VotePost/" + postId, votedPost, { responseType: 'text' })
      .subscribe(response => {
      })
  }
}
