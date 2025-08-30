const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../src/environments/environment.prod.ts');

const envConfigFile = `export const environment = {
  production: true,
  apiUrl: '${process.env.API_URL || 'https://loan-management-system-backend-production-1bd1.up.railway.app/api'}',
  appName: 'Loan Management System',
  version: '1.0.0'
};
`;

fs.writeFileSync(targetPath, envConfigFile);
console.log('Environment file generated successfully.');