 // tailwind.config.js
 module.exports = { 
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
   darkMode: "media", // or 'media' or 'class'
   theme: {
     extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #a64eee, #3c35ce)',
        'cardmovie-gradient': 'linear-gradient(to top, #ffffff, #ffffff , #ffffff, transparent)',
      }, 
      backgroundColor: {
        "btn-yellow" : "#fdae5c"
      },
      Color: {
        "hover-color" : "#c4eac8"
      }
     },
   },
   variants: {
     extend: {
      
     },
   },
   plugins: [],
 }
