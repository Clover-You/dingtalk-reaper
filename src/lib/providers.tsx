'use client'

import React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

import { useFeignDesktop } from './feign-desktop'

export function Providers({ children }: React.PropsWithChildren) {
  useFeignDesktop()

  return (
    <NextThemesProvider attribute="class" enableSystem>
      {children}
    </NextThemesProvider>
  )
}
