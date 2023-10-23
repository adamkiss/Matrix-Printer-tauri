import { basicEditor } from "prism-code-editor/setups"

import "prism-code-editor/languages/clike"
import setupLiquid from "./language-liquid"
import setupMarkupTemplating from "./language-markup-templating"
import setupJavascript from "./language-javascript"
import config from "tailwindcss/defaultConfig"

export default (Prism) => {
    // Setup prism
    setupMarkupTemplating(Prism)
    setupLiquid(Prism)
	setupJavascript(Prism)

    // Return component
    return function ({language = 'plain', testString = 'tsv'} = {}) {
        return {
            value: '',
            editor: null,

            init() {
                this.$nextTick(_ => {
                    this.editor = basicEditor(Prism, this.$root, {
                        language, theme: 'prism',
                        value: this.value,
                        onUpdate: code => this.value = code
                    })
                })
            },
			focusTextarea(evt) {
				this.$root.shadowRoot.querySelector('textarea').focus()
			}
        }
    }
}
