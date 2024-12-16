import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updatePropertyById = async (id, updatedProperty) => {
  try {
    // Attempt to update the property
    const property = await prisma.property.updateMany({
      where: { id },
      data: updatedProperty,
    });

    // Check if the property was updated, and return the ID or null
    return property.count > 0 ? id : null;
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error updating property:", error);

    // Throw the error to be handled by the router or higher layer
    throw new Error("Failed to update property");
  }
};

export default updatePropertyById;
