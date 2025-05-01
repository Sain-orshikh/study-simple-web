import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable no-explicit-any to allow using 'any' type
      "@typescript-eslint/no-explicit-any": "off",
      // Disable unused vars error
      "@typescript-eslint/no-unused-vars": "off",
      // Disable require-style imports error
      "@typescript-eslint/no-require-imports": "off",
      // Disable unescaped entities warning
      "react/no-unescaped-entities": "off"
    },
  }
];

export default eslintConfig;
