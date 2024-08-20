import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function processVoiceCommand(audioFile: File) {
  console.log("Starting transcription");
  const transcription = await openai.audio.transcriptions.create({
    file: audioFile,
    model: "whisper-1",
    response_format: "json",
  });

  console.log("Transcription result:", transcription.text);

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "Extract the task title and duration from the following text. Respond with a JSON object containing 'title' and 'duration' (in minutes) properties.",
      },
      { role: "user", content: transcription.text },
    ],
    max_tokens: 60,
  });

  const result = JSON.parse(completion.choices[0].message.content || "{}");

  console.log("Parsed result:", result);

  return {
    title: result.title || "",
    duration: result.duration || 0,
  };
}
