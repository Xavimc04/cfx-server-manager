"use server"

import { Post } from "@/types/forum/_types";
import { z } from "zod";
import prisma from "./prisma";

export async function registerForumPost({
    authorId, title, content
} : Post) {
    try {
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