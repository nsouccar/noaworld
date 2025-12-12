import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { inject } from '@vercel/analytics'
import Landing from './routes/Landing'
import ThreeDRoom from './routes/ThreeDRoom'
import ClassicPortfolio from './routes/ClassicPortfolio'
import Resume from './routes/Resume'
import './index.css'

// Initialize Vercel Web Analytics
inject()

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />
  },
  {
    path: '/3d',
    element: <ThreeDRoom />
  },
  {
    path: '/classic',
    element: <ClassicPortfolio />
  },
  {
    path: '/resume',
    element: <Resume />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
