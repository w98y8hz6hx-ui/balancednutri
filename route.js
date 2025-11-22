import { NextResponse } from "next/server";
import { get, set } from "@vercel/edge-config";

export async function GET() {
    try {
        // Read current count
        let count = await get("visitorCount");
        if (!count) count = 150;

        // increment
        const newCount = count + 1;

        // Save back to Edge Config
        await set("visitorCount", newCount);

        return NextResponse.json({ success: true, count: newCount });
    } catch (err) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
