import colors from 'tailwindcss/colors'
import defaultConfig from "tailwindcss/defaultConfig";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  theme: {
		screens: {
			'xs': '400px',
			...defaultConfig.theme.screens
		},
    extend: {
			colors: {
        ui: {
          fg: 'hsl(var(--ui-theme-foreground) / <alpha-value>)',
          bg: 'hsl(var(--ui-theme-background) / <alpha-value>)',
          bd: 'hsl(var(--ui-theme-border) / <alpha-value>)',
        },
				almost : {
					white: "#dedede",
					black: "#202122"
				},
				brand: {
					yellow: '#f8d608',
					purplish: '#171936',
					purple: '#3d4396',
					bride: '#f6ebdd'
				},
				gray: colors.neutral
			}
    },
  },
  plugins: [],
}

