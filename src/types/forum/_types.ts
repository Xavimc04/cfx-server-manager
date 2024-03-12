export interface Post {
    id: Number | BigInt | any;
    authorId: Number;
    title: String;
    content: String;
    createdAt: Date; 
    author: Author;
    comments: Comment[];
}

export interface Author {
    id?: Number | BigInt | any;
    name: string | null;
    email?: String;
    image: string | null;
    createdAt: Date;
}

export interface PostList {
    query: string;
    page: BigInt | Number | any;
}

export interface Comment {
    id: Number | BigInt | any;
    content: String;
    authorId: Number | BigInt | any;
    createdAt: Date;
    postId: Number | BigInt | any;
    author: Author;
}