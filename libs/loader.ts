import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const urls = [
  "https://www.cars.com/research/",
  "https://www.kbb.com/",
  "https://www.edmunds.com/research/",
    "https://www.autotrader.com/car-research",
];

const docs = await Promise.all(
  urls.map((url) => new CheerioWebBaseLoader(url).load()),
);

const docsList = docs.flat();

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 50,
});
export const docSplits = await textSplitter.splitDocuments(docsList);