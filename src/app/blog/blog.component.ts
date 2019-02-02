import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
posts: Post[] = []

  constructor() { }

  ngOnInit() {
    for (var i=0; i<3; i++) {
      this.posts.push(new Post(
        'Post ' + i,
        'admin',
        new Date("2015-03-25"),
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod"
        +"empor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
        +" quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        +" Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore "
        +"eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,"
        +" sunt in culpa qui officia deserunt mollit anim id est laborum."
      ))
    }
  }

}
