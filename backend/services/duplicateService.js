const removeDuplicates = (records) => {
  const seen = new Set();

  const uniqueRecords = [];
  const duplicates = [];

  records.forEach((record, index) => {
    const email = (record.email || "").trim().toLowerCase();
    const mobile = (
      record.country_code +
      record.mobile_without_country_code
    )
      .trim()
      .toLowerCase();

    const key = email || mobile;

    if (!key) {
      uniqueRecords.push(record);
      return;
    }

    if (seen.has(key)) {
      duplicates.push({
        row: index + 1,
        reason: "Duplicate Record",
        record,
      });
    } else {
      seen.add(key);
      uniqueRecords.push(record);
    }
  });

  return {
    uniqueRecords,
    duplicates,
  };
};

module.exports = {
  removeDuplicates,
};