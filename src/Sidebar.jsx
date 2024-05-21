import React, { useState } from 'react';
import TextUpdaterNode from './Message';


export default () => {

    const onDragStart = (event, insideData) => {
        event.dataTransfer.setData('text', insideData);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <aside className='sidebar'>
            <h1 className='header'>Message</h1>
            <div onDragStart={(event) => onDragStart(event)} draggable>
                {/* custom node */}
                <TextUpdaterNode />
            </div>
        </aside>
    );
};
