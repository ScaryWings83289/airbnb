//* Components Imports */
import ClientOnly from "@/app/components/ClientOnly";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import ListingCard from "@/app/components/listings/ListingCard";

//* Utils Imports */
import { getListings, IListingParams } from "@/app/actions/getListing";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { SafeListing } from "@/app/types";

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<IListingParams>;
}) => {
  const {
    userId,
    guestCount,
    roomCount,
    bathroomCount,
    startDate,
    endDate,
    locationValue,
    category,
  } = await searchParams;

  const listings = await getListings({
    userId,
    guestCount,
    roomCount,
    bathroomCount,
    startDate,
    endDate,
    locationValue,
    category,
  });
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className='pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {listings.map((listing: SafeListing) => {
            return (
              <ListingCard
                key={listing.id}
                currentUser={currentUser}
                data={listing}
              />
            );
          })}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
