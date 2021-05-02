import React from 'react'
// import '../style/Login.css';

export default function TableEntities(props) {
    const { tableHeader, sortBy, getSortSymbol, _delete, entities, entity, formUrl, openForm } = props;

    return [
        <br></br>,
        <div className="table-responsive">
            <table className="table table-hover table-borderless table-sm">
                <thead className="thead-dark">
                    <h4 style={{color:'white'}}> {entity}</h4> 
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
                    {entities && entities.map((entity) => 
                        <tr key={entity._id} onClick={() => openForm(formUrl + entity._id)}>
                    { /* <th scope="row">{entity._id}</th> */}
                            { delete entity.password }
                            
                            
                            {   Object.keys(entity).map(attr => {
                                    if(attr !== '_id') {
                                        var value = entity[attr];
                                        return <td>{value}</td>
                                    }
                                })
                            }
                            
                            <td>
                                <button className="btn-sm btn-danger" 
                                    onClick={() => _delete(entity)}>
                                    X
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>,
        <button className="btn btn-secondary btn-in-list"
            onClick={() => openForm(formUrl + 'new')}>
            add new { entity }
        </button>
    ]
}