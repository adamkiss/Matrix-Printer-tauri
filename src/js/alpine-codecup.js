import { basicEditor } from "prism-code-editor/setups"

import configCSS from "./language-css"
import setupLiquid from "./language-liquid"
import setupMarkupTemplating from "./language-markup-templating"

export default (Prism) => {
    // Setup prism
    Prism.languages.css = configCSS
    setupMarkupTemplating(Prism)
    setupLiquid(Prism)
    
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
            }
        }   
    }
} 