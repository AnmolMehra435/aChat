import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import EditProfile from './pages/EditProfile.jsx';

function App(){

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Login/>
        },
        {
            path: '/dashboard',
            element: <Dashboard/>
        },
        {
            path: '/editprofile',
            element: <EditProfile/>
        }
    ])
    return (
        <RouterProvider router={router} />
    )
}

export default App