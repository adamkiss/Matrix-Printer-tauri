export default function Titlebar() {
    return {
        ['x-on:resize.window.debounce.200']() { this.titlebar.onResize() },
    
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
        }
    }
    }