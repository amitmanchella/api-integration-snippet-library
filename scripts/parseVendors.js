// scripts/parseVendors.js
const fs = require('fs');
const path = require('path');

const VENDORS_DIR = path.join(__dirname, '../vendors');

function readJSONIfExists(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  } catch (e) {
    console.warn(`Failed to parse JSON at ${filePath}:`, e);
  }
  return null;
}

function readVendors() {
  const vendors = [];
  if (!fs.existsSync(VENDORS_DIR)) {
    console.error('Vendors directory not found:', VENDORS_DIR);
    return vendors;
  }
  const vendorDirs = fs.readdirSync(VENDORS_DIR).filter(f => fs.statSync(path.join(VENDORS_DIR, f)).isDirectory());
  for (const vendor of vendorDirs) {
    const vendorPath = path.join(VENDORS_DIR, vendor);
    const snippetPath = path.join(vendorPath, 'snippet.md');
    const metadataPath = path.join(vendorPath, 'metadata.json');
    if (!fs.existsSync(snippetPath)) {
      console.warn(`No snippet.md found for vendor: ${vendor}`);
      continue;
    }
    const snippetContent = fs.readFileSync(snippetPath, 'utf-8');
    let metadata = readJSONIfExists(metadataPath) || {};
    // Fallbacks if metadata.json is missing
    if (!metadata.vendorName) metadata.vendorName = vendor;
    if (!metadata.snippetPath) metadata.snippetPath = path.relative(path.join(__dirname, '..'), snippetPath);
    vendors.push({
      ...metadata,
      snippetContent,
      snippetPath: metadata.snippetPath,
    });
  }
  return vendors;
}

if (require.main === module) {
  // If run directly, print the parsed vendors
  const vendors = readVendors();
  console.log(JSON.stringify(vendors, null, 2));
}

module.exports = { readVendors }; 