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
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        username: 'maria_smith',
        email: 'maria@example.com',
        fullName: 'Maria Smith',
        age: 29,
        profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      },
      {
        username: 'jordan_lee',
        email: 'jordan@example.com',
        fullName: 'Jordan Lee',
        age: 34,
        profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      },
      {
        username: 'samir_ahmed',
        email: 'samir@example.com',
        fullName: 'Samir Ahmed',
        age: 31,
        profilePicture: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
      },
    ]);

    await Team.insertMany([
      {
        name: 'Peak Performance',
        sport: 'Running',
        captain: users[0].username,
        members: users.slice(0, 2).map((user) => user.username),
      },
      {
        name: 'Storm Riders',
        sport: 'Cycling',
        captain: users[1].username,
        members: [users[1].username, users[2].username],
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0].id,
        type: 'run',
        durationMinutes: 45,
        distanceKm: 7.8,
        calories: 540,
        notes: 'Morning interval training',
      },
      {
        userId: users[1].id,
        type: 'cycling',
        durationMinutes: 60,
        distanceKm: 24,
        calories: 680,
        notes: 'Hill repeats',
      },
      {
        userId: users[2].id,
        type: 'strength',
        durationMinutes: 35,
        calories: 320,
        notes: 'Upper body focus',
      },
    ]);

    await LeaderboardEntry.insertMany([
      { username: users[0].username, score: 1280, rank: 1, streak: 5 },
      { username: users[1].username, score: 1210, rank: 2, streak: 3 },
      { username: users[2].username, score: 1175, rank: 3, streak: 2 },
    ]);

    await Workout.insertMany([
      {
        title: 'Tempo Run',
        category: 'cardio',
        durationMinutes: 30,
        difficulty: 'intermediate',
        trainer: 'Nina',
        focus: 'endurance',
      },
      {
        title: 'Core Blast',
        category: 'strength',
        durationMinutes: 25,
        difficulty: 'beginner',
        trainer: 'Luis',
        focus: 'stability',
      },
      {
        title: 'Power Cycle',
        category: 'cycling',
        durationMinutes: 40,
        difficulty: 'advanced',
        trainer: 'Tara',
        focus: 'power',
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
