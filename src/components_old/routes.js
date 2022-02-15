import WorkingPage from './WorkingPage';
import Admin from './Admin'
import SimpleForm from './SimpleForm';
import Form from './Form';
import ShowHTMLFormular from './ShowHTMLFormular';
import Signup from './Register';
import Login from './Login';
// import SmplForm from '../testfolder/smplForm'

class Routes {
    constructor(setState) {
        this.routeItems = routeItems
        this.routeItemsAdmin = routeItemsAdmin
        this.routeItemsAuth = [
            {
                title: 'Login',
                to:'/login',
                component: () => <Login setState={setState}></Login>
            },
            {
                title: 'Signup',
                to:'/signup',
                component: Signup
            },
        ]
    }
    getRouteItemsAuth() {
        return this.routeItemsAuth
    }
    getRouteItemsAdmin() {
        return this.routeItemsAdmin
    }
    getRouteItems() {
        return this.routeItems
    }
}

const routeItems = [
    {
        title: 'WorkingPage',
        to: '/workingpage',
        component: WorkingPage
    },
    {
        title: 'SimpleForm',
        to: '/SimpleForm/:userId',
        component: SimpleForm
    },
    {
        title: 'Form',
        to: '/form/:id',
        component: Form
    },
    {
        title: 'ShowHTMLFormular',
        to: '/showHTML/:id',
        component: ShowHTMLFormular
    }

]

const routeItemsAdmin = [
    {
        title: 'Admin',
        to:'/admin',
        component: Admin
    },
]

export { Routes }