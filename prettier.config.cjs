/** @type {import("prettier").Config} */
const config = {
  plugins: [
    require.resolve("prettier-plugin-astro"),
    require.resolve("@trivago/prettier-plugin-sort-imports"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
  // Astro parser
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  // Import sorting
  importOrder: ["^@/(.css)$", "^react/(.*)$", "^@/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  // Tailwind
  tailwindAttributes: ["class", "className", "classes"],
  tailwindFunctions: ["cn", "clsx", "twMerge"],
  tailwindConfig: "./tailwind.config.cjs",
};

module.exports = config;
