import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load `next.config.js` and `.env` files
  dir: "./",
});
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    // Handle CSS imports (if using CSS/SCSS Modules)
    "^.+\\.(css|scss|sass)$": "identity-obj-proxy",
    // Handle absolute imports and module aliases
    "^@/(.*)$": "<rootDir>/app/$1",
    "^@hooks/(.*)$": "<rootDir>/hooks/$1",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transform TypeScript files using ts-jest
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
