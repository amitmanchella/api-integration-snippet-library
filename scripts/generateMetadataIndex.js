// scripts/generateMetadataIndex.js
const fs = require('fs');
const path = require('path');
const { readVendors } = require('./parseVendors');

const OUTPUT_PATH = path.join(__dirname, '../metadata-index.json');

function generateMetadataIndex() {
  const vendors = readVendors();
  const metadata = {
    vendors: vendors.map(v => ({
      vendorName: v.vendorName,
      language: v.language,
      topics: v.topics,
      lastUpdated: v.lastUpdated,
      snippetPath: v.snippetPath,
    })),
    lastUpdated: new Date().toISOString().slice(0, 10),
    totalVendors: vendors.length
  };
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(metadata, null, 2));
  console.log(`metadata-index.json generated with ${vendors.length} vendors.`);
}

if (require.main === module) {
  generateMetadataIndex();
}

module.exports = { generateMetadataIndex }; 