'use client'

import { useEffect } from 'react'
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow'

/**
 * Fix tauri window startup white screen.
 * When creating a window, should hidden it first e.g.
 * ```ts
 * import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow'
 * new Window('main', { visible: false })
 * ```
 */
export function WinDisplayController() {
  useEffect(() => {
    setTimeout(getCurrentWebviewWindow().show, 30)
  }, [])

  return undefined
}
