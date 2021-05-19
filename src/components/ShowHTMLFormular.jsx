import { useState } from 'react';
import { useParams} from 'react-router-dom';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify'
import { collectionConfirmationService } from '../services/collectionConfirmationService';

import '../style/Abholbestaetigung.css';

const ShowHTMLFormular = () => {
    let { id } = useParams();
    const [ html, setHTML ] = useState('nothing to show');

    collectionConfirmationService.getById(id)
        .then(data => {
            setHTML(data.htmlFormular);
        })
        .catch(err => {
            toast.error('error while loading HTML -> ' + err);
        })
    return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
}

export default ShowHTMLFormular