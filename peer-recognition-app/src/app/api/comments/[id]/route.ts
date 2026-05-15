import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/getUser";

export async function DELETE(
  req: Request,
  { params }: {
    params: Promise<{ id: string }>
  }
) {

  try {

    const currentUserId =
      getUserFromRequest(req);

    const { id } = await params;

    // Find comment

    const comment =
      await prisma.comment.findUnique({
        where: {
          id,
        },
      });

    if (!comment) {
      return NextResponse.json(
        {
          error: "Comment not found",
        },
        { status: 404 }
      );
    }

    // Authorization check

    if (
      comment.authorId !== currentUserId
    ) {
      return NextResponse.json(
        {
          error:
            "Not authorized to delete this comment",
        },
        { status: 403 }
      );
    }

    // Delete comment

    await prisma.comment.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Comment deleted",
    });

  } catch (error) {

    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}