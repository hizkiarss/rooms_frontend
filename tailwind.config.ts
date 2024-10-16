import type {Config} from "tailwindcss";

const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            boxShadow: {
                custom: '0 3px 8px rgba(0, 0, 0, 0.05), 0 -3px 8px rgba(0, 0, 0, 0.05), 3px 0 8px rgba(0, 0, 0, 0.05), -3px 0 8px rgba(0, 0, 0, 0.05)',
                custom2: '0 10px 10px rgba(255, 255, 255, 0.8), 0 -10px 10px rgba(255, 255, 255, 0.8), 10px 0 10px rgba(255, 255, 255, 0.8), -20px 0 10px rgba(255, 255, 255, 0.8)',
                custom3: '0 10px 10px rgba(255, 255, 255, 0.8), 0 -10px 10px rgba(255, 255, 255, 0.8), 20px 0 10px rgba(255, 255, 255, 0.8), -10px 0 10px rgba(255, 255, 255, 0.8)',
                custom4: '0 3px 8px rgba(0, 0, 0, 0.02), 0 -3px 8px rgba(0, 0, 0, 0.02), 3px 0 8px rgba(0, 0, 0, 0.02), -3px 0 8px rgba(0, 0, 0, 0.02)',

            },
            colors: {
                placeholder: '#A3A3A3',
                greenr: "#007989",
                earth: "#F5F5DC",
                brightGray: "#F0F7F8",
                greensecondary: "#339999",
                border: "#007989",
                input: "#007989",
                ring: "#007989",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "#007989",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: {height: "0"},
                    to: {height: "var(--radix-accordion-content-height)"},
                },
                "accordion-up": {
                    from: {height: "var(--radix-accordion-content-height)"},
                    to: {height: "0"},
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
