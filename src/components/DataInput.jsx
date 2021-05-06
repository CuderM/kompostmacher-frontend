import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { productService } from '../services/productService';
import { customerService } from '../services/customerService';

import CreatePDF from './PDFCreator';
import { collectionConfirmationService } from '../services/collectionConfirmationService';

function DataInput() {
    const history = useHistory();
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [currProduct, setCurrProduct] = useState({});
    const [selectedInput, setSelectedInput] = useState({
        customer: customers[0] || '',
        products: []
    });

    useEffect(() => {    
        try {                           
            customerService.getAll()
                .then(_customers => {
                    console.log(_customers)
                    setCustomers(_customers);
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
            }
        catch(err) {
            toast.error(err);
        }
    }, []);

    const onChange = (event) => {
        const { name, selectedOptions, value } = event.target;
        try {
            switch(name) {
                case 'customer':
                    customerService.getById(selectedOptions[0].id)
                        .then(data => {
                            setSelectedInput({...selectedInput, 'customer': data});
                        })
                        .catch(err => {
                            toast.error(err);
                        });
                    break;
                case 'product':
                    productService.getById(selectedOptions[0].id)
                        .then(data => {
                            setCurrProduct({...currProduct, 'product': data})
                        })
                        .catch(err => {
                            toast.error(err);
                        });
                    break;
                case 'amount':
                    setCurrProduct({...currProduct, 'amount': value})
                    break;
                default:
                    toast.error('something went wrong!');
            }
        }
        catch(err) {
            toast.error(err);
        }
    }

    function addProduct() {
        setSelectedInput({...selectedInput, 'products': [...selectedInput.products, currProduct]})
        setCurrProduct({})
    }

    function submit() {
    }

    return (
        <div>
            <div style={{textAlign: "center"}}>
                <select 
                    key="customer" 
                    name="customer" 
                    onChange={onChange}>
                    {
                        customers.map(customer => {
                            return <option id={customer._id} value={customer.name}>{customer.name}</option>
                        })
                    }
                </select>
                <br/>
                <select 
                    key="product"
                    name="product" 
                    onChange={onChange}>
                    {
                        products.map(product => {
                            return <option id={product._id}value={product.value}>{product.name}</option>
                        })
                    }
                </select>
                <br/>
                <input 
                    type="number" 
                    id="inputMenge" 
                    placeholder="Menge"
                    key='amount'
                    name="amount" 
                    onChange={onChange}
                >
                </input>
                <br/>
                <button 
                    type="submit" 
                    class="btn btn-primary"
                    onClick={addProduct}>
                    add Produkt
                </button>
                <button 
                    type="submit" 
                    class="btn btn-primary">
                    Submit
                </button>
                <br/>
            </div>
        </div>
    )
}
export default DataInput;