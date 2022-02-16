import React from 'react'
import '../../style/TableEntities.css';

export default function TableEntities(props) {
    const { className, tableHeader, sortBy, getSortSymbol, _delete, entities, entity, openForm, formUrl} = props;

    return (
        <div className={"" + className}>
            <button className="button topRight"
                onClick={() => openForm(entity, 'new')}>
                { entity } erstellen
            </button>
            <h4>{entity}</h4> 
            <table className="Table">
                <thead className="">
                    <tr>
                        {tableHeader.map(headerCol => {
                            return (
                                <th key={`th_${headerCol.key}`} onClick={headerCol.sortable ? () => sortBy(headerCol.key) : () => {}}>
                                    <span className='sortable-column-symbol'>
                                        <i className={headerCol.sortable ? getSortSymbol(headerCol) : ''}>
                                            {headerCol.label}
                                        </i>
                                    </span>
                                </th>
                            )
                        }
                        )}
                    </tr>
                </thead>
                <tbody>
                    {entities && entities.map((ent) => 
                        <tr key={ent._id}>
                            { delete ent.password }
                            {
                                tableHeader.map(headerCol => {
                                    var value = ent[headerCol.key];
                                    let para1 = formUrl ? formUrl + ent._id : entity
                                    let para2 = formUrl ? entity : ent
                                    return <td key={'td_' + ent._id + '_' + headerCol.key} onClick={() => openForm(para1, para2)}>{value}</td>
                                })
                            }
                            {   
                                // Object.keys(ent).map(attr => {
                                //     if(attr !== '_id' && attr !== 'userId' && attr !== 'adminId' && attr !== 'admin' && attr !== 'htmlFormular') {
                                //         var value = ent[attr];

                                //         let para1 = formUrl ? formUrl + ent._id : entity
                                //         let para2 = formUrl ? entity : ent
                                //         return <td key={'td_' + ent._id + '_' + attr} onClick={() => openForm(para1, para2)}>{value}</td>
                                //     }
                                //     return ''
                                // })
                            }
                            <td key={'td_' + ent._id} className="buttonTd">
                                <button class="buttonDelete bi bi-trash" 
                                    onClick={() => _delete(ent)}>
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            
        </div>
    )
}