import React from 'react'

export const LinkCard = ({ link }) => {
    return (
       <div
           className={'container section white-text z-depth-2 teal darken-3'}
           style={{padding: "2rem", marginTop: "2rem" }}
       >
            <h2>Link</h2>
            <p>Your link: <a href={link.to} target={"_blank"} rel={"noopener noreferrer"} >{link.to}</a></p>
            <p>From: <a href={link.from} target={"_blank"} rel={"noopener noreferrer"} >{link.from}</a></p>
            <p>Numbers of clicks: <strong>{link.clicks}</strong> </p>
           <p>Creation date: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
       </div>
    )
}