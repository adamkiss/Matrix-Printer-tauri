import {parse} from 'papaparse'
import {Liquid} from 'liquidjs'

import { os, window as appWindow } from '@tauri-apps/api'

const engine = new Liquid();

export default function (language, testString = 'tsv') {
    return {
        // Models
        input: localStorage.getItem('input') || '',
        filtersRaw: localStorage.getItem('filters') || '{}',
        allKey: localStorage.getItem('allKey') || 'all',
        groupBy: localStorage.getItem('groupBy') || '',
        template: localStorage.getItem('template') || '',
        output: '',

        // Computed
        data: null,
		filters: {},
        errors: {
			parsing: [],
			filters: null,
			render: null
		},

        // UI
        titlebarPadLeft: 0,
        titlebarPadRight: 0,
        activeTab: 2,

        // Init
        async init() {
            this.parse = this.parse.bind(this)
            this.render = this.render.bind(this)
			this.setFilters = this.setFilters.bind(this)

            this.$watch('input', this.parse)

			this.$watch('filtersRaw', this.setFilters)

            this.$watch('data', this.render)
            this.$watch('allKey', this.render)
            this.$watch('groupBy', this.render)
            this.$watch('template', this.render)

            await this.onResize()
            await this.parse()
			await this.setFilters()
            await this.render()
        },

        // Binds
        root: {
          'x-on:resize.window.debounce.200'() { this.onResize() },
          'x-on:keydown.cmd.1.window.prevent'() { this.activeTab = 0 },
          'x-on:keydown.cmd.2.window.prevent'() { this.activeTab = 1 },
          'x-on:keydown.cmd.3.window.prevent'() { this.activeTab = 2 },
        },
        titlebar: {
          'x-ref': 'titlebar',
        },
        result: {},
        tabs: {},

        // Event Listeners
        async onResize() {
          try {
            const isFullscreen = (await appWindow?.appWindow?.isFullscreen()) || false
            const platform = (await os?.platform()) || false

            this.titlebarPadLeft = (platform === 'darwin' && ! isFullscreen) ? 76 : 0

          } catch (error) {
            if (! error?.message?.includes('window.__TAURI_IPC__')) {
              // Rethrow any error that isn't related to Tauri IPC missing
              // because that means it's probably web
              throw error
            }

            this.titlebarPadLeft = 0
            this.titlebarPadRight = 0
          }
        },

		// Helpers
		get hasError() {
			return this.errors.parsing?.length || this.errors.filters || this.errors.render
		},

		get allErrors() {
			return [
				...this.errors.parsing,
				this.errors.filters,
				this.errors.render
			].filter(Boolean)
		},

		get firstError() {
			return this.allErrors[0]
		},

		get available() {
			return this.data?.length
				? [this.allKey, ...Object.keys(this.data[0])].join(', ')
				: ''
		},

        // Methods
		setFilters() {
			try {
				localStorage.setItem('filters', this.filtersRaw)
				this.filters = eval(`_ => (${this.filtersRaw})`)()

				for (const filter in this.filters) {
					if (filter in engine.filters) {
						delete engine.filters[filter]
					}
					engine.registerFilter(filter, this.filters[filter])
				}
				this.errors.filters = null
			} catch (error) {
				this.errors.filters = `<b>Filters error</b> ${error.message}`
			}
		},

        async render() {
			localStorage.setItem('allKey', this.allKey)
			localStorage.setItem('groupBy', this.groupBy)
			localStorage.setItem('template', this.template)

            if (this.errors.parsing?.length || this.errors.filters) {
				this.result = ''
				return
			}

			this.errors.render = null

			try {
				const {data, allKey, groupBy, template} = this

				const rendered = await Promise.all(data.map(async row => {
					const rendered = await engine.parseAndRender(template, Object.assign({}, row, {[allKey]: row}))
					return {row, rendered}
				}))


				if (! groupBy) {
					this.result = rendered.map(item => item.rendered).join('\n')
				} else {
					const grouped = rendered.reduce((r, item) => {
						const key = item.row[groupBy]
						r[key] = [...r[key] || [], item.rendered]
						return r
					}, {})

					this.result = Object.keys(grouped)
						.map(key => `${key}:\n${grouped[key].join('\n')}`)
						.join('\n\n')
				}
			} catch (error) {
				this.errors.render = `<b>Render error</b> ${error.message}`
			}
        },

        parse() {
			localStorage.setItem('input', this.input)

            const {data, errors, meta} = parse(this.input, {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: true
            })

            this.errors.parsing = errors.map(error => `<b>Parsing error</b> [${error.type}/${error.code}]:${error.row} ${error.message}`)
            this.data = data
        }
    }
}
