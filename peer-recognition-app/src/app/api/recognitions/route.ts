import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/getUser";

const VALUES = [
  "Teamwork",
  "Innovation",
  "Ownership",
  "Customer Obsession",
];

// CREATE RECOGNITION

export async function POST(req: Request) {
  try {

    const currentUserId =
      getUserFromRequest(req);

    const body = await req.json();

    const {
      recipients,
      value,
      message,
    } = body;

    // Validation

    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Message required" },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { error: "Message too long" },
        { status: 400 }
      );
    }

    if (!VALUES.includes(value)) {
      return NextResponse.json(
        { error: "Invalid value" },
        { status: 400 }
      );
    }

    if (
      !recipients ||
      recipients.length === 0
    ) {
      return NextResponse.json(
        {
          error:
            "At least one recipient required",
        },
        { status: 400 }
      );
    }

    // Prevent self recognition

    if (
      recipients.includes(currentUserId)
    ) {
      return NextResponse.json(
        {
          error:
            "You cannot recognize yourself",
        },
        { status: 400 }
      );
    }

    // Create recognition

    const recognition =
      await prisma.recognition.create({
        data: {
          message,
          value,
          giverId: currentUserId,

          recipients: {
            create: recipients.map(
              (userId: string) => ({
                userId,
              })
            ),
          },
        },

        include: {
          giver: true,

          recipients: {
            include: {
              user: true,
            },
          },

          reactions: true,

          comments: {
            include: {
              author: true,
            },
          },
        },
      });

    return NextResponse.json(
      recognition
    );

  } catch (error) {

    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}

// GET PUBLIC FEED

export async function GET(req: Request) {

  try {

    const { searchParams } =
      new URL(req.url);

    // Pagination

    const page =
      Number(
        searchParams.get("page")
      ) || 1;

    const limit =
      Number(
        searchParams.get("limit")
      ) || 10;

    const skip =
      (page - 1) * limit;

    // Filters

    const value =
      searchParams.get("value");

    const giverId =
      searchParams.get("giverId");

    const recipientId =
      searchParams.get(
        "recipientId"
      );

    // Sorting

    const sort =
      searchParams.get("sort") ||
      "desc";

    // Dynamic filters

    const whereClause: any = {};

    if (value) {
      whereClause.value = value;
    }

    if (giverId) {
      whereClause.giverId = giverId;
    }

    if (recipientId) {
      whereClause.recipients = {
        some: {
          userId: recipientId,
        },
      };
    }

    // Total count

    const total =
      await prisma.recognition.count({
        where: whereClause,
      });

    // Fetch recognitions

    const recognitions =
      await prisma.recognition.findMany({
        where: whereClause,

        include: {
          giver: true,

          recipients: {
            include: {
              user: true,
            },
          },

          reactions: true,

          comments: {
            include: {
              author: true,
            },
          },
        },

        orderBy: {
          createdAt:
            sort === "asc"
              ? "asc"
              : "desc",
        },

        skip,
        take: limit,
      });

    return NextResponse.json({
      page,
      limit,
      total,

      totalPages:
        Math.ceil(total / limit),

      recognitions,
    });

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "Failed to fetch recognitions",
      },
      { status: 500 }
    );
  }
}