import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from './routes/Landing'
import ThreeDRoom from './routes/ThreeDRoom'
import ClassicPortfolio from './routes/ClassicPortfolio'
import './index.css'

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
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
