import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

/**
 * MONGODB_URI가 없으면 null을 돌려준다. 로컬 개발 시 DB 없이도 페이지가 동작하도록 한다.
 * 개발 모드의 HMR로 커넥션이 늘어나지 않도록 globalThis에 캐시한다.
 */
export function getMongoClient(): Promise<MongoClient> | null {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;

  if (!globalThis._mongoClientPromise) {
    globalThis._mongoClientPromise = new MongoClient(uri).connect();
  }
  return globalThis._mongoClientPromise;
}

export const DB_NAME = process.env.MONGODB_DB ?? "linktree";
export const CLICKS_COLLECTION = "clicks";
