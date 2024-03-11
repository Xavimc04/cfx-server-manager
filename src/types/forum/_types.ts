export interface Post {
    id: Number | BigInt | any;
    authorId: Number;
    title: String;
    content: String;
    published: Boolean; 
    createdAt: Date; 
    author: Author;
    comments: Comments[];
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

export interface Comments {
    id: Number | BigInt | any;
    content: String;
    authorId: Number | BigInt | any;
    createdAt: Date;
    postId: Number | BigInt | any;
}