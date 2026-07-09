const { parseCSV, splitIntoBatches } = require("../services/csvService");
const { validateCSV } = require("../services/validationService");
const { generateStatistics } = require("../services/statisticsService");
const { removeDuplicates } = require("../services/duplicateService");
const {
  readCSVFile,
  deleteUploadedFile,
} = require("../utils/helpers");
const { processWithAI } = require("../services/aiService");

const uploadCSV = async (req, res) => {
  let filePath = "";

  try {
    // Check uploaded file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No CSV file uploaded.",
      });
    }

    filePath = req.file.path;

    // Read CSV file
    const csvText = readCSVFile(filePath);

    // Parse CSV
    const parsedRecords = parseCSV(csvText);

    // Validate & Normalize
    const cleanedRecords = validateCSV(parsedRecords);

    // Count rows
    const totalRows = cleanedRecords.length;

    // Split into batches
    const batches = splitIntoBatches(cleanedRecords, 25);

    console.log(`Total Rows : ${totalRows}`);
    console.log(`Total Batches : ${batches.length}`);

    // Process using Gemini
    const crmRecords = await processWithAI(batches);

    // Remove duplicate records
    const {
      uniqueRecords,
      duplicates,
    } = removeDuplicates(crmRecords);

    // Statistics
    const imported = uniqueRecords.length;
    const skipped = totalRows - imported;

    const statistics = generateStatistics(
      totalRows,
      imported,
      skipped
    );

    // Delete uploaded CSV
    deleteUploadedFile(filePath);

    // Response
    return res.status(200).json({
      success: true,
      message: "CSV processed successfully.",
      statistics,
      data: uniqueRecords,
      duplicates,
    });

  } catch (error) {

    console.error(error);

    if (filePath) {
      deleteUploadedFile(filePath);
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });

  }
};

module.exports = {
  uploadCSV,
};