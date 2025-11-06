// /api/generate.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { topic } = req.body;
  if (!topic) return res.status(400).json({ error: "Topic is required" });

  const HF_TOKEN = process.env.HF_TOKEN; // Tu token guardado como variable de entorno
  const MODEL = "google/flan-t5-small";

  try {
    const response = await fetch(`https://api-inference.huggingface.co/models/${MODEL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: `Generate 5 catchy YouTube titles for the topic: ${topic}`,
        parameters: { max_new_tokens: 50, num_return_sequences: 5 }
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error generating titles" });
  }
}
