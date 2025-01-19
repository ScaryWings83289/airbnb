//* Components Imports */

import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";
import ListingClient from "@/app/listings/[listingId]/ListingClient";

//* Utils Imports */
import getListingById from "@/app/actions/getListingById";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { getReservations } from "@/app/actions/getReservations";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: Promise<IParams> }) => {
  const { listingId } = await params;
  const listing = await getListingById({ listingId });
  const reservations = await getReservations({ listingId });
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;
