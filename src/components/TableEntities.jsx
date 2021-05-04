import React from 'react'
import { useHistory } from 'react-router-dom';
// import '../style/Login.css';

export default function TableEntities(props) {
    const { tableHeader, sortBy, getSortSymbol, _delete, entities, entity, formUrl, openForm } = props;
    const history = useHistory();

    const openCreateForm = () => {
        history.push('/SimpleForm');
    }

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
                    {entities && entities.map((ent) => 
                        <tr key={ent._id} onClick={() => openForm(formUrl + ent._id, entity)}>
                            { delete ent.password }
                            {   Object.keys(ent).map(attr => {
                                    if(attr !== '_id') {
                                        var value = ent[attr];
                                        return <td>{value}</td>
                                    }
                                    return {}
                                })
                            }
                            <td>
                                <button className="btn-sm btn-danger" 
                                    onClick={() => _delete(ent)}>
                                    X
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>,
        <button className="btn btn-secondary btn-in-list"
            onClick={() => openCreateForm(formUrl + 'new')}>
            add new { entity }
        </button>
    ]
}