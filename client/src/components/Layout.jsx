import { Outlet } from 'react-router-dom'
import DocumentMeta from './DocumentMeta'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <DocumentMeta />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
