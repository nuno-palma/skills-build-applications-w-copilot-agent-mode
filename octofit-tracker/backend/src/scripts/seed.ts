import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Workout.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
    ]);

    const users = await User.insertMany([
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

    const teams = await Team.insertMany([
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

    await Activity.insertMany([
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

    await Workout.insertMany([
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

    await LeaderboardEntry.insertMany([
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
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
