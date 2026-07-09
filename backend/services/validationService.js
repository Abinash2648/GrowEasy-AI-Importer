// backend/services/validationService.js

const normalizeKey = (key) => {
  return key
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^\w]/g, "");
};

const normalizeValue = (value) => {
  if (value === null || value === undefined) return "";
  return String(value).trim();
};

const cleanRecord = (record) => {
  const cleaned = {};

  Object.keys(record).forEach((key) => {
    cleaned[normalizeKey(key)] = normalizeValue(record[key]);
  });

  return cleaned;
};

const removeEmptyRecords = (records) => {
  return records.filter((record) =>
    Object.values(record).some(
      (value) => value !== "" && value !== null && value !== undefined
    )
  );
};

const validateCSV = (records) => {
  const cleaned = records.map(cleanRecord);
  return removeEmptyRecords(cleaned);
};

module.exports = {
  validateCSV,
};