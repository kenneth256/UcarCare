"use server";

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { getTools } from "./createRetrieverTool";

export async function generateQueryOrRespond(state: { messages: any[] }) {
  const startTime = Date.now();
  
  try {
    const { messages } = state;

    const toolsStart = Date.now();
    const tools = await getTools();
    console.log(`✅ Tools ready in ${Date.now() - toolsStart}ms`);

    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash-exp",
      apiKey: process.env.GOOGLE_API_KEY,
      temperature: 0.7,
      maxRetries: 1,
      maxOutputTokens: 2048,
    }).bindTools(tools);

    console.log('🤖 Invoking model...');
    const invokeStart = Date.now();
    
    const recentMessages = messages.slice(-10);
    const response = await model.invoke(recentMessages);
    
    console.log(`✅ Model responded in ${Date.now() - invokeStart}ms`);
    console.log(`📊 Total time: ${Date.now() - startTime}ms`);

    return {
      messages: [response],
    };
  } catch (error: any) {
    const duration = Date.now() - startTime;
    console.error(`❌ Error after ${duration}ms:`, error.message);
    
    if (error.message?.includes('timeout') || duration > 50000) {
      throw new Error('Request timeout. Please try again with a shorter message.');
    }
    
    throw new Error(`Chat failed: ${error.message}`);
  }
}