import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  age: number;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  favoriteActivity: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, required: true, min: 12 },
    fitnessLevel: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    favoriteActivity: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const User = mongoose.model<IUser>('User', userSchema);

export interface ITeam extends Document {
  name: string;
  school: string;
  captain: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  points: number;
  streakDays: number;
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, trim: true },
    school: { type: String, required: true, trim: true },
    captain: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    points: { type: Number, default: 0 },
    streakDays: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Team = mongoose.model<ITeam>('Team', teamSchema);

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId;
  activityType: 'running' | 'walking' | 'strength' | 'cycling';
  durationMinutes: number;
  distanceKm?: number;
  calories: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activityType: {
      type: String,
      required: true,
      enum: ['running', 'walking', 'strength', 'cycling'],
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    calories: { type: Number, required: true, min: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);

export interface IWorkout extends Document {
  title: string;
  description: string;
  focus: string;
  durationMinutes: number;
  difficulty: 'easy' | 'medium' | 'hard';
  equipmentRequired: string[];
  createdAt: Date;
  updatedAt: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
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
  },
  { timestamps: true },
);

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);

export interface ILeaderboardEntry extends Document {
  user: mongoose.Types.ObjectId;
  team: mongoose.Types.ObjectId;
  points: number;
  rank: number;
  badge: string;
  createdAt: Date;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    badge: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const LeaderboardEntry = mongoose.model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
