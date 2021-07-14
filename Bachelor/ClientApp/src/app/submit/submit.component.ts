import { Component,OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../Users/users.service';
import { CommunitiesService } from '../Communities/shared/communities/communities.service';
import { Subscription } from 'rxjs';
import { Community } from '../Models/Communities/Community';
import { User } from '../Models/Users/User';
import { PostTag } from '../Models/Communities/PostTag';
import { PostsService } from '../Communities/shared/posts/posts.service';
import { Post } from '../Models/Communities/Post';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: './submit.component.html',
    styleUrls: ['./submit.component.css']
})

export class SubmitComponent {

    allCommunities: Community[];
    allCommunitiesSub: Subscription;

    rootCommunities: Community[];
    rootCommunitiesSub: Subscription;

    user : User;
    userSub : Subscription;

    allPostTags: PostTag[];
    allPostTagsSub: Subscription;

    //An array containing all the communites to post to
    postToCommunity : string[] = [];

    postForm = new FormGroup({
        community : new FormControl(''),
        tags : new FormControl(''),
        identity : new FormControl(''),
        experience : new FormControl(''),
        text : new FormControl(''),
    });

    constructor(
        private http : HttpClient,
        private userService : UserService,
        private communitiesService : CommunitiesService,
        private postsService : PostsService,
        ) {

    }

    ngOnInit() {
        this.rootCommunitiesSub = this.communitiesService.rootCommunitiesCurrent.subscribe(communities => this.rootCommunities = communities);
        this.allCommunitiesSub = this.communitiesService.allCommunitiesCurrent.subscribe(communities => this.allCommunities = communities);
        this.userSub = this.userService.userCurrent.subscribe(user => this.user = user);
        this.allPostTagsSub = this.postsService.allPostTagsCurrent.subscribe(postTag => this.allPostTags = postTag);
        this.communitiesService.getRootCommunities(0);

        //If there are no tags, we´ll get them
        if (this.allPostTags == null || this.allPostTags.length == 0) {
            this.postsService.getPostTags();
          }
    }

    get community() {
        return this.postForm.get("community");
    }

    get tags() {
        return this.postForm.get("tags");
    }

    get identity() {
        return this.postForm.get("identity");
    }

    get experience() {
        return this.postForm.get("experience");
    }

    get text() {
        return this.postForm.get("text");
    }

    findCommunityId(community : string) : Community {
        for(var i = 0; i < this.rootCommunities.length; i++) {
            if(community == this.rootCommunities[i].title) {
                return this.rootCommunities[i];
            }
        }
    }


    async submit() {
        var post = new Post();
        post.text = this.postForm.value.text;
        post.date = new Date().toJSON();
        post.user = this.user;

        post.community = this.findCommunityId(this.postForm.value.community);

        post.postTag = this.postForm.value.tags;

        if (this.postForm.value.experience !== "null") {
            post.experience = this.postForm.value.experience;
          }

        if (this.postForm.value.identity === "null") {
            post.anonymous = true;
          } else { post.anonymous = false; }

        await this.postsService.sendPost(post).then(response => {
            console.log(response);
        }) 
    }
}