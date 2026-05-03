import React from 'react'
import { useApp } from '../context/AppContext'
import Header from './Header'
import Sidebar from './Sidebar'

export default function Layout({ children }) {
  const { sidebarOpen } = useApp()

  return (
    <div className="flex h-screen bg-gray-950 overflow-hidden">
      <Sidebar />
      <div className={`flex flex-col flex-1 min-w-0 transition-all duration-300`}>
        <Header />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
