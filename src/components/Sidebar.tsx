import { ReactNode } from 'react'

type SidebarProps = {
  children: ReactNode
}

export default function Sidebar({ children }: SidebarProps) {
  return <div className='sidebar'>{children}</div>
}

export function SidebarTop({ children }: SidebarProps) {
  return <div className='sidebar__top'>{children}</div>
}
