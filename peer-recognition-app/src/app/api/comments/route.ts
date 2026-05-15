import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/getUser";

export async function POST(req: Request) {
  try {

    const currentUserId =
      getUserFromRequest(req);

    const body = await req.json();

    const {
      recognitionId,
      body: commentBody,
    } = body;

    // Validation

    if (!commentBody?.trim()) {
      return NextResponse.json(
        {
          error:
            "Comment cannot be empty",
        },
        { status: 400 }
      );
    }

    if (commentBody.length > 500) {
      return NextResponse.json(
        {
          error:
            "Comment too long",
        },
        { status: 400 }
      );
    }

    // Check recognition exists

    const recognition =
      await prisma.recognition.findUnique({
        where: {
          id: recognitionId,
        },
      });

    if (!recognition) {
      return NextResponse.json(
        {
          error:
            "Recognition not found",
        },
        { status: 404 }
      );
    }

    // Create comment

    const comment =
      await prisma.comment.create({
        data: {
          body: commentBody,
          authorId: currentUserId,
          recognitionId,
        },

        include: {
          author: true,
        },
      });

    return NextResponse.json(
      comment
    );

  } catch (error) {

    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}