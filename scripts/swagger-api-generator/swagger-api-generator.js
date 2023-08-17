import 'dotenv/config';
import path, { resolve } from 'path';
import pkg from 'swagger-typescript-api';
import { fileURLToPath } from 'url';

const { generateApi, generateTemplates } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SWAGGER_URL = process.env.SWAGGER_URL;
const PATH_TO_OUTPUT_DIR = resolve(process.cwd(), './src/shared/api/internal/');

generateApi({
  name: 'index.gen.ts',
  output: PATH_TO_OUTPUT_DIR,
  url: SWAGGER_URL,
  generateClient: false,
  generateUnionEnums: true,
  templates: path.resolve(__dirname, 'templates'),
});
