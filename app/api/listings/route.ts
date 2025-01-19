//* Packages Imports */
import { NextRequest, NextResponse } from "next/server";

//* Utils Imports */
import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(request: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;

  // Validate required fields
  const requiredFields = [
    "title",
    "description",
    "imageSrc",
    "category",
    "roomCount",
    "bathroomCount",
    "guestCount",
    "location",
    "price",
  ];

  for (const field of requiredFields) {
    if (!body[field]) {
      return NextResponse.json(
        { message: `Missing required field: ${field}` },
        { status: 400 }
      );
    }
  }

  // Validate price is a valid number
  const parsedPrice = parseInt(price, 10);
  if (isNaN(parsedPrice)) {
    return NextResponse.json(
      { message: "Invalid price format" },
      { status: 400 }
    );
  }

  // Validate location
  if (!location || !location.value) {
    return NextResponse.json(
      { message: "Invalid location format" },
      { status: 400 }
    );
  }

  try {
    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(price, 10),
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listing, { status: 201 });
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.json(
      { message: "Something went wrong while creating the listing" },
      { status: 500 }
    );
  }
}
