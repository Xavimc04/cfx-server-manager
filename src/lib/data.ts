"use server"

import { z } from "zod";
import prisma from "./prisma";
import { PostList } from "@/types/forum/_types";
import { POST_PER_PAGE } from "./constants";

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
    page
} : PostList) {
    const data = await prisma.post.findMany({
        where: {
            title: {
                contains: query
            }
        },
        skip: (page - 1) * POST_PER_PAGE,
        take: POST_PER_PAGE,
        include: {
            author: {
                select: { 
                    name: true,
                    image: true
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
            comments: true
        }
    });
}