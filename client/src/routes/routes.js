import Home from '../pages/Home/Home'
import React from 'react'
import { DefaultLayout } from '../layouts'

// Routes that use the default layout
const publicRoutes = [
    { path: '/', component: Home },
    // Add other routes here as needed
]

// Routes that use a different layout or no layout
const specialRoutes = [
    // Example: { path: '/login', component: Login, layout: null }
]

export { publicRoutes, specialRoutes }
export default publicRoutes
