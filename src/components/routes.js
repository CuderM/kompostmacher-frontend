import WorkingPage from '../components_old/WorkingPage';
import Admin from '../components_old/Admin'
import SimpleForm from '../components_old/SimpleForm';
import Form from '../components_old/Form';
import ShowHTMLFormular from '../components_old/ShowHTMLFormular';
import Signup from '../components_old/Register';
import Login from '../components_old/Login';
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
        component: ShowHTMLFormular
    },
    {
        title: 'ShowHTMLFormular',
        to: '/showHTML/:id',
        component: Form
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