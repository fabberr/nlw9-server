import express from 'express';

// configuring environment
const HOSTNAME  = process.env.HOSTNAME || 'localhost';
const PORT      = process.env.PORT || 3333;

// create Express application
const app = express();
app.use(express.json());

// add routes
app.get('/', (request: any, response: any) => {
    return response.json('iwtcits');
});

// listen for requests on specified PORT (or 3333)
app.listen(PORT, () => console.log(`[nlw9-server] Listening for connections on http://${HOSTNAME}:${PORT}\n`));

// handle server shutdown signals
const gracefulShutdown = () => {
    console.log('[nlw9-server] Shutting down...\n');
    // ... shutdown DB and other services...
    process.exit(0);
};

process.on('SIGINT',    gracefulShutdown);  // interrupt
process.on('SIGTERM',   gracefulShutdown);  // terminate
