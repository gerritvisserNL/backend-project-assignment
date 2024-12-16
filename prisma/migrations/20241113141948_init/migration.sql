-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "pictureUrl" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "checkinDate" DATETIME NOT NULL,
    "checkoutDate" DATETIME NOT NULL,
    "numberOfGuests" INTEGER NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "bookingStatus" TEXT NOT NULL,
    CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Booking_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hostId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "pricePerNight" REAL NOT NULL,
    "bedroomCount" INTEGER NOT NULL,
    "bathRoomCount" INTEGER NOT NULL,
    "maxGuestsCount" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    CONSTRAINT "Property_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Amenity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Host" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "pictureUrl" TEXT NOT NULL,
    "aboutMe" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PropertyAmenity" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_PropertyAmenity_A_fkey" FOREIGN KEY ("A") REFERENCES "Amenity" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PropertyAmenity_B_fkey" FOREIGN KEY ("B") REFERENCES "Property" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Host_username_key" ON "Host"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_PropertyAmenity_AB_unique" ON "_PropertyAmenity"("A", "B");

-- CreateIndex
CREATE INDEX "_PropertyAmenity_B_index" ON "_PropertyAmenity"("B");
