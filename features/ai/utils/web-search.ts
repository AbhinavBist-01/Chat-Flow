import { openai } from "@ai-sdk/openai";

/**
 * Native OpenAI Web Search tool for Vercel AI SDK.
 * Configured with high search context size for detailed retrieval.
 */
export const webSearchTool = openai.tools.webSearch({
  searchContextSize: "high",
});
