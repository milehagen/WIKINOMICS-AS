import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { PostReport } from '../../../Models/Admin/PostReport';
import { Post } from '../../../Models/Communities/Post';
import { PostTag } from '../../../Models/Communities/PostTag';
import { UserPostVote } from '../../../Models/Communities/UserPostVote';
import { User } from '../../../Models/Users/User';
import { UserService } from '../../../Users/users.service';
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

  //Wheter we are currently looking up posts
  public loadingPostsSource = new BehaviorSubject<boolean>(null);
  public loadingPostsCurrent = this.loadingPostsSource.asObservable();

  constructor(
    private _http: HttpClient,
    private sharedService: SharedService,
    private userService: UserService  ) { }

  changeAllPosts(posts: Post[]) {
    this.allPostsSource.next(posts);
  }

  addToPosts(posts: Post[]) {
    this.allPostsSource.next(this.allPostsSource.getValue().concat(posts));
  }

  changeSelectedPost(post: Post) {
    this.selectedPostSource.next(post);
  }

  changeAllPostTags(postTags: PostTag[]) {
    this.allPostTagsSource.next(postTags);
  }

  changeLoadingPosts(bool: boolean) {
    this.loadingPostsSource.next(bool);
  }


  getPostsForCommunity(communityId: number) {
    this._http.get<Post[]>("api/Post/GetPostsFromCommunity/" + communityId)
      .subscribe(data => {
        this.changeAllPosts(data);
      },
        error => console.log(error)
      );
  }

  //Paginates posts for specific community
  paginateFromCommunity(communityId: number, page: number) {
    this._http.get<Post[]>("api/Post/PaginateFromCommunity/" + communityId + "/" + page)
      .subscribe(data => {
        this.addToPosts(data);
      },
      error => console.log(error)
      );
  }

  //Paginates posts for personal feed (collection of all posts to communities user is subbed too)
  paginateForUser(user: User, page: number) {

    this._http.get<Post[]>("api/Post/PaginateForUser/" + user.id + "/" + page)
      .subscribe(data => {
        this.addToPosts(data);
      },
        error => {
          console.log(error);
        }
      );
  }

  //Paginates posts from all communities
  paginatePosts(page: number) {
    this._http.get<Post[]>("api/Post/PaginatePosts/" + page)
      .subscribe(data => {
        this.addToPosts(data);
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
  sendPost = (post: Post): Promise<boolean> => {
    return new Promise((resolve => {
      this._http.post("api/Post/Publish", post)
        .subscribe(response => {
          this.getPostsForCommunity(post.community.id);
          this.sharedService.openSnackBarMessage("Post was published in " + post.community.title, "Ok");
          resolve(true);
        }, error => {
          resolve(false);
        })
    }))
  }

  //Sends upvote to service.
  //Note: While the object is updated on backend, a new one is not fetched
  //Just a visual update here on the frontend
  async upvotePost(post: Post, user: User) {
    if (await this.userService.checkLoggedIn()) {
      //Checks if this user has ever upvoted this post before
      let voteRecord = new UserPostVote();
      voteRecord.PostId = post.id;
      voteRecord.Voted = 1;
      voteRecord.UserId = user.id;

      //Contains int value of whether the user can vote
      let voteCode = await this.checkIfCanVote(voteRecord);

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
    } else {
      this.sharedService.openSnackBarMessage("Must be logged in to vote", "Ok");
    }
  }

  //Sends downvote to service.
  //Note: While the object is updated on backend, a new one is not fetched
  //Just a visual update here on the frontend
  async downvotePost(post: Post, user: User) {
    if (await this.userService.checkLoggedIn()) {
      let voteRecord = new UserPostVote();
      voteRecord.PostId = post.id;
      voteRecord.Voted = -1;
      voteRecord.UserId = user.id;

      let voteCode = await this.checkIfCanVote(voteRecord);

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
    else {
      this.sharedService.openSnackBarMessage("Must be logged in to vote", "Ok");
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

  reportPost(post: Post) {
    let postReport = new PostReport;
    postReport.post = post;
    postReport.lastReportDate = new Date().toJSON();
    postReport.numberOfReports = 1;

    this.sendReport(postReport);
  }


  sendReport(postReport: PostReport) {
    this._http.post("api/Post/Report", postReport, { responseType: 'text' })
      .subscribe(response => {
        this.sharedService.openSnackBarMessage("Post reported", "Ok");
      },
        error => {
          console.log(error);
        }
      );
  }
}
