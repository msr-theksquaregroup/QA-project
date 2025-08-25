import type { PropsWithChildren } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button } from './ui/button'

const nav = [
  { to: '/', label: 'Dashboard' },
  { to: '/files', label: 'Files' },
  { to: '/tests', label: 'Test Cases' },


  { to: '/test-cases', label: 'Test Cases' },


  { to: '/runs', label: 'Runs' },
]

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-12 border-b flex items-center px-4 gap-4">
        <Link to="/" className="font-semibold">KS-qe-platform</Link>
        <div className="ml-auto">
          <Button variant="outline" size="sm">New Run</Button>
        </div>
      </header>
      <div className="flex flex-1">
        <nav className="w-48 border-r p-4 space-y-2">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `block text-sm px-2 py-1 rounded hover:bg-gray-100 ${isActive ? 'font-medium' : 'text-gray-600'}`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
