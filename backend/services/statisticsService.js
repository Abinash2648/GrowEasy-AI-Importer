// backend/services/statisticsService.js

const generateStatistics = (
  totalRows,
  importedRows,
  skippedRows
) => {
  return {
    totalRows,
    imported: importedRows,
    skipped: skippedRows,
    successRate:
      totalRows === 0
        ? "0%"
        : `${((importedRows / totalRows) * 100).toFixed(2)}%`,
  };
};

module.exports = {
  generateStatistics,
};