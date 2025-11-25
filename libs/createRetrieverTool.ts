import { createRetrieverTool } from "@langchain/classic/tools/retriever";
import { getRetriever } from "./retrivial";

export async function getTools() {
  const retriever = await getRetriever();
  
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
  
  return [tool];
}