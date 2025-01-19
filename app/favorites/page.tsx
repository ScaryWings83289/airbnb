//* Components Imports */
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import FavoritesClient from "@/app/favorites/FavoritesClient";

//* Utils Imports */
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { getFavoriteListings } from "@/app/actions/getFavoriteListings";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title='Unauthorized' subtitle='Please login' />
      </ClientOnly>
    );
  }

  const favoriteListings = await getFavoriteListings();

  if (favoriteListings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='No favorites found'
          subtitle='Looks like you have no favorite listings.'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={favoriteListings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FavoritesPage;
