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
  const mongoUri =
    process.env.MONGO_URI ||
    process.env.MONGODB_URI ||
    'mongodb://inforesearchradar_db_user:ZAzojNdZLphOebpY@ac-6teztuy-shard-00-00.co4xykt.mongodb.net:27017,ac-6teztuy-shard-00-01.co4xykt.mongodb.net:27017,ac-6teztuy-shard-00-02.co4xykt.mongodb.net:27017/?ssl=true&replicaSet=atlas-vy5z3j-shard-0&authSource=admin&appName=Cluster0';

  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    console.log('🔄 [MongoDB] Initializing database connection...');
    cached!.promise = mongoose
      .connect(mongoUri, {
        serverSelectionTimeoutMS: 3000,
        connectTimeoutMS: 3000,
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
