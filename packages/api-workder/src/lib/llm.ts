import { createWorkersAI } from "workers-ai-provider";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export function getWorkersAIModel(env: Env) {
  const workersai = createWorkersAI({ binding: env.AI });
  return workersai("@cf/deepseek-ai/deepseek-r1-distill-qwen-32b");
}

export function getOpenrouterModel(env: Env) {
  return createOpenRouter({
    apiKey: env.OPENROUTER_API_KEY,
    baseURL:
      "https://gateway.ai.cloudflare.com/v1/66d2df097127a28d1ac76d899b502ebe/account-gateway/openrouter",
  });
}
