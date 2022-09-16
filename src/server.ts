// imports
import express from 'express';
import { PrismaClient } from '@prisma/client';

// configuring environment
const HOSTNAME  = process.env.HOSTNAME || 'localhost';
const PORT      = process.env.PORT || 3333;

// create Express application
const app = express();
app.use(express.json());

// connect to DB using Prisma
const prisma = new PrismaClient();

// add routes
app.get('/games', async (request, response) => {

    // fetch all games, including a count of ads for each game
    const games = await prisma.game.findMany({
        select: {
            id: true, name: true, coverURL: true, _count: { select: { ads: true } }
        }
    });

    // check if any data was returned
    if (games.length) {
        return response.status(200).json(games);
    }
    return response.status(204).json();
});

app.get('/games/:id/ads', async (request, response) => {

    // fetch all ads for a given game id, excluding the ones marked as deleted, most recent ads first
    const gameId = request.params.id;
    const ads = await prisma.ads.findMany({
        // select all fields except discordUsername due to privacy concerns
        select: {
            id: true, gameId: true, name: true, yearsPlaying: true, weekdays: true, hourStart: true, hourEnd: true, useVoiceChat: true
        },
        where: {
            gameId: gameId,
            deleted: false
        },
        orderBy: { createdAt: 'desc' }
    });

    // check if any data was returned
    if (ads.length) {
        // return the ad.weekdays comma-separated list as an array
        return response.status(200).json(ads.map(ad => {
            return {
                ...ad,
                weekdays: ad.weekdays.split(',')
            };
        }));
    }
    return response.status(204).json();
});

app.get('/ads/:id/discord', async (request, response) => {

    // fetch the discord username for a given ad
    const adId = request.params.id;
    const username = await prisma.ads.findUnique({
        select: { discordUsername: true },
        where: { id: adId }
    });

    if (username) {
        return response.status(200).json(username);
    }
    return response.status(204).json();
});

// listen for requests on specified PORT (or 3333)
app.listen(PORT, () => console.log(`[nlw9-server] Listening for connections on: http://${HOSTNAME}:${PORT}`));

// handle server shutdown signals
const gracefulShutdown = () => {
    console.log('\n[nlw9-server] Shutting down...');
    // ... shutdown DB and other services...
    process.exit(0);
};

process.on('SIGINT',    gracefulShutdown);  // interrupt
process.on('SIGTERM',   gracefulShutdown);  // terminate
