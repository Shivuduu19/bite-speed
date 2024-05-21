import React from 'react'

const SettingsBar = ({ nodeMessage, setNodeMessage, setNodeClick }) => {


    return (
        <div className='settings'>
            <div>
                <button onClick={() => setNodeClick(false)}>back</button>
            </div>
            <div className='settingsHeader'>message</div>
            <div className='settingsInput'>
                <input type="text" placeholder='type message' className='message' value={nodeMessage} onChange={(e) => setNodeMessage(e.target.value)} />
            </div>
        </div>
    )
}

export default SettingsBar