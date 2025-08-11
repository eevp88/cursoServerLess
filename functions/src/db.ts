// src/config/db.ts
import mongoose, {Connection} from "mongoose";
// import {config} from "firebase-functions";

let cachedConn: Connection | null = null;

export const conectarDB = async (): Promise<Connection> => {
  if (cachedConn) {
    console.log("Usando conexión de caché");
    return cachedConn;
  }

  const username = process.env.MONGO_USER;
  const password = process.env.MONGO_PASSWORD;
  const cluster = process.env.MONGO_CLUSTER;
  console.log(username, password, cluster);
  if (!username || !password || !cluster) {
    throw new Error("Faltan las variables de entorno");
  }

  const MONGODB_URI = `mongodb+srv://${username}:${password}@${cluster}/?retryWrites=true&w=majority&appName=Cluster0`;

  try {
    cachedConn = await mongoose.createConnection(MONGODB_URI).asPromise();
    console.log("✅ Conectado a MongoDB");
    return cachedConn;
  } catch (_error) {
    console.error("❌ Error conectando a MongoDB:", _error);
    throw _error; // Lanza el error en vez de terminar el procesol proceso
  }
};
