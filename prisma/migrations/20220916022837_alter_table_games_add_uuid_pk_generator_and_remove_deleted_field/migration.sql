/*
  Warnings:

  - You are about to drop the column `deleted` on the `Game` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "coverURL" TEXT NOT NULL
);
INSERT INTO "new_Game" ("coverURL", "id", "name") SELECT "coverURL", "id", "name" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
