import { docSplits } from "./loader";
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";


const vectorStore = await MemoryVectorStore.fromDocuments(
  docSplits,
   new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_API_KEY,
    modelName: "embedding-001",
  })
);

export const retriever = vectorStore.asRetriever();