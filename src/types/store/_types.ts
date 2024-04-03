export interface Product {
    id: Number;
    authorId: Number, 
    title: string;
    description: string;
    price: number;
    image: string;
    createdAt: Date;
}

export interface Purchase {
    id: Number;
    userId: Number;
    productId: Number;
    code: string;
    status: string;
    createdAt: Date;

    product: Product;
}