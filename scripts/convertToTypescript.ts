import * as fs from 'fs';
import * as path from 'path';

const jsonFilePath = path.join(__dirname, '../http/output/swagger.json');
const tsFilePath = path.join(__dirname, '../http/output/schema.ts');

fs.readFile(jsonFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading JSON file:', err);
    return;
  }

  const jsonData = JSON.parse(data);
  const tsContent = `export const openapi = ${JSON.stringify(jsonData, null, 2)} as const;`;

  fs.writeFile(tsFilePath, tsContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing TypeScript file:', err);
    } else {
      console.log('JSON content successfully copied to TypeScript file and exported.');
    }
  });
});
