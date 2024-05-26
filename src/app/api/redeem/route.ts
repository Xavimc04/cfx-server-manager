import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.url); 
    const code = url.searchParams.get("code");

    if(!code) return NextResponse.json({
        error: "Invalid request"
    }, { status: 400 })

    const doesCodeExist = await prisma.userPurchases.findFirst({
        where: {
            code: code
        },
        select: {
            code: true, 
            status: true,
            createdAt: true
        }
    })

    if(!doesCodeExist) return NextResponse.json({
        error: "Invalid code"
    }, { status: 400 })

    return NextResponse.json({
        code: doesCodeExist
    }, { status: 200 })
}

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const {
            discordId, 
            code, 
            secret
        } : {
            discordId: string,
            code: string,
            secret: string
        } = data; 

        if(!data || !discordId || !code || !secret) return NextResponse.json({
            error: "Invalid request"
        }, { status: 400 })

        // @ Validate secret
        if(!process.env.REDEEM_SERVER_SECRET || secret !== process.env.REDEEM_SERVER_SECRET) return NextResponse.json({
            error: "Unauthorized",
            message: "Invalid secret key"
        }, { status: 401 })

        // @ Validate code existence
        const doesCodeExist = await prisma.userPurchases.findFirst({
            where: {
                code: code
            }
        })

        if(!doesCodeExist) return NextResponse.json({
            error: "Invalid code"
        }, { status: 400 })

        // @ Validate if discordId pertains to the code owner
        const userAccount = await prisma.account.findFirst({
            where: {
                providerAccountId: discordId
            }
        })

        if(!userAccount || !userAccount.userId) return NextResponse.json({
            error: "User not found"
        }, { status: 404 })

        // @ Is the same userId the code pertains
        if(userAccount.userId !== doesCodeExist.userId) return NextResponse.json({
            error: "Unauthorized"
        }, { status: 401 })

        // @ Update code status
        const updateCode = await prisma.userPurchases.update({
            where: {
                id: doesCodeExist.id,
                code: code
            },
            include: {
                product: true
            },
            data: {
                status: "claimed"
            }
        })

        if(!updateCode) return NextResponse.json({
            error: "Failed to update code"
        }, { status: 500 })

        return NextResponse.json({
            code: updateCode,
            success: true,
            message: "Code successfully claimed"
        }, { status: 200 })
    } catch (error : Error | any) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 })
    }
}