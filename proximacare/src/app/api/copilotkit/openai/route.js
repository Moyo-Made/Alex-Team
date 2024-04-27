import { CopilotBackend, OpenAIAdapter } from "@copilotkit/backend";

export const runtime = "edge";

export async function POST(req){
  const copilotKit = new CopilotBackend();

  return copilotKit.response(req, new OpenAIAdapter());
}
