//* Components Imports */
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ReservationsClient from "@/app/reservations/ReservationsClient";

//* Utils Imports */
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { getReservations } from "@/app/actions/getReservations";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title='Unauthorized' subtitle='Please login' />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No reservations found'
          subtitle='Looks like you have no reservations on your properties.'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ReservationsPage;
