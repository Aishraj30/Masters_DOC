import mongoose from 'mongoose';

interface GlobalMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: GlobalMongoose | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export async function connectToDatabase() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error('❌ [MongoDB Error] MONGO_URI is missing in environment variables (.env)');
    throw new Error('MONGO_URI is missing in .env file');
  }

  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    console.log('🔄 [MongoDB] Initializing database connection...');
    cached!.promise = mongoose
      .connect(mongoUri, {
        serverSelectionTimeoutMS: 10000,
        tls: true,
        tlsAllowInvalidCertificates: true,
      })
      .then((mongooseInstance) => {
        console.log('✅ [MongoDB] Database connected successfully!');
        return mongooseInstance;
      })
      .catch((err) => {
        console.error('❌ [MongoDB Connection Error]:', err.message);
        cached!.promise = null;
        throw err;
      });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}
