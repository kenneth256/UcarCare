import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

let retrieverInstance: any = null;
let embeddingsInstance: GoogleGenerativeAIEmbeddings | null = null;
let initializationPromise: Promise<any> | null = null;

function getEmbeddings() {
  if (!embeddingsInstance) {
    embeddingsInstance = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GOOGLE_API_KEY,
      modelName: "text-embedding-004",
      maxRetries: 2,
      maxConcurrency: 5,
    });
  }
  return embeddingsInstance;
}

export async function getRetriever() {
  if (retrieverInstance) {
    console.log('✅ Using cached retriever');
    return retrieverInstance;
  }

  if (initializationPromise) {
    console.log('⏳ Waiting for retriever initialization...');
    return initializationPromise;
  }

  console.log('📚 Initializing retriever...');
  
  initializationPromise = (async () => {
    try {
      const startTime = Date.now();
      
      const { docSplits } = await import("./loader");
      console.log(`📄 Loaded ${docSplits.length} documents in ${Date.now() - startTime}ms`);

      const embedStart = Date.now();
      
      const limitedDocs = docSplits.slice(0, 100);
      console.log(`🔢 Creating embeddings for ${limitedDocs.length} documents...`);
      
      const vectorStore = await MemoryVectorStore.fromDocuments(
        limitedDocs,
        getEmbeddings()
      );
      console.log(`✅ Embeddings created in ${Date.now() - embedStart}ms`);

      retrieverInstance = vectorStore.asRetriever({
        k: 5,
        searchType: "similarity",
      });
      
      console.log(`✅ Retriever ready (total: ${Date.now() - startTime}ms)`);
      return retrieverInstance;
    } catch (error) {
      console.error('❌ Failed to initialize retriever:', error);
      retrieverInstance = null;
      initializationPromise = null;
      throw error;
    }
  })();

  return initializationPromise;
}

export function clearRetrieverCache() {
  retrieverInstance = null;
  embeddingsInstance = null;
  initializationPromise = null;
  console.log('🗑️ Retriever cache cleared');
}