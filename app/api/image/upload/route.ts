import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file || file.size === 0) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const cdnApi = `${process.env.CDN_URL}?key=${process.env.CDN_KEY}`;

    const cdnFormData = new FormData();
    cdnFormData.append("image", file);

    const res = await fetch(cdnApi, {
      method: "POST",
      body: cdnFormData,
    });

    if (!res.ok) {
      return NextResponse.json({ error: "CDN upload failed" }, { status: 502 });
    }

    const imgBBResponse: ImgBBMetadata = await res.json();

    return NextResponse.json({
      url: imgBBResponse.data.image?.url ?? "",
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
