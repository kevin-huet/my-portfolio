export default {
  rootDir: ".",
  testMatch: ["**/*.spec.ts", "**/*.test.ts"], // Ajoute **/tests/**/*.test.ts si besoin
  moduleFileExtensions: ["js", "json", "ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  collectCoverageFrom: ["src/**/*.(t|j)s"],
  testEnvironment: "node",
};
