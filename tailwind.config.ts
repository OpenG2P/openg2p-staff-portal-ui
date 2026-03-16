import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/commons/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            // Design System Colors
            colors: {
                // Add your design system colors here
                // primary: { ... },
                // secondary: { ... },
                // success: { ... },
                // warning: { ... },
                // error: { ... },
                // neutral: { ... },
            },
        },
    },
    plugins: [
        // Add Tailwind plugins here as needed
        // require('@tailwindcss/forms'),
        // require('@tailwindcss/typography'),
    ],
};

export default config;

