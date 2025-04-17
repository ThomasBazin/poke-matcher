import axios from 'axios';

export async function getAIResponse(prompt: string): Promise<string | null> {
  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'deepseek-r1:1.5b',
      prompt: prompt,
      options: {
        num_ctx: 4096,
      },
      stream: false,
    });
    return response.data.response;
  } catch (error) {
    console.error(error);
    return null;
  }
}
