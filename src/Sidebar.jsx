import React from 'react';
import Message from './Message';
import TextUpdaterNode from './Message';


export default () => {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className='pannel'>
            <h1 className='header'>Message</h1>
            {/* <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
                Input Node
            </div> */}
            <input type="text" className='message' />
            <div onDragStart={(event) => onDragStart(event, 'default')} draggable>
                <TextUpdaterNode />
            </div>
            {/* <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
                Output Node
            </div> */}
        </aside>
    );
};
