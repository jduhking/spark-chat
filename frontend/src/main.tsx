import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from './routes/HomePage'
import LoginPage from './routes/LoginPage'
import RegisterPage from './routes/RegisterPage'
import ErrorPage from './ErrorPage'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: < LoginPage />
  },
  {
    path: "/register",
    element: < RegisterPage />
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
