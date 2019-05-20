import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as debug from 'debug';

const logger = debug('app:src/app/core/Env.ts');

/**
 * Load environment variables from .env/.env.local files
 */
export class Env {
  public static loadEnvSettings(): void {
    dotenv.config({ path: '.env' });

    // if file `.env.local` => override config from `.env` base configuration file
    try {
      const prodEnvConfig = dotenv.parse(fs.readFileSync('.env.local'));
      for (const envSetting in prodEnvConfig) {
        process.env[envSetting] = prodEnvConfig[envSetting];
      }
    } catch (err) {
      logger(err);
      throw new Error(err);
    }
  }
}
