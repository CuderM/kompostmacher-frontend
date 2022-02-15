import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from "react-modal";

import { productService } from '../services/productService';
import { customerService } from '../services/customerService';
import { parseHTMLFormular } from '../services/parseHTMLFormular';
import SelectInputValidation from "./Utils/SelectInputValidation";
import TextInputWithValidation from "./Utils/TextInputValidation";
import CreateProduct from './Modals/CreateProduct'

import DOMPurify from 'dompurify'

import { collectionConfirmationService } from '../services/collectionConfirmationService';

import '../style/DataInput.css'

function DataInput() {
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [currProduct, setCurrProduct] = useState({});
    const [selectedInput, setSelectedInput] = useState({
        customer: '',
        products: [],
        subCustomer: ''
    });
    const [isChecked, setIsChecked] = useState('');
    const [htmlFormular, setHTMLFormular] = useState('');
    const [displaySign, setDisplaySign] = useState('none');


    const [modalIsOpenAddProduct, setModalIsOpenAddProduct] = useState(false);
    
    function closeModalAddProduct(add) {
        setModalIsOpenAddProduct(false);
        // if (newProduct) {
            // addProduct(newProduct);
        // }
        if(add) addProduct(currProduct);
      }

    useEffect(() => {    
        try {           
            customerService.getAll()
                .then(_customers => {
                    console.log(_customers)
                    setCustomers(_customers);
                    if(_customers.length > 0) {
                        setSelectedInput({...selectedInput, 'customer':  _customers[0]});
                        setCustomers(_customers)
                    }
                })
                .catch(err => {
                    toast.error('Failed to load customers', err);
                });
            productService.getAll()
                .then(_products => {
                    console.log(_products)
                    setProducts(_products);
                    if(_products.length > 0)  {
                        setCurrProduct({...currProduct, 'product': _products[0]})
                        setProducts(_products)
                    }
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

    // function getTheme() {
    //     if (!localStorage.getItem("theme")) {
    //       localStorage.setItem("theme", "blackTheme");
    //     }
    //     return localStorage.getItem("theme");
    //   }

    function getCurrentCustomer(name) {
        return customers.find(customer => customer.name === name)
    }

    function getCurrentProduct(name) {
        return products.find(prod => prod.name === name)
    }

    const onChange = (event) => {
        const { name, value } = event.target;
        try {
            switch(name) {
                case 'customer':
                    let customer = getCurrentCustomer(value)
                    setSelectedInput({...selectedInput, [name]: customer});
                    break;
                case 'product':
                    let product = getCurrentProduct(value)
                    setCurrProduct({...currProduct, 'product': product})
                    break;
                case 'amount':
                    setCurrProduct({...currProduct, 'amount': value})
                    break;
                case 'subcustomer':
                    // setSubCustomer(value);
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

    const formValidationInfo= {
        form: {
          valid: true,
          msg: "",
        },
      };

    function addSignToHTML(html, addition) {
        html = html.replace('<div style="display: none">sign<div/>', addition);
        return html;
    }

    function addProduct(newProduct) {
        setSelectedInput({...selectedInput, 'products': [...selectedInput.products, newProduct]})
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
        collectionConfirmationService.create({ to: selectedInput.customer.email, htmlFormular: addSignToHTML(htmlFormular, `<div id="footer" style="display: ${displaySign}"><div id="unterschriftwrapper"><div id="unterschrift">Unterschrift Kunde: ____________________________________</div></div></div><div style="display: ${displaySign}" id="bestaetigung">Die Übernahme der angegebenen Menge wurde vom entsprechenden Zuständigen bestätigt<div style="display: ${displaySign}"><br/><input name="sign" type="checkbox" ${isChecked} />Niemanden Angetroffen</div></div>`) })
            .then(data => {
                console.log(data);
                toast.info(data)
            })
            .catch(err => {
                toast.error(err);
            })
    }

    function getCustomerOptions() {
        let rcs = customers.map((customer) => {
              return { value: customer.name, label: customer.name }
        })
        return rcs
      }

      function getProductOptions() {
        let rcs = products.map((prod) => {
              return { value: prod.name, label: prod.name }
        })
        return rcs
      }

    return (
        <div className='wpGrid'>
            <div className='grayback createGrid'>
                <SelectInputValidation
                    formObject={selectedInput.customer}
                    objectKey="customer"
                    label="Kunde: "
                    onChange={onChange}
                    validClass=" "
                    invalidClass=" "
                    options={getCustomerOptions()}
                ></SelectInputValidation>
                <TextInputWithValidation
                    formObject={{}}
                    objectKey="subcustomer"
                    placeholder="Subkunde"
                    label="Subkunde: "
                    onChange={onChange}
                    validClass=" "
                    invalidClass=" "
                    formValidationInfo={formValidationInfo}
                ></TextInputWithValidation>
                <button 
                    type="submit" 
                    className="button"
                    onClick={() => setModalIsOpenAddProduct(true)/*addProduct*/}>
                    add Produkt
                </button>
                <br/><br/>
                <button 
                    type="submit" 
                    className="button"
                    onClick={submit}>
                    Submit
                </button>
                <br/>
            </div>
            <div className='grayback htmlGrid'>
                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlFormular) }} />
                {/*<div style={{display: displaySign}}><input onChange={onChange} name="sign" type="checkbox" checked={isChecked} />Niemanden Angetroffen</div>*/}
                <br/>
                <div style={{display: displaySign}}>
                    <div id="unterschriftwrapper">
                        <div id="unterschrift">Unterschrift Kunde: ____________________________________</div>
                    </div>
                </div>
                <div style={{display: displaySign}} id="bestaetigung">Die Übernahme der angegebenen Menge wurde vom entsprechenden Zuständigen bestätigt <div style={{display: displaySign}}><input onChange={onChange} name="sign" type="checkbox"/>Niemanden Angetroffen</div></div>
                <button 
                    type="submit" 
                    className="button"
                    onClick={save}>
                    Speichern
                </button>
            </div>
    
            <Modal
                isOpen={modalIsOpenAddProduct}
                onRequestClose={closeModalAddProduct}
                style={customStyles}
                overlayClassName="Overlay"
                ariaHideApp={false}
            >
                <CreateProduct
                    closeModal={closeModalAddProduct}
                    options={getProductOptions()}
                    selectedInput={selectedInput}
                    onChange={onChange}
                ></CreateProduct>
            </Modal>
            
        </div>
    
    )
}
export default DataInput;