import React, { useState} from 'react';

import DataInput from '../../src/components/DataInput';

function WorkingPage() {
    const [active] = useState("DI");

    return (
        <div>
            {active === "DI" && <DataInput></DataInput>}
        </div>
    )
}

export default WorkingPage;