import { createRetrieverTool } from "@langchain/classic/tools/retriever";
import { getRetriever } from "./retrivial";

let cachedTools: any[] | null = null;
let isInitializing = false;
let initializationPromise: Promise<any[]> | null = null;

export async function getTools() {
  if (cachedTools) {
    console.log('✅ Using cached tools');
    return cachedTools;
  }

  if (initializationPromise) {
    console.log('⏳ Waiting for ongoing initialization...');
    return initializationPromise;
  }

  console.log('🔧 Initializing tools for the first time...');
  isInitializing = true;
  
  initializationPromise = (async () => {
    try {
      const startTime = Date.now();
      
      const retriever = await getRetriever();
      console.log(`📊 Retriever loaded in ${Date.now() - startTime}ms`);
      
      const tool = createRetrieverTool(
        retriever,
        {
          name: "CarResearchTool",
          description: `
            Use the retrieved car data to answer questions thoughtfully. 
            Think step by step. If you don't know, say "I don't have enough info".
            Always cite the source of the information in your answer.`,
        },
      );
      
      cachedTools = [tool];
      console.log(`✅ Tools cached successfully (total: ${Date.now() - startTime}ms)`);
      
      return cachedTools;
    } catch (error) {
      console.error('❌ Failed to initialize tools:', error);
      cachedTools = null;
      initializationPromise = null;
      throw error;
    } finally {
      isInitializing = false;
    }
  })();

  return initializationPromise;
}

export function clearToolsCache() {
  cachedTools = null;
  initializationPromise = null;
  console.log('🗑️ Tools cache cleared');
}

export function areToolsReady() {
  return cachedTools !== null;
}