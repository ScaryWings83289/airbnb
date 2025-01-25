"use client";

//* Packages Imports */
import axios from "axios";
import toast from "react-hot-toast";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { Range } from "react-date-range";

//* Components Imports */
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservations from "@/app/components/listings/ListingReservations";

//* Utils Imports */
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservations, SafeUser } from "@/app/types";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: SafeReservations[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser,
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Listing reserved");
        setDateRange(initialDateRange);
        router.push("/trips");
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: SafeReservations) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

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

          <div className='grid grid-cols-1 md:grid-cols-7 sm:gap-6 md:gap-10'>
            <ListingInfo
              user={listing.user}
              category={listing.category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className='mb-10 order-first md:order-last md:col-span-3'>
              <ListingReservations
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value: Range) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
