import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  const { searchParams } = new URL(req.url, "http://localhost:3000");
  const query = searchParams.get("query");

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${process.env.GOOGLE_MAP_API_KEY}`
    );

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json({ data: data.results });
    } else {
      console.error("Error fetching places:", response.status);
      return NextResponse.json({ data: {} });
    }
  } catch (error) {
    console.error("Error fetching places:", error);
    return NextResponse.json({ data: {} });
  }
}
