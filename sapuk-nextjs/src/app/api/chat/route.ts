import {
  streamText,
  smoothStream,
  ModelMessage,
  convertToModelMessages,
  type UIMessage,
} from "ai";
import { openai } from "@ai-sdk/openai";
import { initialMessage } from "@/lib/ai/system-prompt";

type Body = { messages: unknown };

export async function POST(req: Request) {
  const body: Body = await req.json().catch(() => ({} as Body));

  if (!body || !Array.isArray(body.messages)) {
    return new Response("Invalid request: expected { messages: [...] }", {
      status: 400,
    });
  }

  const rawMessages = body.messages;

  // Detect UIMessage vs ModelMessage:
  // UIMessage (from the React helpers) typically has .parts: [{ type: "text", text: "..." }, ...]
  const looksLikeUIMessage = (m: any): m is UIMessage =>
    !!m && typeof m === "object" && Array.isArray(m.parts);

  let modelMessages: ModelMessage[];

  try {
    if (rawMessages.length > 0 && looksLikeUIMessage(rawMessages[0])) {
      // Convert UIMessage[] -> ModelMessage[]
      modelMessages = convertToModelMessages(rawMessages as UIMessage[]);
    } else {
      // Assume it's already ModelMessage[] - do a soft cast
      modelMessages = rawMessages as ModelMessage[];
    }
  } catch (err) {
    console.error("Failed to convert messages:", err, { rawMessages });
    return new Response("Failed to parse/convert messages", { status: 400 });
  }

  try {
    const result = streamText({
      // if you still have provider-type issues, use a temporary cast:
      model: openai("gpt-3.5-turbo") as unknown as any,
      system: initialMessage.content,
      messages: modelMessages,
      experimental_transform: smoothStream(),
    });

    return result.toTextStreamResponse();
  } catch (err) {
    console.error("streamText error:", err);
    return new Response("Internal server error", { status: 500 });
  }
}
