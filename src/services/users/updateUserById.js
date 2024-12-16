import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateUserById = async (id, updatedUser) => {
  try {
    // Attempt to update the user by ID
    const user = await prisma.user.updateMany({
      where: { id },
      data: updatedUser,
    });

    // If a user was updated, return the ID; otherwise, return null
    return user.count > 0 ? id : null;
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error updating user:", error);

    // Throw a new error with a general message
    throw new Error("Failed to update user");
  }
};

export default updateUserById;
