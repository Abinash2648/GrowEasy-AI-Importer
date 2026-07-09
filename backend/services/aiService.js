const model = require("../config/gemini");
const { buildPrompt } = require("../prompts/crmPrompt");

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const cleanJSON = (text) => {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
};

const processBatch = async (batch, retry = 2) => {
  try {
    console.log("Calling Gemini...");

    const prompt = buildPrompt(batch);

    const result = await model.generateContent(prompt);

    console.log("Gemini responded");

    const response = await result.response;

    const text = response.text();

    console.log("Gemini Raw Response:");
    console.log(text);

    return JSON.parse(cleanJSON(text)).records || [];

  } catch (err) {

    console.log("========== GEMINI ERROR ==========");
    console.error(err);
    console.log("=================================");

    if (retry > 0) {
      console.log("Retrying...");
      await sleep(2000);
      return processBatch(batch, retry - 1);
    }

    return [];
  }
};

const processWithAI = async (batches) => {
  let records = [];

  for (let i = 0; i < batches.length; i++) {
    console.log(`Processing Batch ${i + 1}/${batches.length}`);

    const result = await processBatch(batches[i]);

    records.push(...result);
  }

  return records;
};

module.exports = {
  processWithAI,
};