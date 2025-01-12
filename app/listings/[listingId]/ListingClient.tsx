//* Packages Imports */
import { Reservations } from "@prisma/client";

//* Components Imports */
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";

//* Utils Imports */
import { SafeListing, SafeUser } from "@/app/types";

interface ListingClientProps {
  reservations?: Reservations[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  reservations,
  listing,
  currentUser,
}) => {
  return (
    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col gap-6'>
          <ListingHead
            id={listing.id}
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            currentUser={currentUser}
          />

          <div className='grid grid-cols-1 md:grid-cols-7 gap-6 md:gap-10'>
            <ListingInfo
              user={listing.user}
              category={listing.category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
