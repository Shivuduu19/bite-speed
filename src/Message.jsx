import { memo, useCallback } from 'react';
import { Handle, Position, useNodeId } from 'reactflow';
import CustomHandle from './CustomHandle';

const handleStyle = { left: 10 };

function TextUpdaterNode() {
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);
    return (
        <div style={{ background: 'white' }}>
            <Handle type="target" position={Position.Left} />
            <CustomHandle type="source" position={Position.Right} isConnectable={1} />

            <div className="panelElement">
                <div className='messageHeading'> Send Message</div>
                <div className='actualMessage'></div>
            </div>
        </div>
    );
}

export default memo(TextUpdaterNode);