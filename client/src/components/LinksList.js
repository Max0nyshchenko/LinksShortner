import React from 'react'
import {Link} from 'react-router-dom'

export  const LinksList = ({links}) => {
    if(!links.length) {
        return <p className={'center'}>No Links Yet..</p>
    }
    links.sort((a, b)=>b.clicks - a.clicks);
    return (

        <table className={"striped  highlight  responsive-table"}>
            <thead>
            <tr>
                <th>№</th>
                <th>Original link</th>
                <th>Shorten link</th>
                <th>Number of clicks</th>
                <th>Open</th>
            </tr>
            </thead>

            <tbody>
            {
                links.map((link,idx) => {
                    return (
                        <tr key={link._id}>
                            <td>{idx + 1}</td>
                            <td>{link.from}</td>
                            <td>{link.to}</td>
                            <td>{link.clicks}</td>
                            <td>
                                <Link to={`/detail/${link._id}`}>Open</Link>
                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>

    )
}