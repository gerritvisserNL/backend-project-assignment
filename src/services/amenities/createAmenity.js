import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createAmenity = async (name) => {
  try {
    const amenity = await prisma.amenity.create({
      data: { name },
    });

    return {
      status: 201,
      message: "Amenity succesfully created",
      data: amenity,
    };
  } catch (error) {
    console.error("Error in createAmenity:", error);

    if (error.code === "P2002") {
      return {
        status: 409,
        message: "An amenity with this name already exists.",
      };
    }

    return {
      status: 500,
      message: "An error occured while creating amenity.",
    };
  }
};

export default createAmenity;
