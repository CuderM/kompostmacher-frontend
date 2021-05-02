import React, { useState } from 'react';

import CreatePDF from './PDFCreator';

let kunden;
let produkte;

function createArrays() {
    kunden = [
        {
            'name': 'Geimeinde Wernberg',
            'adresse': 'Bundesstrasse 11',
            'anschrift': '9241 Wernberg'
        },
        {
            'name': 'Geimeinde Villach',
            'adresse': 'Magistratsplatz 1',
            'anschrift': '9500 Villach'
        },
        {
            'name': 'Geimeinde Klagenfurt',
            'adresse': 'Villacherstraße 31',
            'anschrift': '9020 Klagenfurt'
        }
    ];

    produkte = [
        {
            'name': 'Strauchschnitt',
            'einheit': 'm³'
        },
        {
            'name': 'Grünzeugs',
            'einheit': 'l'
        }
    ];

    localStorage.kunden = JSON.stringify(kunden);
    localStorage.produkte = JSON.stringify(produkte);
}

function DataInput() {
    const [active] = useState("DI");
    const [props, setProps] = useState({kid: "", pid: "", menge: ""});

    const [showPDF, setShowPDF] = useState(false);

    const [products, setProdukte] = useState([])

    const [selectedValue, setSelectedValue] = useState();
    const [selectedValuea, setSelectedValuea] = useState({});
    const [selectedValueb, setSelectedValueb] = useState();

    function addProdukt() {
        let prods = products;
        let prod = {
            menge: selectedValueb.menge,
            produkt: produkte.filter(p => {return p.name === selectedValuea})
        }
        prods.push(prod);
        setProdukte(prods);
    }

    createArrays();
    kunden = JSON.parse(localStorage.kunden);
    produkte = JSON.parse(localStorage.produkte);

    return (
        <div>
            {active === "DI" && 
            <div style={{textAlign: "center"}}>
                <select key="kid" onChange={(e) => {setSelectedValue(e.target.value)}}>
                {
                    kunden.map(kunde => {
                        return <option value={kunde.name}>{kunde.name}</option>
                    })
                }
                </select>
                <br/>
                <select select="" key="pid" onChange={(e) => {setSelectedValuea(e.target.value)}}>
                {
                    produkte.map(produkt => {
                        return <option value={produkt.value}>{produkt.name}</option>
                    })
                }
                </select>
                <br/>
                <input 
                    type="number" 
                    id="inputMenge" 
                    placeholder="Menge"
                    name='menge'
                    onChange={e => setSelectedValueb({menge: e.target.value})}
                >
                </input>
                <br/>
                <button 
                    type="submit" 
                    class="btn btn-primary"
                    onClick={() => {setProps({kid: kunden.filter(k => {return k.name === selectedValue}), pid: produkte.filter(p => {return p.name === selectedValuea}), menge: selectedValueb}); addProdukt();}}>
                    Confirm
                </button>
                <button 
                    type="submit" 
                    class="btn btn-primary"
                    onClick={() => { setShowPDF(true)/*setActive("PDF")*/}}>
                    Submit
                </button>
                <br/>
                {showPDF ? <CreatePDF props={{produkte:products, kunde:kunden.filter(k => {return k.name === selectedValue})}}/> : <div/>}
            </div>
            }
            {/*active === "PDF" && <CreatePDF props={props}></CreatePDF>*/}
        </div>
    )
}
export default DataInput;