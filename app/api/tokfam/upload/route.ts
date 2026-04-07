import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SLOT_FILE_MAP: Record<string, string> = {
  birthday: "miari-01-birthday.jpg",
  outfit: "miari-02-outfit.jpg",
  "family-hug": "miari-03-family-hug.jpg",
  playtime: "miari-04-playtime.jpg",
  naptime: "miari-05-naptime.jpg",
  highlight: "miari-06-highlight.jpg",
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const slot = String(formData.get("slot") || "");
    const uploadedFile = formData.get("file");
    const providedKey = String(formData.get("key") || "").trim();

    const expectedKey = process.env.TOKFAM_ADMIN_KEY?.trim();
    if (expectedKey && providedKey !== expectedKey) {
      return NextResponse.json({ error: "Invalid admin key." }, { status: 401 });
    }

    const fileName = SLOT_FILE_MAP[slot];
    if (!fileName) {
      return NextResponse.json({ error: "Invalid gallery slot." }, { status: 400 });
    }

    if (!(uploadedFile instanceof File)) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    if (!uploadedFile.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image." }, { status: 400 });
    }

    if (uploadedFile.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "Image must be 10MB or smaller." }, { status: 400 });
    }

    const targetDirectory = path.join(process.cwd(), "public", "tokfam");
    await mkdir(targetDirectory, { recursive: true });

    const byteArray = await uploadedFile.arrayBuffer();
    const fileBuffer = Buffer.from(byteArray);
    const targetPath = path.join(targetDirectory, fileName);

    await writeFile(targetPath, fileBuffer);

    return NextResponse.json({
      message: "Upload successful.",
      path: `/tokfam/${fileName}`,
    });
  } catch (error) {
    console.error("TokFam upload failed:", error);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
