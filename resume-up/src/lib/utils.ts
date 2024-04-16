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

  const db = await connect("mongodb+srv://sdmay2405:resumeup@resumeupcluster.c6kxlom.mongodb.net/", {
    dbName: "ResumeUp"
  })

  connection.isConnected = db.connections[0].readyState;
}