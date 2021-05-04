import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import TableEntities from './TableEntities';

import { userService } from '../services/userService';
import { productService } from '../services/productService';
import { customerService } from '../services/customerService';
import { collectionConfirmationService } from '../services/collectionConfirmationService';

import'bootstrap-icons/font/bootstrap-icons.css';

export default function Admin() {
    const history = useHistory();
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [collectionConfirmations, setCollectionConfirmations] = useState([]);
    const [sortState, setSortState] = useState({key: '', reversed: false});



    useEffect(() => {                               
        customerService.getAll()
            .then(_customers => {
                console.log(_customers)
                setCustomers(_customers);
            })
            .catch(() => {
                toast.error('Failed to load periods');
            });
        userService.getAll()
            .then(_users => {
                console.log(_users)
                setUsers(_users);
            })
            .catch(() => {
                toast.error('Failed to load periods');
            });
        productService.getAll()
            .then(_products => {
                console.log(_products)
                setProducts(_products);
            })
            .catch(() => {
                toast.error('Failed to load periods');
            });
        collectionConfirmationService.getAll()
            .then(_collectionConfirmation => {
                console.log(_collectionConfirmation)
                _collectionConfirmation.forEach(cc => {
                    cc.customer = cc.customer.name;
                    cc.product = cc.product.name;
                });

                setCollectionConfirmations(_collectionConfirmation);
            })
            .catch(err => {
                toast.error(err);
            });
    }, []);

    const openForm = (url) => {
        history.push({
            pathname: url,
            createFormValidInfo: (valid) => {
                return {
                    'firstname': {
                        valid: valid,
                        msg: ''
                    },
                    'lastname': {
                        valid: valid,
                        msg: ''
                    },
                    'username': {
                        valid: valid,
                        msg: ''
                    },
                    'password': {
                        valid: valid,
                        msg: ''
                    },
                    'form': {
                        valid: valid,
                        msg: ''
                    }
                }
            },
            getEntityById: userService.getById,
            entityCreate: userService.create,
            entityUpdate: userService.update,
            checkFields: (name, value, formValidInfo) => {
                    let validationInfo;
            
                    switch(name) {
                        case 'firstname':
                            validationInfo = checkFirstname(value);
                            break;
                        case 'lastname':
                            validationInfo = checkLastname(value);
                            break;
                        case 'username':
                            validationInfo = checkUsername(value);
                            break;
                        case 'password':
                            validationInfo = checkPassword(value, name);
                            break;
                        default:
                    }
            
                    return {
                        ...formValidInfo,
                        [name]: validationInfo
                    }
                }
        })
    }

//#region deletes

    const _deleteCustomer = (customer) => {
        customerService.delete(customer._id).then(() => {
            let newCostumer = customers.filter(u => u._id !== customer._id);
            setCustomers(newCostumer);
        });    
    }

    const _deleteProduct = (product) => {
        productService.delete(product._id).then(() => {
            let newProducts = products.filter(u => u._id !== product._id);
            setProducts(newProducts);
        });    
    }

    const _deleteUser = (user) => {
        userService.delete(user._id).then(() => {
            let newUsers = users.filter(u => u._id !== user._id);
            setUsers(newUsers);
        });    
    }

    const _deleteCC = (cc) => {
        collectionConfirmationService.delete(cc._id).then(() => {
            let newCCs = collectionConfirmations.filter(u => u._id !== cc._id);
            setCollectionConfirmations(newCCs);
        });    
    }

//#endregion

//#region checks

//#region user
    function checkFirstname(fn) {
        let msg = 'ok';
        let valid = true;
        return { valid, msg };
    }

    function checkLastname(fn) {
        let msg = 'ok';
        let valid = true;

        if(!fn)  {
            msg = 'last name is not allowed to be empty';
            valid = false;
        }

        return { valid, msg };
    }

    function checkUsername(fn) {
        let msg = 'ok';
        let valid = true;

        if(!fn)  {
            msg = 'username is not allowed to be empty';
            valid = false;
        } else {
            if(fn.length < 4) {
                msg = 'first name is too short';
                valid = false;
            } else if(fn.length > 20) {
                msg = 'first name is too long';
                valid = false;
            }
        }
        return { valid, msg };
    }

    function checkPassword(g, name) {
        let msg = 'ok';
        let valid = true;

        if(g.length < 6) {
            msg = 'first name is too short';
            valid = false;
        }

        return { valid, msg };
    }
//#endregion



//#endregion

//#region sort things

    function sortBy(sortkrit) {
        let newSortKrit = {};
        newSortKrit.reversed = (sortState.key === sortkrit) ? !sortState.reversed : false;
        newSortKrit.key = sortkrit;

        let sortedCustomers = customers.sort(
            (a, b) => {
                return a[sortkrit] > b[sortkrit] ? 1 : -1;
            }
        )

        if (newSortKrit.reversed)
            sortedCustomers.reverse();

        setCustomers(sortedCustomers)
        setSortState(newSortKrit);
    }

    function getSortSymbol(headerCol) {
        if (headerCol.key !== sortState.key)
            return 'bi bi-filter'

        if (sortState.reversed)
            return 'bi bi-sort-down';
        else
            return 'bi bi-sort-up';
    }

//#endregion

    return [
        <TableEntities
            tableHeader={[
                { key: 'name', label: 'Name', sortable: true },
                { key: 'adresse', label: 'Adresse'},
                { key: 'anschrift', label: 'Anschrift'},
                { key: 'email', label: 'Email'}
            ]}
            openForm={openForm}
            _delete={_deleteCustomer}
            sortBy={sortBy}
            getSortSymbol={getSortSymbol}
            entities={customers}
            entity='Kunden'
            formUrl='/SimpleForm/'
        ></TableEntities>,
        <br/>,
        <TableEntities
            tableHeader={[
                { key: 'name', label: 'Name'},
                { key: 'einheit', label: 'Einheit'}
            ]}
            openForm={openForm}
            _delete={_deleteProduct}
            sortBy={sortBy}
            getSortSymbol={getSortSymbol}
            entities={products}
            entity='Produkte'
            formUrl='/SimpleForm/'
        ></TableEntities>,
        <br/>,
        <TableEntities
            tableHeader={[
                { key: 'firstname', label: 'Vorname'},
                { key: 'username', label: 'Username'},
                { key: 'lastname', label: 'Nachname'}
            ]}
            openForm={openForm}
            _delete={_deleteUser}
            sortBy={sortBy}
            getSortSymbol={getSortSymbol}
            entities={users}
            entity='Benutzer'
            formUrl='/form/'
        ></TableEntities>,
        <br/>,
        <TableEntities
            tableHeader={[
                { key: 'customer', label: 'Kunde'},
                { key: 'subcustomer', label: 'Subkunde'},
                { key: 'product', label: 'Produkt'},
                { key: 'amount', label: 'Menge'},
                { key: 'date', label: 'Datum'},
                { key: 'handsign', label: 'Unterschrift'}
            ]}
            openForm={openForm}
            _delete={_deleteCC}
            sortBy={sortBy}
            getSortSymbol={getSortSymbol}
            entities={collectionConfirmations}
            entity='Abholbestätigungen'
            formUrl='/SimpleForm/'
        ></TableEntities>
    ]
}