import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/getUser";

const REACTIONS = [
  "heart",
  "clap",
  "fire",
  "thumbs_up",
];

export async function POST(req: Request) {
  try {

    const currentUserId =
      getUserFromRequest(req);

    const body = await req.json();

    const {
      recognitionId,
      type,
    } = body;

    // Validate reaction type

    if (!REACTIONS.includes(type)) {
      return NextResponse.json(
        { error: "Invalid reaction type" },
        { status: 400 }
      );
    }

    // Find recognition

    const recognition =
      await prisma.recognition.findUnique({
        where: {
          id: recognitionId,
        },
      });

    if (!recognition) {
      return NextResponse.json(
        { error: "Recognition not found" },
        { status: 404 }
      );
    }

    // Prevent reacting to own recognition

    if (
      recognition.giverId === currentUserId
    ) {
      return NextResponse.json(
        {
          error:
            "Cannot react to your own recognition",
        },
        { status: 400 }
      );
    }

    // Check existing reaction

    const existingReaction =
      await prisma.reaction.findUnique({
        where: {
          userId_recognitionId: {
            userId: currentUserId,
            recognitionId,
          },
        },
      });

    // No existing reaction → create

    if (!existingReaction) {

      const reaction =
        await prisma.reaction.create({
          data: {
            type,
            userId: currentUserId,
            recognitionId,
          },
        });

      return NextResponse.json({
        message: "Reaction added",
        reaction,
      });
    }

    // Same reaction → remove

    if (
      existingReaction.type === type
    ) {

      await prisma.reaction.delete({
        where: {
          id: existingReaction.id,
        },
      });

      return NextResponse.json({
        message: "Reaction removed",
      });
    }

    // Different reaction → replace

    const updatedReaction =
      await prisma.reaction.update({
        where: {
          id: existingReaction.id,
        },

        data: {
          type,
        },
      });

    return NextResponse.json({
      message: "Reaction updated",
      reaction: updatedReaction,
    });

  } catch (error) {

    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}