/*
  Warnings:

  - You are about to drop the column `pictureUrl` on the `Host` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Host" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "profilePicture" TEXT,
    "aboutMe" TEXT NOT NULL
);
INSERT INTO "new_Host" ("aboutMe", "email", "id", "name", "password", "phoneNumber", "username") SELECT "aboutMe", "email", "id", "name", "password", "phoneNumber", "username" FROM "Host";
DROP TABLE "Host";
ALTER TABLE "new_Host" RENAME TO "Host";
CREATE UNIQUE INDEX "Host_username_key" ON "Host"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
