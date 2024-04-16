import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { connect } from "mongoose";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const connection: { isConnected?: number } = {}

export async function dbConnection() {
  if(connection.isConnected) {
    return;
  }

  // const connection 
  const db = await connect(`${process.env.MONGO}`, {
    dbName: "ResumeUp"
  })

  connection.isConnected = db.connections[0].readyState;
}