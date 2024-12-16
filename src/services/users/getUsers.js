import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUsers = async () => {
  try {
    // Fetch all users without any filter
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phoneNumber: true,
        profilePicture: true, // Exclude the password field
      },
    });

    // Return the users if the query is successful
    return users;
  } catch (error) {
    // Log the error details for debugging
    console.error("Error fetching users:", error);

    // Throw a new error to be caught by the calling function (e.g., router)
    throw new Error("Failed to fetch users");
  }
};

export default getUsers;
