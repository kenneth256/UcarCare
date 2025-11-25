import { generateQueryOrRespond } from "@/libs/chat";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || !body.messages) {
      return NextResponse.json(
        { error: "Invalid request. Missing messages array." },
        { status: 400 }
      );
    }

    // Runtime call to LangChain / OpenAI
    const result = await generateQueryOrRespond({ messages: body.messages });

    const ai = result.messages?.[0];
    const text =
      typeof ai.content === "string"
        ? ai.content
        : Array.isArray(ai.content)
        ? ai.content.map((piece: any) => piece.text ?? "").join("")
        : "";

    return NextResponse.json({
      messages: [{ role: "assistant", content: text }],
    });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json({ error: "Failed to process chat" }, { status: 500 });
  }
}
