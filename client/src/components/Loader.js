import React from  'react'

export const Loader = () => {
    return (

        <div className={'section container'}>
            <h6>Loading...</h6>
            <div className="progress">
                <div className="indeterminate"></div>
            </div>
        </div>

    )
}