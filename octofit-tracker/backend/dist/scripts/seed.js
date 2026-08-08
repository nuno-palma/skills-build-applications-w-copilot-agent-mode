"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            models_1.User.deleteMany({}),
            models_1.Team.deleteMany({}),
            models_1.Activity.deleteMany({}),
            models_1.Workout.deleteMany({}),
            models_1.LeaderboardEntry.deleteMany({}),
        ]);
        const users = await models_1.User.insertMany([
            {
                name: 'Maya Chen',
                email: 'maya.chen@mergington.edu',
                age: 16,
                fitnessLevel: 'advanced',
                favoriteActivity: 'running',
            },
            {
                name: 'Leo Martinez',
                email: 'leo.martinez@mergington.edu',
                age: 15,
                fitnessLevel: 'intermediate',
                favoriteActivity: 'strength',
            },
            {
                name: 'Nia Brooks',
                email: 'nia.brooks@mergington.edu',
                age: 17,
                fitnessLevel: 'beginner',
                favoriteActivity: 'walking',
            },
        ]);
        const teams = await models_1.Team.insertMany([
            {
                name: 'Storm Squad',
                school: 'Mergington High',
                captain: users[0]._id,
                members: [users[0]._id, users[1]._id],
                points: 940,
                streakDays: 12,
            },
            {
                name: 'Trail Blazers',
                school: 'Mergington High',
                captain: users[2]._id,
                members: [users[2]._id],
                points: 810,
                streakDays: 8,
            },
        ]);
        await models_1.Activity.insertMany([
            {
                user: users[0]._id,
                activityType: 'running',
                durationMinutes: 35,
                distanceKm: 5.4,
                calories: 420,
                date: new Date('2026-08-06T07:00:00.000Z'),
            },
            {
                user: users[1]._id,
                activityType: 'strength',
                durationMinutes: 45,
                calories: 360,
                date: new Date('2026-08-05T18:30:00.000Z'),
            },
            {
                user: users[2]._id,
                activityType: 'walking',
                durationMinutes: 30,
                distanceKm: 3.2,
                calories: 180,
                date: new Date('2026-08-07T06:45:00.000Z'),
            },
        ]);
        await models_1.Workout.insertMany([
            {
                title: 'Sunrise Run',
                description: 'A brisk run to build endurance.',
                focus: 'cardio',
                durationMinutes: 25,
                difficulty: 'medium',
                equipmentRequired: ['running shoes'],
            },
            {
                title: 'Core Circuit',
                description: 'A strength-focused circuit for core stability.',
                focus: 'strength',
                durationMinutes: 30,
                difficulty: 'easy',
                equipmentRequired: ['mat'],
            },
        ]);
        await models_1.LeaderboardEntry.insertMany([
            {
                user: users[0]._id,
                team: teams[0]._id,
                points: 320,
                rank: 1,
                badge: 'gold',
            },
            {
                user: users[1]._id,
                team: teams[0]._id,
                points: 290,
                rank: 2,
                badge: 'silver',
            },
            {
                user: users[2]._id,
                team: teams[1]._id,
                points: 260,
                rank: 3,
                badge: 'bronze',
            },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
