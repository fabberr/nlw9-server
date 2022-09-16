-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ads" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gameId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "yearsPlaying" INTEGER NOT NULL DEFAULT 0,
    "discordUsername" TEXT NOT NULL,
    "weekdays" TEXT NOT NULL,
    "hourStart" INTEGER NOT NULL,
    "hourEnd" INTEGER NOT NULL,
    "useVoiceChat" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Ads_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ads" ("createdAt", "deleted", "discordUsername", "gameId", "hourEnd", "hourStart", "id", "name", "useVoiceChat", "weekdays", "yearsPlaying") SELECT "createdAt", "deleted", "discordUsername", "gameId", "hourEnd", "hourStart", "id", "name", "useVoiceChat", "weekdays", "yearsPlaying" FROM "Ads";
DROP TABLE "Ads";
ALTER TABLE "new_Ads" RENAME TO "Ads";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
