import { formatDate } from './date-formatter';

const createPDF = props => {
    let { kunde, produkte } = props.props;

    kunde = kunde[0];

    return (
        <div style={{width: "210mm", height: "297mm", textAlign: "center"}}>
            <img src={ require('../pics/KompostmacherAnschrift.jpg') } alt="Kompostmacher Anschrift"></img>
            <div style={{display: "table", width: "100%"}}>
                <div style={{display: "table-cell"}}>
                    <p><strong>An:</strong></p>
                    <p>{kunde.name}</p>
                    <p>{kunde.adresse}</p>
                    <p>{kunde.anschrift}</p>
                </div>
                <div style={{display: "table-cell"}}>
                    <p>Subkunde: <input></input></p>
                </div>
                <div style={{display: "table-cell"}}>
                    <p>Datum: {formatDate(Date.now())}</p>
                </div>
            </div>
            <br/>
            <p><strong>&Uuml;bernahmeschein: WUS001</strong></p>
            <table style={{borderCollapse: "collapse", width: "100%"}} border="1">
                <tbody>
                    <tr>
                        <td><strong>Menge</strong></td>
                        <td><strong>Einheit</strong></td>
                        <td><strong>Produkt</strong></td>
                    </tr>
                    {
                        produkte && produkte.map(prod => 
                            <tr>
                                <td><strong>{prod.menge}</strong></td>
                                <td><strong>{prod.produkt[0].einheit}</strong></td>
                                <td><strong>{prod.produkt[0].name}</strong></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <br/>
            <div style={{textAlign: "center"}}>
                <p>Unterschrift Kunde:<input></input></p>
                <input type="checkbox"/>Niemanden Angetroffen
            </div>
        </div>
    )
}

export default createPDF;