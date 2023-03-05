import React from 'react'
import { Link } from 'react-router-dom'
function Menu() {
    return (
        <section className="top-nav">
            <input id="menu-toggle" type="checkbox" />
            <label className='menu-button-container' htmlFor="menu-toggle">
                <div className='menu-button'></div>
            </label>
            <ul className="menu">
                <li><Link to="/table">Table</Link></li>
                <li><Link to="/form">Form</Link></li>
            </ul>
        </section>
    )
}

export default Menu