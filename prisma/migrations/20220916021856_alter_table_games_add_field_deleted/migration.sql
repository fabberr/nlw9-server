/*
  Warnings:

  - Added the required column `deleted` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "coverURL" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL
);
INSERT INTO "new_Game" ("coverURL", "id", "name") SELECT "coverURL", "id", "name" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
