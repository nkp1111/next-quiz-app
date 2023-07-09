import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Inter } from 'next/font/google'
import { AppProvider } from "@/context/app"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next Country Quiz',
  description: 'Country quiz game made on next framework',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
