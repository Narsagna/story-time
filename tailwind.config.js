/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },

  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#00AEAE",
          "secondary": "#121212",
          "accent": "#000000",
          "neutral": "#f3f4f6",
          "base-100": "#f3f4f6",  
          "info": "#00AEAE",       
          "success": "#22c55e",   
          "warning": "#00AEAE",      
          "error": "#ff0000",
          "primary-content": "#ffffff",
          "secondary-content": "#ffffff",
          "accent-content": "#ffffff",
          "neutral-content": "#ffffff",
          "base-content": "#ffffff",
          "info-content": "#ffffff",
          "success-content": "#ffffff",
          "warning-content": "#ffffff",
          "error-content": "#ffffff",
        },
      },
    ],
  },
  plugins: [require('daisyui'),],
}

