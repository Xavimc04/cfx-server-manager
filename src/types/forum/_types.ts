export interface Post {
    authorId: Number;
    title: String;
    content: String;
    published: Boolean; 
    createdAt: Date; 
}

export interface PostList {
    query: string;
    page: BigInt | Number | any;
    category: String;
}