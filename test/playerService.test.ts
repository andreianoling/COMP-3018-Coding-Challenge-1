import request from "supertest";
// import supertest request object
 
import { Response } from "supertest";
// import supertest Response type
 
import app from "../src/app";

import { Player, players, Rating, getPlayersById } from "../src/services/playerService";
// import express application and server
 
describe("GET /", () => {
    it("should return Hello, world!", async () => {
        // create GET request to root endpoint
        const response: Response = await request(app).get("/");
 
        // assert that response status is OK, response text is "Hello, world!"
        expect(response.status).toBe(200);
        expect(response.text).toBe("Hello, World!");
    });
});


describe("GET /api/v1/health", () => {
    it("should return server health status", async () => {
        const response: Response = await request(app).get("/api/v1/health");
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("OK");
        expect(response.body).toHaveProperty("uptime");
        expect(response.body).toHaveProperty("timestamp");
        expect(response.body).toHaveProperty("version");
    });
});

describe("Tests for rating", () => {
    test("rating gets calculated correctly", () => {
        const player: Player = {id: 1, name: "ShadowStrike", wins: 15, losses: 5, totalScore: 28500}
        const result = Rating(player)

        expect(result).toBe(1500);
    });

    test("player with zero game return 0", () => {
        const player: Player = {id: 3, name: "ProGamer99", wins: 0, losses: 0, totalScore: 0}
        const result = Rating(player)

        expect(result).toBe(0)
    });

    test ("rating gets rounded to 2 decimal places", () => {
        const player: Player = {id: 2, name: "NoobMaster", wins: 3, losses: 12, totalScore: 4299}
        const result = Rating(player)

        // Check that result has at most 2 decimal places
        const decimalPlaces = (result.toString().split('.')[1] || '').length;
        expect(decimalPlaces).toBeLessThanOrEqual(2);
    });
});

describe("Tests for Player lookup", () => {
    test ("test for players", () => {
        const player = getPlayersById(1);

        expect(player?.name).toBe("ShadowStrike");
    });

    test ("test for undefined player", () => {
        const player = getPlayersById(45); 
        expect(player).toBeUndefined();
    });
});

