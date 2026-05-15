import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/getUser";

export async function GET(req: Request) {

  try {

    // ensure authenticated
    getUserFromRequest(req);

    // last 30 days

    const thirtyDaysAgo =
      new Date();

    thirtyDaysAgo.setDate(
      thirtyDaysAgo.getDate() - 30
    );

    // TOP GIVERS

    const topGivers =
      await prisma.recognition.groupBy({
        by: ["giverId"],

        _count: {
          giverId: true,
        },

        where: {
          createdAt: {
            gte: thirtyDaysAgo,
          },
        },

        orderBy: {
          _count: {
            giverId: "desc",
          },
        },
      });

    // fetch giver names

    const formattedTopGivers =
      await Promise.all(
        topGivers.map(
          async (giver, index) => {

            const user =
              await prisma.user.findUnique({
                where: {
                  id: giver.giverId,
                },
              });

            return {
              rank: index + 1,
              name: user?.name,
              count:
                giver._count.giverId,
            };
          }
        )
      );

    // TOP RECIPIENTS

    const topRecipients =
      await prisma.recognitionRecipient.groupBy({
        by: ["userId"],

        _count: {
          userId: true,
        },

        where: {
          recognition: {
            createdAt: {
              gte: thirtyDaysAgo,
            },
          },
        },

        orderBy: {
          _count: {
            userId: "desc",
          },
        },
      });

    const formattedTopRecipients =
      await Promise.all(
        topRecipients.map(
          async (recipient, index) => {

            const user =
              await prisma.user.findUnique({
                where: {
                  id: recipient.userId,
                },
              });

            return {
              rank: index + 1,
              name: user?.name,
              count:
                recipient._count.userId,
            };
          }
        )
      );

    // MOST USED VALUES

    const valueStats =
      await prisma.recognition.groupBy({
        by: ["value"],

        _count: {
          value: true,
        },

        where: {
          createdAt: {
            gte: thirtyDaysAgo,
          },
        },

        orderBy: {
          _count: {
            value: "desc",
          },
        },
      });

    const formattedValues =
      valueStats.map(
        (item, index) => ({
          rank: index + 1,
          value: item.value,
          count:
            item._count.value,
        })
      );

    return NextResponse.json({
      topGivers:
        formattedTopGivers,

      topRecipients:
        formattedTopRecipients,

      mostUsedValues:
        formattedValues,
    });

  } catch (error) {

    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}