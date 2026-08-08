"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const models_1 = require("./models");
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use(express_1.default.json());
const waitForDatabase = async () => {
    if (database_1.default.readyState === 1) {
        return;
    }
    await new Promise((resolve, reject) => {
        database_1.default.once('open', () => resolve());
        database_1.default.once('error', reject);
    });
};
app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});
app.get('/api/users', async (_req, res) => {
    const users = await models_1.User.find().lean();
    res.json(users);
});
app.get('/api/teams', async (_req, res) => {
    const teams = await models_1.Team.find().populate('captain').populate('members').lean();
    res.json(teams);
});
app.get('/api/activities', async (_req, res) => {
    const activities = await models_1.Activity.find().populate('user').lean();
    res.json(activities);
});
app.get('/api/workouts', async (_req, res) => {
    const workouts = await models_1.Workout.find().lean();
    res.json(workouts);
});
app.get('/api/leaderboard', async (_req, res) => {
    const leaderboard = await models_1.LeaderboardEntry.find().populate('user').populate('team').lean();
    res.json(leaderboard);
});
void (async () => {
    try {
        await waitForDatabase();
        app.listen(port, () => {
            console.log(`Server listening on http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend:', error);
        process.exit(1);
    }
})();
exports.default = app;
