//* Packages Imports */
import { NextRequest, NextResponse } from "next/server";

//* Utils Imports */
import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function DELETE(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const reservationId = url.pathname.split("/").pop();

    // Validate reservationId
    if (!reservationId || typeof reservationId !== "string") {
      return NextResponse.json(
        { message: "Invalid reservation ID" },
        { status: 400 }
      );
    }

    // Check if the reservation exists
    const reservation = await prisma.reservations.findUnique({
      where: { id: reservationId },
    });

    if (!reservation) {
      return NextResponse.json(
        { message: "Reservation not found" },
        { status: 404 }
      );
    }

    // Check if the current user is authorized to delete this reservation
    const deletionResult = await prisma.reservations.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } },
        ],
      },
    });

    if (deletionResult.count === 0) {
      return NextResponse.json(
        { message: "You are not authorized to delete this reservation" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { message: "Reservation deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting reservation:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
