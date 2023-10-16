import '../css/style.css'
import '../css/prism.css'

import { basicEditor } from "prism-code-editor/setups"
import Prism from "prism-code-editor/prism-core"
import css from "./language-css"

const TEST_STRINGS = {
tsv: `column_1	column_2	space in column	UPPERCASE
value c_1	value c_2	value cws_3	VALUE C_4
`,
tpl: `-Paragraph: {{ column_1 }}<Character> | </>{{ column_2 }}
-Another 2: {{ space in column }}<Dot> | </>{{ UPPERCASE }}`
}


Prism.languages.css = css

const tsvEditor = basicEditor(Prism, '.tsv-editor', {
	language: 'css',
	theme: 'prism',
	value: TEST_STRINGS.tsv
}, _ => console.log('ready'))

const templateEditor = basicEditor(Prism, '.tpl-editor', {
	language: 'css',
	theme: 'prism',
	value: TEST_STRINGS.tpl
}, _ => console.log('ready'))