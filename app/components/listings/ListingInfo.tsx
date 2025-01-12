"use client";

//* Packages Imports */
import dynamic from "next/dynamic";
import { useMemo } from "react";

//* Components Imports */
import Avatar from "@/app/components/Avatar";
import ListingCategory from "@/app/components/listings/ListingCategory";

//* Utils Imports */
import useCountries from "@/app/hooks/useCountries";
import { CATEGORIES } from "@/app/data/categories";
import { SafeUser } from "@/app/types";

const Map = dynamic(() => import("@/app/components/Map"), {
  ssr: false,
});

interface ListingInfoProps {
  user: SafeUser;
  category: string;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  const categoryValue = useMemo(() => {
    return CATEGORIES.find((item) => item.label === category);
  }, [category]);

  return (
    <div className='col-span-4 flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <div className='text-xl font-semibold flex flex-row items-center gap-2'>
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>

        <div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>

      <hr />

      {categoryValue && (
        <ListingCategory
          icon={categoryValue.icon}
          label={categoryValue.label}
          description={categoryValue.description}
        />
      )}

      <hr />

      <div className='text-lg font-light text-neutral-500'>{description}</div>

      <hr />

      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
