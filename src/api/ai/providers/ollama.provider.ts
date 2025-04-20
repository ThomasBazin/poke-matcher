import axios from 'axios';

async function POST(prompt: string): Promise<string> {
  console.log(prompt);
  const response = await axios.post(`${process.env.OLLAMA_BASE_URL}/generate`, {
    model: process.env.OLLAMA_MODEL,
    prompt: prompt,
    options: {
      num_ctx: 8192,
    },
    stream: false,
  });
  return response.data.response;
}

export const ollamaProvider = {
  POST,
};
