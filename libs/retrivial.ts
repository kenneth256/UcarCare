import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

let retrieverInstance: any = null;

export async function getRetriever() {
  // Return cached instance if already created
  if (retrieverInstance) {
    return retrieverInstance;
  }

 
  const { docSplits } = await import("./loader");

  const vectorStore = await MemoryVectorStore.fromDocuments(
    docSplits,
    new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GOOGLE_API_KEY,
      modelName: "embedding-001",
    })
  );

  retrieverInstance = vectorStore.asRetriever();
  return retrieverInstance;
}