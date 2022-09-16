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

    const games = await prisma.game.findMany({
        select: {
            id: true, name: true, coverURL: true, _count: { select: { ads: true } }
        }
    });

    if (games.length) {
        return response.status(200).json(games);
    }
    return response.status(204).json();
});

app.get('/games/:id/ads', async (request, response) => {

    // extract params and make DB query
    const gameId = request.params.id;
    const ads = await prisma.ads.findMany({
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
        // return ad.weekdays comma-separated list as an array
        return response.status(200).json(ads.map(ad => {
            return {
                ...ad,
                weekdays: ad.weekdays.split(',')
            };
        }));
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
