/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Amenity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Amenity_name_key" ON "Amenity"("name");
