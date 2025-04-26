const fs = require('fs');

const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `
export const environment = {
  production: true,
  supabaseUrl: '${process.env.NG_ENV_SUPABASE_URL}',
  supabaseAnonKey: '${process.env.NG_ENV_SUPABASE_ANON_KEY}'
};
`;

fs.writeFile(targetPath, envConfigFile, (err) => {
  if (err) {
    console.error('Error writing to environment file', err);
    throw err;
  } else {
    console.log('Environment file generated successfully.');
  }
});
