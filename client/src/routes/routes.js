import Home from '../pages/Home/Home'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword'
import VerifyEmail from '../pages/VerifyEmail/VerifyEmail'
import Cart from '../pages/Cart/Cart'
import Checkout from '../pages/Checkout/Checkout'
import OrderSuccess from '../pages/OrderSuccess/OrderSuccess'
import Profile from '../pages/Profile/Profile'
import React from 'react'
import { DefaultLayout } from '../layouts'

// Routes that use the default layout
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/forgot-password', component: ForgotPassword },
    { path: '/verify-email', component: VerifyEmail },
    { path: '/cart', component: Cart },
    { path: '/checkout', component: Checkout },
    { path: '/order-success', component: OrderSuccess },
    { path: '/profile', component: Profile },
    // Add other routes here as needed
]

// Routes that use a different layout or no layout
const specialRoutes = [
    // Example: { path: '/admin', component: Admin, layout: AdminLayout }
]

export { publicRoutes, specialRoutes }
export default publicRoutes
