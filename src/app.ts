import express, { Express } from "express";
import { players, Rating, getPlayersById } from "./services/playerService";

// Initialize Express application
const app: Express = express();

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

app.get("/api/v1/players", (req, res) => {
    res.json({
        count: players.length,
        players
    })
});

app.get("/api/v1/players/:id", (req, res) => {
    const player = getPlayersById(Number(req.params.id));
    if (!player) {
        res.status(404).json({ error: "Player not found" });
        return;
    }
    res.json(player);
});

app.get("/api/v1/players/:id/rating", (req, res) => {
    const player = getPlayersById(Number(req.params.id));
    if (!player) {
        res.status(404).json({ error: "Player not found" });
        return;
    }
    res.json({ rating: Rating(player) });
});

export default app;