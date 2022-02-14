import WorkingPage from './WorkingPage';
import Admin from './Admin'
import Signup from './Register';
import Login from './Login';

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