import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createProperty = async (
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  hostId,
  rating
) => {
  try {
    const newProperty = {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    };

    const property = await prisma.property.create({
      data: newProperty,
    });

    return property;
  } catch (error) {
    const err = new Error("Failed to create property");
    err.statusCode = 500;
    throw err;
  } finally {
    await prisma.$disconnect();
  }
};

export default createProperty;
