import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getPropertyById = async (id) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      const error = new Error(`Property with id ${id} not found`);
      error.statusCode = 404; // Stel de statuscode in op 404 als het niet gevonden is
      throw error; // Gooi de fout door om verder afgehandeld te worden
    }

    return property;
  } catch (error) {
    console.error("Error retrieving property:", error.message);
    throw error; // Gooi de fout opnieuw door naar de oproeper
  }
};

export default getPropertyById;
