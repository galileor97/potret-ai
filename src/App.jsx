import { useState } from 'react'
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import './App.css'
import LoginPage from './pages/LoginPage'
import MainLayout from './pages/MainLayout';
import DashboardPage from './pages/DashboardPage';
import GalleryPage from './pages/GalleryPage';
import RegisterPage from './pages/RegisterPage';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <DashboardPage />
      },
      {
        path: '/gallery',
        element: <GalleryPage />
      },
      {
        path: '*',
        element: <h1>Not Found 404</h1>
      },
    ],
    loader: () => {
      if (!localStorage.getItem('access_token')) {
        return redirect('/login')
      }

      return null;
    }
  },
  {
    path: '/login',
    element: <LoginPage />,
    loader: () => {
      if (localStorage.getItem('access_token')) {
        return redirect('/')
      }

      return null;
    }
  },
  {
    path: '/register',
    element: <RegisterPage />,
    loader: () => {
      if (localStorage.getItem('access_token')) {
        return redirect('/')
      }

      return null;
    }
  }
])

function App() {


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
