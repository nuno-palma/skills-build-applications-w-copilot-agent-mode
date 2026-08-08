"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardEntry = exports.Workout = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, required: true, min: 12 },
    fitnessLevel: {
        type: String,
        required: true,
        enum: ['beginner', 'intermediate', 'advanced'],
    },
    favoriteActivity: { type: String, required: true, trim: true },
}, { timestamps: true });
exports.User = mongoose_1.default.model('User', userSchema);
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    school: { type: String, required: true, trim: true },
    captain: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    points: { type: Number, default: 0 },
    streakDays: { type: Number, default: 0 },
}, { timestamps: true });
exports.Team = mongoose_1.default.model('Team', teamSchema);
const activitySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: {
        type: String,
        required: true,
        enum: ['running', 'walking', 'strength', 'cycling'],
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    calories: { type: Number, required: true, min: 0 },
    date: { type: Date, default: Date.now },
}, { timestamps: true });
exports.Activity = mongoose_1.default.model('Activity', activitySchema);
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 10 },
    difficulty: {
        type: String,
        required: true,
        enum: ['easy', 'medium', 'hard'],
    },
    equipmentRequired: [{ type: String, trim: true }],
}, { timestamps: true });
exports.Workout = mongoose_1.default.model('Workout', workoutSchema);
const leaderboardSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    badge: { type: String, required: true, trim: true },
}, { timestamps: true });
exports.LeaderboardEntry = mongoose_1.default.model('Leaderboard', leaderboardSchema);
