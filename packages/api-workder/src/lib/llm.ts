import { createWorkersAI } from "workers-ai-provider";

// export function getHunyuanModel(env: Env) {
//   console.log(env);
//   return createOpenAI({
//     apiKey: env["HUNYUAN_LITE_APP_KEY"], // 混元 APIKey
//     baseURL: env["HUNYUAN_LITE_BASE_URL"], // 混元 endpoint
//   }).chat("hunyuan-lite");
// }

export function getWorkersAIModel(env: Env) {
  const workersai = createWorkersAI({ binding: env.AI });
  return workersai("@cf/deepseek-ai/deepseek-r1-distill-qwen-32b");
}
