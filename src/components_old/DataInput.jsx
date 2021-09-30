import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { productService } from '../services/productService';
import { customerService } from '../services/customerService';
import { parseHTMLFormular } from '../services/parseHTMLFormular';

// import head from '../pics/KompostmacherAnschrift.jpg';
import DOMPurify from 'dompurify'

import '../style/Abholbestaetigung.css';

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
    const [isChecked, setIsChecked] = useState('');
    const [htmlFormular, setHTMLFormular] = useState('');
    const [displaySign, setDisplaySign] = useState('none');
    
    useEffect(() => {    
        try {               
            customerService.getAll()
                .then(_customers => {
                    console.log(_customers)
                    setCustomers(_customers);
                    if(_customers.length > 0) setSelectedInput({...selectedInput, 'customer':  _customers[0]});
                })
                .catch(err => {
                    toast.error('Failed to load customers', err);
                });
            productService.getAll()
                .then(_products => {
                    console.log(_products)
                    setProducts(_products);
                    if(_products.length > 0) setCurrProduct({...currProduct, 'product': _products[0]})
                })
                .catch(() => {
                    toast.error('Failed to load products');
                });
            }
        catch(err) {
            toast.error(err);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                case 'sign':
                    if(isChecked === '') setIsChecked('checked')
                    else setIsChecked('')
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
        // {
        //     placeholder: '#unterschrift',
        //     replacement: '<input onChange={onChange}></input>'
        // },
        // {
        //     placeholder: '#niemandenangetroffen',
        //     replacement: '<input onChange={onChange} type="checkbox" checked="true" />Niemanden Angetroffen'
        // },
        // {
        //     placeholder: '<div id="bestaetigung">Die Übernahme der angegebenen Menge wurde vom entsprechenden Zuständigen bestätigt #niemandenangetroffen</div>',
        //     replacement: '<div id="bestaetigung">Die Übernahme der angegebenen Menge wurde vom entsprechenden Zuständigen bestätigt #niemandenangetroffen</div>'
        // },
        {
            placeholder: '#PARSE_head',
            replacement: '../pics/KompostmacherAnschrift.jpg'//head
        }
    ];

    function addSignToHTML(html, addition) {
        html = html.replace('<div style="display: none">sign<div/>', addition);
        return html;
    }

    function addProduct() {
        setSelectedInput({...selectedInput, 'products': [...selectedInput.products, currProduct]})
    }

    function submit() {
        collectionConfirmationService.getFormular(selectedInput)
            .then(data => {
                console.log(data);
                data = parseHTMLFormular(data, replacements);
                setDisplaySign('inline');
                setHTMLFormular(data);
            })
            .catch(err => {
                toast.error(err);
            })
    }

    function save() {
        collectionConfirmationService.create({ htmlFormular: addSignToHTML(htmlFormular, `<div id="footer" style="display: ${displaySign}"><div id="unterschriftwrapper"><div id="unterschrift">Unterschrift Kunde: ____________________________________</div></div></div><div style="display: ${displaySign}" id="bestaetigung">Die Übernahme der angegebenen Menge wurde vom entsprechenden Zuständigen bestätigt <div style="display: ${displaySign}"><input name="sign" type="checkbox" ${isChecked} />Niemanden Angetroffen</div></div>`) })
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
                {/*<div style={{display: displaySign}}><input onChange={onChange} name="sign" type="checkbox" checked={isChecked} />Niemanden Angetroffen</div>*/}
                <br/>
                <div id="footer" style={{display: displaySign}}>
                    <div id="unterschriftwrapper">
                        <div id="unterschrift">Unterschrift Kunde: ____________________________________</div>
                    </div>
                </div>
                <div style={{display: displaySign}} id="bestaetigung">Die Übernahme der angegebenen Menge wurde vom entsprechenden Zuständigen bestätigt <div style={{display: displaySign}}><input onChange={onChange} name="sign" type="checkbox"/>Niemanden Angetroffen</div></div>
                <br/>
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