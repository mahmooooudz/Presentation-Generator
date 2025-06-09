import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import pdf from "pdf-parse";

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const textContent = formData.get("textContent") as string;
    const theme = formData.get("theme") as string;

    let content = "";

    // Extract content from file if provided
    if (file) {
      const buffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(buffer);

      if (file.type === "application/pdf") {
        const pdfData = await pdf(uint8Array);
        content = pdfData.text;
      } else {
        // For text files
        content = new TextDecoder().decode(uint8Array);
      }
    }

    // Add text content if provided
    if (textContent.trim()) {
      content += "\n\n" + textContent;
    }

    if (!content.trim()) {
      return NextResponse.json(
        { error: "No content provided" },
        { status: 400 }
      );
    }

    // Generate presentation using Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are an expert presentation creator. Convert the following content into a well-structured Markdown presentation suitable for tools like Marp or reveal.js.

Theme: ${theme}

Guidelines:
1. Create a title slide with a compelling title
2. Break content into logical sections with clear headings
3. Use bullet points for key information
4. Include relevant quotes or important statements as blockquotes
5. Add speaker notes where helpful
6. Keep slides concise and visually appealing
7. Use appropriate Markdown formatting

Content to convert:
${content}

Please create a complete presentation in Markdown format:
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const slides = response.text();

    return NextResponse.json({ slides });
  } catch (error) {
    console.error("Error generating presentation:", error);
    return NextResponse.json(
      { error: "Failed to generate presentation" },
      { status: 500 }
    );
  }
}