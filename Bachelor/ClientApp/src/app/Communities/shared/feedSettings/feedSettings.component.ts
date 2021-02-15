import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from '../../../Models/Communities/Post';
import { PostsService } from '../posts/posts.service';

@Component({
  selector: 'feed-settings',
  template: `<b>These buttons don't work atm</b><br />
    Order by:
    <button (click)="orderByDate()">Date</button>
    <button (click)="orderByComments()">Comments</button>
    <button (click)="orderByScore()">Score</button><br />
    {{orderByValue}}`,
  providers: []
})

export class FeedSettings {

  allPosts: Post[];
  scoredAllPost: Post[];
  orderByValue: string;
  @Output() orderByValueEmitter = new EventEmitter<string>();


  constructor(private postsService: PostsService) {
    //this.scoredAllPost = this.allPosts.map(post => {
      //const scoreDifference = (post.upvotes - post.downvotes);
      //return scoreDifference
    //});
  }

  ngOnInit() {
    this.orderByValue = "-date";
    this.emitChange();
    //this.postsService.allPostsCurrent.subscribe(posts => this.allPosts = posts);
    //this.findPostScoreDifference();
  }


  orderByDate() {
    if (this.orderByValue == "-date") {
      this.orderByValue = "date";
    } else {
      this.orderByValue = "-date";
    }

    this.emitChange();
  }

  orderByScore() {
    let diff = "['-downvotes', 'upvotes']";


    if (this.orderByValue == "'-downvotes', 'upvotes'") {
      this.orderByValue = "'-upvotes', 'downvotes'";
    } else {
      this.orderByValue = "'-downvotes', 'upvotes'";
    }
    //this.orderByValue = diff;

    this.emitChange();
  }

  orderByComments() {
    if (this.orderByValue == "-comments.date") {
      this.orderByValue = "comments.date";
    } else {
      this.orderByValue = "-comments.date"
    }
    this.emitChange();
  }


  changeValue() {
    this.orderByValue = "Different Value";
    this.emitChange();
  }

  emitChange() {
    this.orderByValueEmitter.emit(this.orderByValue);
  }
}
