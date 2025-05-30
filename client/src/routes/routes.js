import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword'
import React from 'react'
import { DefaultLayout } from '../layouts'

// Routes that use the default layout
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/forgot-password', component: ForgotPassword },
    // Add other routes here as needed
]

// Routes that use a different layout or no layout
const specialRoutes = [
    // Example: { path: '/admin', component: Admin, layout: AdminLayout }
]

export { publicRoutes, specialRoutes }
export default publicRoutes
