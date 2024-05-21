import React, { useState } from 'react';
import Message from './Message';
import TextUpdaterNode from './Message';


export default () => {
    const onDragStart = (event, insideData) => {
        event.dataTransfer.setData('text', insideData);
        event.dataTransfer.effectAllowed = 'move';
    };
    // const [nodeData, setNodeData] = useState("")

    return (
        <aside className='sidebar'>

            <h1 className='header'>Message</h1>
            {/* <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
                Input Node
            </div> */}
            {/* <input type="text" className='message' value={nodeData} onChange={(e) => setNodeData(e.target.value)} /> */}
            <div onDragStart={(event) => onDragStart(event)} draggable>
                <TextUpdaterNode />
            </div>
            {/* <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
                Output Node
            </div> */}
        </aside>
    );
};
