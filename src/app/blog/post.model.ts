export class Post {
  constructor(
    public title: string,
    public author: string,
    // this should rather come like a string (formatted in java as days ago)
    public date: Date,
    public content: string
  ) {}
}
