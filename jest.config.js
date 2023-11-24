module.exports = {
  transform: {
    ".(ts|tsx)": "ts-jest",
    ".(scss)": "jest-transform-stub",
  },
  moduleNameMapper: {
    ".(scss)": "jest-transform-stub",
  },
  testEnvironment: "jsdom",
  testRegex: "./*\\.test\\.(ts|tsx)$",
  moduleFileExtensions: ["js", "tsx", "json"],
};
