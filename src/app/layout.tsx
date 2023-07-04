import './globals.css'
import TProvider from './components/TProvider'
import AuthProvider from './components/AuthProvider'
import Sidebar from './components/Sidebar'

import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Reddit Clone',
  description: 'Reddit is an American social news aggregation, content rating, and discussion website. Registered users submit content to the site such as links, text posts, images, and videos, which are then voted up or down by other members.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
        <body className="bg-gray-300 dark:bg-black">
            <TProvider>
            <AuthProvider>
                <Navbar />
                {children}
            </AuthProvider>
            </TProvider>
        </body>
    </html>
  )
}
