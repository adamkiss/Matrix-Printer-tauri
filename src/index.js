import './css/style.css'
import './css/prism.css'

import Alpine from 'alpinejs'
import focus from '@alpinejs/focus'
import ui from '@alpinejs/ui'

import Prism from "prismjs"
import AlpinePrism from './js/alpine-prism'
import App from './js/app'
import Titlebar from './js/titlebar'

Alpine.plugin(focus)
Alpine.plugin(ui)

Alpine.data('PrismEditor', AlpinePrism(Prism))
Alpine.data('App', App)
Alpine.data('Titlebar', Titlebar)

window.Alpine = Alpine
Alpine.start()
