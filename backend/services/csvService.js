const Papa = require("papaparse");

const parseCSV = (csvText) => {
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  return result.data;
};

const splitIntoBatches = (records, batchSize = 25) => {
  const batches = [];

  for (let i = 0; i < records.length; i += batchSize) {
    batches.push(records.slice(i, i + batchSize));
  }

  return batches;
};

module.exports = {
  parseCSV,
  splitIntoBatches,
};