"use server"

import { z } from "zod";
import prisma from "./prisma";
import { PostQuery } from "@/types/forum/_types";
import { POST_PER_PAGE } from "./constants";
import { revalidatePath } from "next/cache";
import { throwLoggerInfo } from "./logger";

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
        const ingameCategory = data.get("ingame_category") as string;
        const ingameValue = data.get("ingame_value") as string;

        if (!authorId || !title || !description || !price || !imageUrl || !ingameCategory || !ingameValue) return "Todos los campos deben ser completados";

        const postSchema = z.object({
            authorId: z.number(),
            title: z.string(),
            description: z.string(),
            price: z.number(),
            imageUrl: z.string(),
            ingameCategory: z.string(),
            ingameValue: z.string()
        });
    
        const post = postSchema.safeParse({
            authorId, title, description, price, imageUrl, ingameCategory, ingameValue
        });
    
        if (!post.success) return "Todos los campos deben ser completados";
    
        await prisma.product.create({
            data: {
                authorId: post.data.authorId,
                title: post.data.title,
                description: post.data.description,
                price: post.data.price,
                image: post.data.imageUrl,
                ig_category: post.data.ingameCategory,
                ig_value: post.data.ingameValue
            }
        })

        revalidatePath("/store");
    
        return "Producto registrado";
    } catch (error) {
        console.error((error as Error).message);

        return "Error desconocido";
    }
}

export async function getFilteredProducts(query: string) {
    return await prisma.product.findMany({
        where: {
            title: {
                contains: query
            }
        }
    });
}

export async function buyProduct(prevState: any, data: FormData) {
    try {
        const productId = Number(data.get("productId"));
        const userId = Number(data.get("userId"));
    
        if (!productId || !userId) return "Por favor inicia sesión para comprar productos";
    
        const product = await prisma.product.findUnique({
            where: {
                id: productId
            }
        });
    
        if (!product) return "Producto no encontrado";
    
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });
    
        if (!user) return "Usuario no encontrado";
    
        if (user.balance < product.price) return "Saldo insuficiente";
    
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                balance: {
                    decrement: product.price
                }
            }
        });
    
        await prisma.userPurchases.create({
            data: {
                userId,
                productId,
                code: Math.random().toString(36).substring(7)
            }
        });

        throwLoggerInfo(`User ${user.name} bought product ${product.title}`);
    
        revalidatePath("/store");
    
        return "Producto comprado";   
    } catch (error) {
        console.error((error as Error).message);

        return "Error desconocido";
    }
}

export async function getUserPurchases(userId: number) {
    return await prisma.userPurchases.findMany({
        where: {
            userId
        },
        include: {
            product: true
        }
    });
}

export async function suscribeToNewsletter(prevState: any, data: FormData) {
    try {
        const email = data.get("email") as string;

        if (!email) return "Por favor ingresa tu correo electrónico";

        const emailSchema = z.object({
            email: z.string()
        });

        const emailData = emailSchema.safeParse({
            email
        });

        if (!emailData.success) return "Por favor ingresa un correo electrónico válido";

        const alreadySuscribed = await prisma.newsletter.findFirst({
            where: {
                email: emailData.data.email
            }
        });

        if (alreadySuscribed) return "Correo ya registrado";

        await prisma.newsletter.create({
            data: {
                email: emailData.data.email
            }
        });

        return "Correo registrado";
    } catch (error) {
        return "Error desconocido";
    }
}