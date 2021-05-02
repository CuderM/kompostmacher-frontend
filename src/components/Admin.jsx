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
    const [collectionConfirmations, setCollectionConfirmation] = useState([]);
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

                setCollectionConfirmation(_collectionConfirmation);
            })
            .catch(err => {
                toast.error(err);
            });
    }, []);

    const _deleteCustomer = (customer) => {
        customerService.delete(customer._id).then(() => {
            let newCostumer = customers.filter(u => u._id !== customer._id);
            setCustomers(newCostumer);
        });    
    }

    const _deleteProduct = (customer) => {
        productService.delete(customer._id).then(() => {
            let newCostumer = customers.filter(u => u._id !== customer._id);
            setCustomers(newCostumer);
        });    
    }

    const _deleteUser = (customer) => {
        userService.delete(customer._id).then(() => {
            let newCostumer = customers.filter(u => u._id !== customer._id);
            setCustomers(newCostumer);
        });    
    }

    const _deleteCC = (customer) => {
        collectionConfirmationService.delete(customer._id).then(() => {
            let newCostumer = customers.filter(u => u._id !== customer._id);
            setCustomers(newCostumer);
        });    
    }

    const openForm = (url) => {
        history.push(url);
    }

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
            formUrl='/SimpleForm/'
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