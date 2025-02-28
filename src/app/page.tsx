'use client'

import React, { createRef, useState } from 'react'
import { Allotment, AllotmentHandle } from 'allotment'
import 'allotment/dist/style.css'

import { cn } from '@/lib/utils'
import { activeAtom, useLangStore } from '@/store/language'

import { WinDisplayController } from '@/components/win-display-controller'
import { Header } from '@/components/header'
import { Nav, NavLink } from '@/components/nav'
import { useSetAtom } from 'jotai'

let firstLoad = true

export default function Home() {
  const [isCollapsed, setCollapsed] = useState(false)
  const paneRef = createRef<AllotmentHandle>()
  const [items, setItems] = useState<NavLink[]>([
    { id: 'java', title: 'Java' },
    { id: 'rust', title: 'Rust' },
    { id: 'ts', title: 'TypeScript' },
    { id: 'go', title: 'Golang' },
  ])
  const setActive = useSetAtom(activeAtom)
  const [trs, setTrs] = useState(false)
  const [addInpVisible, setAddInpVisible] = useState(false)

  function onNavClick(link: NavLink) {
    setActive(link)
  }

  function onAddClick() {
    setAddInpVisible(true)
  }

  return <>
    <main className="flex h-screen">
      <Allotment
        snap
        defaultSizes={[180]}
        ref={paneRef}
        onChange={([first]) => {
          if (firstLoad) {
            firstLoad = false
            return
          }

          if (isCollapsed && first)
            setCollapsed(false)
          else if (!isCollapsed && !first)
            setCollapsed(true)
        }}
        separator={false}
        proportionalLayout
      >
        <Allotment.Pane
          minSize={180}
          preferredSize={180}
          snap
          visible={!isCollapsed}
          className="flex flex-col"
        >
          <div className="h-head w-full shrink-0" data-tauri-drag-region></div>
          <Nav
            className="grow overflow-hidden"
            links={items}
            showInput={addInpVisible}
            onClick={onNavClick}
            hideInput={(e) => {
              const value = e.target.value
              setItems([{ id: value, title: value }, ...items])
              setAddInpVisible(false)
            }}
          />
        </Allotment.Pane>
        <Allotment.Pane
          minSize={300}
          className={cn('grow flex flex-col border-l border-l-border', trs && 'duration-150')}
        >
          <Header
            className="w-full shrink"
            collapsed={isCollapsed}
            onChangeSide={() => {
              setCollapsed(!isCollapsed)
              setTrs(true)
            }}
            onAdd={onAddClick}
            transition={trs}
            onTransitionEnd={() => {
              setTrs(false)
            }}
          />
          <div className="flex grow w-full justify-center items-center">
            <Conter />
          </div>
        </Allotment.Pane>
      </Allotment>
    </main >
    <WinDisplayController />
  </>
}

function Conter() {
  const [language] = useLangStore()
  return (
    <p className="text-xs text-secondary-foreground whitespace-pre-wrap">
      {language ?? 'Select an item'}
    </p>
  )
}
