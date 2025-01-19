/* eslint-disable prefer-const */
//* Utils Imports */
import prisma from "@/app/libs/prismadb";

export interface IListingParams {
  userId?: string;
}

export const getListings = async (params: IListingParams) => {
  try {
    const { userId } = params;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error) {
    console.error("Error: ", error);
    throw new Error(error as string);
  }
};
