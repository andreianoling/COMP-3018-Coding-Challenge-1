import express, { Express } from "express";

// Initialize Express application
const app: Express = express();

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});



export default app;

app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

import { players, Rating } from "./services/playerService";

app.get("/api/v1/players", (req, res) => {
    res.json(players);
});

app.get("/api/v1/players/:id", (req, res) => {
    res.json(players.id)
});

app.get("/api/v1/players/:id/rating", (req, res) => {
    res.json(Rating(players.id))
});