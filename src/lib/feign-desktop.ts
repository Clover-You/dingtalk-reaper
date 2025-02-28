import { useEffect } from 'react'

function contextmenuEventHandler(e: MouseEvent) {
  e.preventDefault()
}

export function useFeignDesktop() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production')
      return

    if (!window) return

    window.addEventListener('contextmenu', contextmenuEventHandler)

    return () => {
      window.removeEventListener('contextmenu', contextmenuEventHandler)
    }
  }, [])
}
