import { Editor } from '@/components/Editor/text-editor'
import ToggleThemeButton from '@/components/ui/toggle-theme'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <ToggleThemeButton />
      <Editor />
    </div>
  )
}
