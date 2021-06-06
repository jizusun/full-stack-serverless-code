import { HashRouter } from "react-router-dom";
import { useState } from "react";
import Nav from './Nav'

const Router = () => {
    const [current, setCurrent] = useState('home')
    return (

        <HashRouter>
            <Nav current={current}/>
        </HashRouter>
    )
}

export default Router