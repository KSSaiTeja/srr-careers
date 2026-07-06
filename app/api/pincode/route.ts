import { NextResponse } from "next/server";

export const runtime = "nodejs";

type PostalResponse = Array<{
  Status: string;
  Message?: string;
  PostOffice?: Array<{
    Name: string;
    District: string;
    State: string;
    Block?: string;
  }>;
}>;

/**
 * Proxies India Post pincode lookup so the client can auto-fill city/state
 * without CORS issues. Best-effort — the user can still edit city manually.
 */
export async function GET(request: Request) {
  const pincode = new URL(request.url).searchParams.get("pincode")?.trim() ?? "";
  if (!/^\d{6}$/.test(pincode)) {
    return NextResponse.json({ error: "Invalid pincode." }, { status: 400 });
  }

  try {
    const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: "Pincode lookup failed." },
        { status: 502 },
      );
    }

    const data = (await res.json()) as PostalResponse;
    const block = data[0];
    if (block?.Status !== "Success" || !block.PostOffice?.length) {
      return NextResponse.json(
        { error: "Pincode not found." },
        { status: 404 },
      );
    }

    const office = block.PostOffice[0]!;
    return NextResponse.json({
      pincode,
      state: office.State,
      city: office.District || office.Name,
    });
  } catch (error) {
    console.error("[pincode] lookup failed", pincode, error);
    return NextResponse.json(
      { error: "Pincode lookup failed." },
      { status: 502 },
    );
  }
}
