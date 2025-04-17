import axios from 'axios';

export async function getAIResponse(prompt: string): Promise<string | null> {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_OLLAMA_BASE_URL}/generate`,
      {
        model: process.env.NEXT_PUBLIC_OLLAMA_MODEL,
        prompt: prompt,
        options: {
          num_ctx: 4096,
        },
        stream: false,
      }
    );
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
}
