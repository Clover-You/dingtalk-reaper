'use client'

import { useAtomValue } from 'jotai'
import { Button } from './ui'
import { cn } from '@/lib/utils'
import { activeAtom } from '@/store/language'

interface HeaderProps {
  className?: string
  collapsed?: boolean
  onChangeSide?: () => void
  onTransitionEnd?: () => void
  onAdd?: () => void
  transition?: boolean
}

export function Header(props: HeaderProps) {
  const { className, transition, collapsed, onChangeSide, onTransitionEnd, onAdd } = props

  const active = useAtomValue(activeAtom)
  const title = active?.title ?? ''

  return <>
    <div style={{ width: '100%', height: 0 }}></div>
    <header
      data-tauri-drag-region
      className={cn('h-head box-border flex items-center border-b-border border-b', className)}
    >
      <div className={cn(
        'fixed',
        'left-[6rem]',
      )}>
        <Button variant="ghost" size="icon" onClick={onChangeSide}>
          <span className="icon-[f7--sidebar-left] w-5 h-5 text-muted-foreground"></span>
        </Button>

        <Button variant="ghost" size="icon" onClick={onAdd}>
          <span className="icon-[carbon--add-large] w-5 h-5 text-muted-foreground"></span>
        </Button>
      </div>

      <div className={cn(
        'h-head',
        transition && 'duration-150',
        collapsed ? 'w-[calc(6rem+72px)]' : 'w-0',
      )} onTransitionEnd={onTransitionEnd} />

      <div className="pl-space text-nowrap text-ellipsis overflow-hidden">
        <h1 data-tauri-drag-region className="text-accent-foreground">{title}</h1>
      </div>
    </header>
  </>
}
