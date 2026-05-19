import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';

import { RouterProvider, createBrowserRouter } from 'react-router-dom'

function App(){

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Login/>
        },
        {
            path: '/dashboard',
            element: <Dashboard/>
        }
    ])
    return (
        <RouterProvider router={router} />
    )
}

export default App