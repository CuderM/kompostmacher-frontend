import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import TableEntities from './Utils/TableEntities';
import Modal from "react-modal";

import { userService } from '../services/userService';
import { productService } from '../services/productService';
import { customerService } from '../services/customerService';
import { collectionConfirmationService } from '../services/collectionConfirmationService';
import Form from './Modals/Form'

import'bootstrap-icons/font/bootstrap-icons.css';
import '../style/TableEntities.css';

export default function Admin() {
    const history = useHistory();
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [collectionConfirmations, setCollectionConfirmations] = useState([]);
    const [sortState, setSortState] = useState({key: '', reversed: false});
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [currEntity, setCurrEntity] = useState({});
    const [currEntityType, setCurrEntityType] = useState({});
    

    function closeModal(entity) {
        setModalIsOpen(false)

        setCurrEntity(entity)

        if(entity._id) {
            createOrUpdate(false, entity)
        } else if(entity !== "" && entity !== "new"){
            createOrUpdate(true, entity)
        }
    }

    function createOrUpdate(create, entity) {
        entity.userId = localStorage.getItem('id');
        switch(currEntityType) {
            case 'Kunden':
                if(create) {
                    customerService.create(entity)
                        .then(ent => {

                        })
                        .catch(err => {
                            toast.error(err)
                        })
                } else {
                    customerService.update(entity._id, entity)
                        .then(ent => {
                        })
                        .catch(err => {
                            toast.error(err)
                        })
                }
                break
            case 'Benutzer':
                if(create) {
                    userService.createSubUser(entity)
                        .then(ent => {

                        })
                        .catch(err => {
                            toast.error(err)
                        })
                } else {
                    userService.update(entity._id, entity)
                        .then(ent => {
                        })
                        .catch(err => {
                            toast.error(err)
                        })
                }
                break
            case 'Produkte':
                if(create) {
                    productService.create(entity)
                        .then(ent => {

                        })
                        .catch(err => {
                            toast.error(err)
                        })
                } else {
                    productService.update(entity._id, entity)
                        .then(ent => {
                        })
                        .catch(err => {
                            toast.error(err)
                        })
                }
                break
            default:
        }
    }

    const customStyles = {
        content: {
          top: "15%",
          left: "25%",
          right: "25%",
          bottom: "auto",
          background: "#0C0F1F",
          color: "white",
          border: "none",
        },
    };

    if (localStorage.getItem("theme") === "whiteTheme") {
        customStyles.content.background = "white";
        customStyles.content.color = "black";
        }

    useEffect(() => {    
        try {   
            collectionConfirmationService.getAll()
                .then(_collectionConfirmation => {
                    console.log(_collectionConfirmation)
                    // _collectionConfirmation.forEach(cc => {
                    //     cc.date = cc.customer.date;
                    // });
                    setCollectionConfirmations(_collectionConfirmation);
                })
                .catch(err => {
                    toast.error(err);
                });                        
            customerService.getAll()
                .then(_customers => {
                    setCustomers(_customers);
                })
                .catch(err => {
                    toast.error(err + ' : Failed to load periods');
                });
            userService.getAll()
                .then(_users => {
                    setUsers(_users);
                })
                .catch(() => {
                    toast.error('Failed to load periods');
                });
            productService.getAll()
                .then(_products => {
                    setProducts(_products);
                })
                .catch(() => {
                    toast.error('Failed to load periods');
                });
            }
        catch(err) {
            toast.error(err);
        }
    }, []);

    const openForm = (entityType, entity) => {
        setCurrEntity(entity)
        setCurrEntityType(entityType)
        setModalIsOpen(true)  
        // switch(entityType) {
        //     case 'Benutzer':
                
        //         break;
        //     case 'Kunden':
        //         setModalIsOpen(true)
        //         break;
        //     case 'Produkte':
        //         setModalIsOpen(true)
        //         break;
        //     case 'Abholbestätigungen':
                
        //         break;
        //     default:
        //         toast.error('something went wrong');
        // }
    }

    const showHTML = (_url, _collectionConfirmation) => {
        //window.open('C:\\Users\\poize\\Desktop\\NeuesTextdokument(2).html')
        history.push({
            pathname: _url,
            collectionConfirmation: _collectionConfirmation,
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

    return (
        <div className='tableGrid'>
            <div className='grayback'>
                <TableEntities
                    className='customerGrid'
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
                ></TableEntities>
            </div>
            <div className='grayback'>
                <TableEntities
                    className='productGrid'
                    tableHeader={[
                        { key: 'name', label: 'Name'},
                        { key: 'einheit', label: 'Einheit'},
                        { key: 'spezifikation', label: 'Spezifikation'},
                        { key: 'schluesselnummer', label: 'Schluesselnummer'}
                    ]}
                    openForm={openForm}
                    _delete={_deleteProduct}
                    sortBy={sortBy}
                    getSortSymbol={getSortSymbol}
                    entities={products}
                    entity='Produkte'
                ></TableEntities>
            </div>
            <div className='grayback'>
                <TableEntities
                    className='userGrid'
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
                ></TableEntities>
            </div>
            <div className='grayback'>
                <TableEntities
                    className='ccsGrid'
                    tableHeader={[
                        { key: 'date', label: 'Datum'}
                    ]}
                    openForm={showHTML}
                    _delete={_deleteCC}
                    sortBy={sortBy}
                    getSortSymbol={getSortSymbol}
                    entities={collectionConfirmations}
                    entity='Abholbestätigungen'
                    formUrl='/showHTML/'
                ></TableEntities>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                overlayClassName="Overlay"
                ariaHideApp={false}
            >
                <Form
                    closeModal={closeModal}
                    entity={currEntity}
                    entityType={currEntityType}
                ></Form>
            </Modal>
        </div>
        
    )
}