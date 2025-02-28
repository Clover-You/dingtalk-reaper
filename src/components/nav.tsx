import Link from 'next/link'
import React from 'react'

import { buttonVariants } from '@/components/ui/button'

import { cn } from '@/lib/utils'
import { activeAtom } from '@/store/language'
import { useAtomValue } from 'jotai'
import { Input } from './ui'
import { ScrollArea } from './ui/scroll-area'

export interface NavLink {
  title: string
  id: string | number
  label?: string
}

type HideInput = (event: React.FocusEvent<HTMLInputElement, Element>) => void

interface NavProps {
  links: NavLink[]
  onClick?: (link: NavLink) => void
  showInput?: boolean
  hideInput?: HideInput
  className?: string
}

function LinkInput({ show, hide }: { show?: boolean, hide?: HideInput }) {
  if (show)
    return (
      <Link href="#">
        <Input
          className={buttonVariants({ variant: 'ghost', size: 'sm' })}
          autoFocus
          onBlur={hide}
        />
      </Link>
    )
  return undefined
}

export function Nav({ links, onClick, showInput, hideInput, className }: NavProps) {
  const active = useAtomValue(activeAtom)

  return (
    <nav className={cn('w-full min-w-[160px]', className)}>
      <ScrollArea className="h-full">
        <div className="w-full grid gap-1 px-2 py-1  overflow-auto">
          <LinkInput show={showInput} hide={hideInput} />
          {links.map((link) => (
            <Link
              key={link.id}
              draggable="false"
              href="#"
              className={cn(
                buttonVariants({ variant: link.id === active?.id ? 'default' : 'ghost', size: 'sm' }),
                link.id === active?.id &&
                'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                'justify-start',
              )}
              onClick={() => onClick?.(link)}
            >
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    'ml-auto',
                    link.id === active?.id &&
                    'text-background dark:text-white',
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          ))}
        </div>
      </ScrollArea>
    </nav>
  )
}
