import React, { useContext } from 'react';

import { ctx } from './context';

export default function SmplForm(props) {
    const { stat, setStat } = useContext(ctx);

    console.log('im here ', stat, setStat)

    setStat({sampleData: 'blabla'})

    return <p>{stat}</p>;
}