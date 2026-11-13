import { NextResponse } from "next/server";
import { links } from "@/data/profile";
import { CLICKS_COLLECTION, DB_NAME, getMongoClient } from "@/lib/mongodb";

type ClickDoc = { _id: string; count: number; lastClickedAt?: Date };

const knownIds = new Set(links.map((l) => l.id));

export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }
  if (typeof id !== "string" || !knownIds.has(id)) {
    return NextResponse.json({ error: "unknown link id" }, { status: 400 });
  }

  const clientPromise = getMongoClient();
  if (!clientPromise) {
    // DB 미설정: 집계는 건너뛰되 클라이언트에는 성공으로 응답
    return new Response(null, { status: 204 });
  }

  try {
    const client = await clientPromise;
    await client
      .db(DB_NAME)
      .collection<ClickDoc>(CLICKS_COLLECTION)
      .updateOne(
        { _id: id },
        { $inc: { count: 1 }, $set: { lastClickedAt: new Date() } },
        { upsert: true },
      );
    return new Response(null, { status: 204 });
  } catch (err) {
    console.error("[clicks] failed to record click", err);
    return NextResponse.json({ error: "db error" }, { status: 500 });
  }
}

export async function GET() {
  const clientPromise = getMongoClient();
  if (!clientPromise) {
    return NextResponse.json({ counts: {}, note: "MONGODB_URI not set" });
  }
  try {
    const client = await clientPromise;
    const docs = await client
      .db(DB_NAME)
      .collection<ClickDoc>(CLICKS_COLLECTION)
      .find({})
      .toArray();
    const counts = Object.fromEntries(docs.map((d) => [d._id, d.count]));
    return NextResponse.json({ counts });
  } catch (err) {
    console.error("[clicks] failed to read counts", err);
    return NextResponse.json({ error: "db error" }, { status: 500 });
  }
}
