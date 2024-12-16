import { CURRENCIES, CURRENCIES_OBJ } from "@/lib/currencies";
import path from "path";
import sharp from "sharp";
import fs from "fs";

export async function GET() {
  try {
    // Directory to save flags
    const outputDir = path.join(process.cwd(), "public", "flags");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    for (const currency of CURRENCIES) {
      // Simulated flag retrieval (replace with your actual flag fetching logic)
      const flagBase64 = getFlagBase64(currency.code); // Mock function to get the flag

      if (flagBase64) {
        console.log("-------------------- buffer --------------------");
        console.log("-------------------- flagBase64 --------------------");
        console.log(flagBase64);
        const buffer = Buffer.from(flagBase64, "base64");

        // Save the flag as an image
        const outputPath = path.join(outputDir, `${currency.code}.png`);
        await sharp(buffer).toFile(outputPath);
      }
    }

    return Response.json({ message: "Flags exported successfully." });
  } catch (error) {
    console.log("-------------------- error --------------------");
    console.log(error);
    return Response.json({ message: "Flags exported successfully." }, { status: 500 });
  }
}

// Mock function to get base64-encoded flag (replace this with your actual implementation)
function getFlagBase64(code) {
  // Example: Retrieve base64 data from a database or other source
  return CURRENCIES_OBJ[code].flag; // Replace with actual logic
}
