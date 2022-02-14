import { useState } from 'react';
import { useParams, useHistory} from 'react-router-dom';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify'
import { collectionConfirmationService } from '../services/collectionConfirmationService';

const ShowHTMLFormular = () => {
    const history = useHistory();
    let { id } = useParams();
    const [ html, setHTML ] = useState('nothing to show');

    collectionConfirmationService.getById(id)
        .then(data => {
            setHTML(data.htmlFormular);
        })
        .catch(err => {
            if(id === 'new') history.push('/workingpage');
            else toast.error('error while loading HTML -> ' + err);
        })
    return <div><div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} /></div>
}

export default ShowHTMLFormular