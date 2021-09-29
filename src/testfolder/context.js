import React, { useState, createContext } from 'react'

const ctx = createContext({})

const Provider = ({ children }) => {
    const [stat, setStat] = useState({});

    return (
        <ctx.Provider value={{stat, setStat}}>
            {children}
        </ctx.Provider>
    )
}

export default Provider
export { ctx }