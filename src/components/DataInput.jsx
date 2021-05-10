import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { productService } from '../services/productService';
import { customerService } from '../services/customerService';
import { parseHTMLFormular } from '../services/parseHTMLFormular';

import head from '../pics/KompostmacherAnschrift.jpg';
import DOMPurify from 'dompurify'

import { collectionConfirmationService } from '../services/collectionConfirmationService';

function DataInput() {
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [currProduct, setCurrProduct] = useState({});
    const [subCustomer, setSubCustomer] = useState('');
    const [selectedInput, setSelectedInput] = useState({
        customer: customers[0] || '',
        products: [],
        subCustomer: subCustomer || ''
    });
    const [htmlFormular, setHTMLFormular] = useState();
    
    const [handSign, setHandSign] = useState();
    const [notMet, setNotMet] = useState();

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
                case 'subcustomer':
                    setSubCustomer(value);
                    setSelectedInput({...selectedInput, 'subCustomer': value});
                    break;
                default:
                    toast.error('something went wrong!');
            }
        }
        catch(err) {
            toast.error(err);
        }
    }

    const replacements = [
        {
            placeholder: '#unterschrift',
            replacement: '<input onChange={onChange}></input>'
        },
        {
            placeholder: '#niemandenangetroffen',
            replacement: '<input onChange={onChange} type="checkbox"/>Niemanden Angetroffen'
        },
        {
            placeholder: '#head',
            replacement: head
        }
    ]

    function addProduct() {
        setSelectedInput({...selectedInput, 'products': [...selectedInput.products, currProduct]})
    }

    function submit() {
        collectionConfirmationService.getFormular(selectedInput)
            .then(data => {
                console.log(data);
                data = parseHTMLFormular(data, replacements);
                setHTMLFormular(data);
            })
            .catch(err => {
                toast.error(err);
            })
    }

    function save() {
        collectionConfirmationService.saveFormular({ formular: htmlFormular })
            .then(data => {
                console.log(data);
                toast.info(data)
            })
            .catch(err => {
                toast.error(err);
            })
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
                <input 
                    type="text" 
                    id="inputSubcustomer" 
                    placeholder="Subkunde"
                    key='subcustomer'
                    name="subcustomer" 
                    onChange={onChange}
                >
                </input>
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
                    class="btn btn-primary"
                    onClick={submit}>
                    Submit
                </button>
                <br/>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlFormular) }} />
                <button 
                    type="submit" 
                    class="btn btn-primary"
                    onClick={save}>
                    Speichern
                </button>
                <br/>
            </div>
        </div>
    )
}
export default DataInput;