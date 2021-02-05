import React from 'react'

const TelTo = ({ value,  placeId, label }) => (
    <p>
        <b>{label} : </b>
        <a className="phone-link" href={`tel:${value}`}>{value}</a>
    </p>
    
)

export default TelTo