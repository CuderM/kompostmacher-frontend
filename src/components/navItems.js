import WorkingPage from '../components_old/WorkingPage';
import Admin from '../components_old/Admin'
import Signup from '../components_old/Register';
import Login from '../components_old/Login';

let navItems = [
    {
        title: 'WorkingPage',
        to: '/workingpage',
        component: WorkingPage
    },
]

let navItemsAdmin = [
    {
        title: 'Admin',
        to:'/admin',
        component: Admin
    },
]

let navItemsAuth = [
    {
        title: 'Login',
        to:'/login',
        component: Login
    },
    {
        title: 'Signup',
        to:'/signup',
        component: Signup
    },
]

export { navItems, navItemsAdmin, navItemsAuth }