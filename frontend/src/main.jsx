import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import Authorities from './pages/Authorities.jsx'
import CreateGrievance from './pages/CreateGrievance.jsx'
import MyGrievances from './pages/MyGrievances.jsx'
import Inbox from './pages/Inbox.jsx'
import ChangePassword from './pages/ChangePassword.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <SignIn /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'authorities', element: <Authorities /> },
      { path: 'create', element: <CreateGrievance /> },
      { path: 'my', element: <MyGrievances /> },
      { path: 'inbox/:key', element: <Inbox /> },
      { path: 'change-password', element: <ChangePassword /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
