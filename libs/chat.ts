"use server";

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { tools } from "@/libs/createRetrieverTool";

export async function generateQueryOrRespond(state: { messages: any[] }) {
  const { messages } = state;

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GOOGLE_API_KEY,
    temperature: 0.7,
  }).bindTools(tools);

  const response = await model.invoke(messages);

  return {
    messages: [response],
  };
}
