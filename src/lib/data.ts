"use server"

import { z } from "zod";
import prisma from "./prisma";
import { PostQuery } from "@/types/forum/_types";
import { POST_PER_PAGE } from "./constants";
import { revalidatePath } from "next/cache";

export async function registerForumPost(prevState: any, data: FormData) {
    try {
        const authorId = Number(data.get("authorId"));
        const title = data.get("title") as string;
        const content = data.get("content") as string;

        if (!authorId || !title || !content) return "Todos los campos deben ser completados";

        const postSchema = z.object({
            authorId: z.number(),
            title: z.string(),
            content: z.string()
        });
    
        const post = postSchema.safeParse({
            authorId, title, content
        });
    
        if (!post.success) return "Todos los campos deben ser completados";
    
        await prisma.post.create({
            data: {
                authorId: post.data.authorId,
                title: post.data.title,
                content: post.data.content
            }
        });

        revalidatePath("/forum");
    
        return "Post registrado";
    } catch (error) {
        console.error((error as Error).message);

        return "Error desconocido";
    }
}

export async function countPosts(query: string) {
    return await prisma.post.count({
        where: {
            title: {
                contains: query
            }
        }
    });
}

export async function getFilteredPosts({
    query,
    page,
    authorId
} : PostQuery) {
    let whereClause: any = {
        title: {
            contains: query
        }
    };

    if (authorId) {
        whereClause = {
            ...whereClause,
            authorId
        };
    }

    const data = await prisma.post.findMany({
        where: whereClause,
        skip: (page - 1) * POST_PER_PAGE,
        take: POST_PER_PAGE,
        include: {
            author: {
                select: { 
                    name: true,
                    image: true,
                    createdAt: true
                }
            },
            comments: true
        }
    });

    const total = await countPosts(query);

    return {
        data,
        totalPages: Math.ceil(total / POST_PER_PAGE) || 1
    }
}

export async function fetchPost(id: number) {
    return await prisma.post.findUnique({
        where: {
            id
        },
        include: {
            author: {
                select: { 
                    name: true,
                    image: true,
                    createdAt: true
                }
            }, 
            comments: {
                include: {
                    author: {
                        select: {
                            name: true,
                            image: true,
                            createdAt: true
                        }
                    }
                }
            }
        }
    });
}

export async function commentOnPost(prevState: any, data: FormData) {
    try {
        const authorId = Number(data.get("authorId"));
        const postId = Number(data.get("postId"));
        const content = data.get("content") as string;

        if (!authorId || !postId || !content) return "Todos los campos deben ser completados";

        const commentSchema = z.object({
            authorId: z.number(),
            postId: z.number(),
            content: z.string()
        });
    
        const comment = commentSchema.safeParse({
            authorId, postId, content
        });
    
        if (!comment.success) return "Todos los campos deben ser completados";
    
        await prisma.comments.create({
            data: {
                authorId: comment.data.authorId,
                postId: comment.data.postId,
                content: comment.data.content
            }
        });

        revalidatePath(`/forum/post/${postId}`);
    
        return "Comentario registrado";
    } catch (error) {
        console.error((error as Error).message);

        return "Error desconocido";
    }
}

export async function toggleSavedPost(prevState: any, data: FormData) {
    try {
        const postId = Number(data.get("postId"));
        const userId = Number(data.get("userId"));

        if (!postId || !userId) return "Todos los campos deben ser completados";

        const postSchema = z.object({
            postId: z.number(),
            userId: z.number()
        });
    
        const post = postSchema.safeParse({
            postId, userId
        });
    
        if (!post.success) return "Todos los campos deben ser completados";

        const alreadySaved = await isPostSaved(userId, postId);

        if (alreadySaved) await prisma.savedPosts.deleteMany({
            where: {
                postId, userId
            }
        }) 
        
        else await prisma.savedPosts.create({
            data: {
                postId, userId
            }
        });
    
        revalidatePath(`/forum/post/${postId}`);

        return "Post guardado";
    } catch (error) {
        console.error((error as Error).message);

        return "Error desconocido";
    }
}

export async function isPostSaved(userId: number, postId: number) {
    if(!userId || !postId) return false; 

    return !!await prisma.savedPosts.findFirst({
        where: {
            userId,
            postId
        }
    });
}

export async function fetchUserByName(name: string) {
    return await prisma.user.findFirst({
        where: {
            name
        },
        select: {
            id: true,
            name: true,
            image: true,
            createdAt: true,
            _count: {
                select: {
                    posts: true,
                    comments: true
                }
            }
        }
    });
}

export async function getUserBalance(userId: number) {
    if (!userId) return 0;

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            balance: true
        }
    });

    return user?.balance || 0;
}

export async function registerStoreProduct(prevState: any, data: FormData) {
    try {
        const authorId = Number(data.get("authorId"));
        const title = data.get("title") as string;
        const description = data.get("description") as string;
        const price = Number(data.get("price"));
        const imageUrl = data.get("image") as string;

        if (!authorId || !title || !description || !price || !imageUrl) return "Todos los campos deben ser completados";

        const postSchema = z.object({
            authorId: z.number(),
            title: z.string(),
            description: z.string(),
            price: z.number(),
            imageUrl: z.string()
        });
    
        const post = postSchema.safeParse({
            authorId, title, description, price, imageUrl
        });
    
        if (!post.success) return "Todos los campos deben ser completados";
    
        await prisma.product.create({
            data: {
                authorId: post.data.authorId,
                title: post.data.title,
                description: post.data.description,
                price: post.data.price,
                image: post.data.imageUrl
            }
        })

        revalidatePath("/store");
    
        return "Producto registrado";
    } catch (error) {
        console.error((error as Error).message);

        return "Error desconocido";
    }
}