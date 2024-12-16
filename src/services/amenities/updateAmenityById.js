import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateAmenityById = async (id, updatedAmenity) => {
  try {
    const existingAmenity = await prisma.amenity.findUnique({
      where: { id },
    });

    if (!existingAmenity) {
      return { status: 404, message: `Amenity with ID ${id} not found` };
    }

    const updatedAmenityRecord = await prisma.amenity.update({
      where: { id },
      data: updatedAmenity,
    });

    return {
      status: 200,
      message: `Amenity with ID ${id} successfully updated`,
      data: updatedAmenityRecord,
    };
  } catch (error) {
    console.error("Error updating amenity:", error);

    if (error.code === "P2002") {
      return { status: 400, message: "Database constraint violation" };
    }

    return {
      status: 500,
      message: `Internal Server Error: ${error.message}`,
    };
  }
};

export default updateAmenityById;
