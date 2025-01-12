//* Utils Imports */
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export const getReservations = async (parmas: IParams) => {
  try {
    const { listingId, userId, authorId } = parmas;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservations.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        creatdAt: "desc",
      },
    });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      creatdAt: reservation.creatdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return safeReservations;
  } catch (error) {
    console.error("Error: ", error);
    throw new Error(error as string);
  }
};
