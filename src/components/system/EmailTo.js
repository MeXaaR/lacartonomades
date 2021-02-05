import React from 'react'

const EmailTo = ({ value,  placeId, label }) => (
    <p>
        <b>{label} : </b>
        <a className="email-link" href={`mailto:${value}`}>{value}</a>
    </p>
)

export default EmailTo