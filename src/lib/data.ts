"use server"

import { z } from "zod";
import prisma from "./prisma";

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
        return "Error desconocido";
    }
}

export async function getFilteredPosts() {
    return await prisma.post.findMany({
        orderBy: {
            createdAt: "desc"
        },
        select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
            comments: {
                select: {
                    id: true
                }
            },
        }
    });
}