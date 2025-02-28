import { atom, useAtom } from 'jotai'

export const activeAtom = atom<{
  title: string
  id: string | number
  label?: string
}>()
const languageAtom = atom<string | undefined>((get) => {
  const current = get(activeAtom)
  return current?.title && `Item at ${current?.title}`
})

export function useLangStore() {
  return useAtom(languageAtom)
}
