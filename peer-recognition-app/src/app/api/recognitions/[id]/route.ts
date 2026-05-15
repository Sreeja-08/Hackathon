import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/getUser";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>
  }
) {

  try {

    const currentUserId =
      getUserFromRequest(req);

    const { id } = await params;

    // Find recognition

    const recognition =
      await prisma.recognition.findUnique({
        where: {
          id,
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

    // Authorization check

    if (
      recognition.giverId !== currentUserId
    ) {
      return NextResponse.json(
        {
          error:
            "Not authorized to delete this recognition",
        },
        { status: 403 }
      );
    }

    // Delete recognition

    await prisma.recognition.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message:
        "Recognition deleted successfully",
    });

  } catch (error) {

    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}