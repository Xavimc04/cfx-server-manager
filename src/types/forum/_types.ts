export interface Post {
    id: Number | BigInt | any;
    authorId: Number;
    title: String;
    content: String;
    published: Boolean; 
    createdAt: Date; 
    author: any;
}

export interface PostList {
    query: string;
    page: BigInt | Number | any;
}