/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: { extend: {
    colors: {
      navy:{50:'#f0f4f8',100:'#d9e2ec',200:'#bcccdc',300:'#9fb3c8',400:'#829ab1',500:'#627d98',600:'#486581',700:'#334e68',800:'#243b53',900:'#102a43'},
      gold:{50:'#fffbea',100:'#fff3c4',200:'#fce588',300:'#fadb5f',400:'#f7c948',500:'#f0b429',600:'#de911d',700:'#cb6e17'},
      'pale-green':{50:'#effcf6',100:'#c6f7e2',200:'#8eedc7',300:'#65d6ad',400:'#3ebd93',500:'#27ab83',600:'#199473',700:'#147d64'},
      charcoal:'#1f2933', offwhite:'#f8f9fa'
    },
    fontFamily:{ sans:['Inter','system-ui','sans-serif'], mono:['JetBrains Mono','monospace'] }
  }},
  plugins: [],
}
