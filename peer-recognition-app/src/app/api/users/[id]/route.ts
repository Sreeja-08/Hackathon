import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/getUser";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {

  try {

    // Ensure authenticated

    getUserFromRequest(req);

    // Get dynamic user id

    const { id } =
      await params;

    // Query params

    const { searchParams } =
      new URL(req.url);

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

    const value =
      searchParams.get("value");

    // Find user

    const user =
      await prisma.user.findUnique({
        where: {
          id,
        },

        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      });

    if (!user) {

      return NextResponse.json(
        {
          error:
            "User not found",
        },
        { status: 404 }
      );
    }

    // Total given count

    const totalGiven =
      await prisma.recognition.count({
        where: {
          giverId: id,

          ...(value && {
            value,
          }),
        },
      });

    // Total received count

    const totalReceived =
      await prisma.recognition.count({
        where: {

          ...(value && {
            value,
          }),

          recipients: {
            some: {
              userId: id,
            },
          },
        },
      });

    // GIVEN recognitions

    const givenRecognitions =
      await prisma.recognition.findMany({
        where: {
          giverId: id,

          ...(value && {
            value,
          }),
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

        orderBy: {
          createdAt: "desc",
        },

        skip,
        take: limit,
      });

    // RECEIVED recognitions

    const receivedRecognitions =
      await prisma.recognition.findMany({
        where: {

          ...(value && {
            value,
          }),

          recipients: {
            some: {
              userId: id,
            },
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

        orderBy: {
          createdAt: "desc",
        },

        skip,
        take: limit,
      });

    // Final response

    return NextResponse.json({

      user,

      pagination: {

        page,
        limit,

        totalGiven,
        totalReceived,

        totalGivenPages:
          Math.ceil(
            totalGiven / limit
          ),

        totalReceivedPages:
          Math.ceil(
            totalReceived / limit
          ),
      },

      givenRecognitions,

      receivedRecognitions,

      givenCount:
        totalGiven,

      receivedCount:
        totalReceived,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to fetch profile",
      },
      { status: 500 }
    );
  }
}