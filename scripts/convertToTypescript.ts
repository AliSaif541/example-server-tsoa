import * as fs from 'fs';
import * as path from 'path';

// Replace these with your actual file paths
const jsonFilePath = path.join(__dirname, '../http/output/swagger.json');
const tsFilePath = path.join(__dirname, '../http/output/schema.ts');

// Read JSON file content
fs.readFile(jsonFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading JSON file:', err);
    return;
  }

  // Create the TypeScript file content
  const tsContent = `const data = ${data};\nexport default data;`;

  // Write to the TypeScript file
  fs.writeFile(tsFilePath, tsContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing TypeScript file:', err);
    } else {
      console.log('JSON content successfully copied to TypeScript file and exported.');
    }
  });
});
