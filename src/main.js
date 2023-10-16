import './style.css'
import './prism.css'


import { basicEditor } from "prism-code-editor/setups"
import Prism from "prism-code-editor/prism-core"
import css from "./language-css"

Prism.languages.css = css

const tsvEditor = basicEditor(Prism, '.tsv-editor', {
  language: 'css',
  theme: 'prism',
  value: document.querySelector('.tsv-editor').textContent
}, _ => console.log('ready'))

console.log(tsvEditor, Prism)