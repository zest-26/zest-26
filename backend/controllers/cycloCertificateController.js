import fs from "fs";
import csv from "csv-parser";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

// Load BIB data once at startup
const bibData = {};
fs.createReadStream("bib_data.csv")
  .pipe(csv())
  .on("data", (row) => {
    bibData[row.BIB] = row.Name;
  })
  .on("end", () => {
    console.log("✅ BIB data loaded successfully");
  });

// Controller function
export const generateCycloCertificate = async (req, res) => {
  try {
    const { BIB_ID } = req.body;

    // Check if BIB_ID exists in CSV
    const participantName = bibData[BIB_ID];
    if (!participantName) {
      return res.status(404).json({
        success: false,
        message: "Invalid BIB ID. Please enter the correct BIB.",
      });
    }

    // Load PDF template
    const templateBytes = fs.readFileSync("certificate_template.pdf");
    const pdfDoc = await PDFDocument.load(templateBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const { width, height } = firstPage.getSize();

    // Customize text — adjust x,y as needed
    firstPage.drawText(participantName, {
      x: width / 2 - font.widthOfTextAtSize(participantName, 28) / 2,
      y: height / 2 - 55, // adjust this to match your certificate design
      size: 28,
      font,
      color: rgb(0, 0, 0),
    });



    // Save PDF to memory
    const pdfBytes = await pdfDoc.save();

    // Send PDF as downloadable file and a success message
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=certificate_${BIB_ID}.pdf`
    );

    // Send file
    res.send(pdfBytes);

    // Optional: log or send success response (frontend can use loading state)
    console.log(`✅ Certificate generated for BIB: ${BIB_ID}`);
  } catch (error) {
    console.error("❌ Error generating Cyclo Certificate:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while generating certificate",
    });
  }
};
