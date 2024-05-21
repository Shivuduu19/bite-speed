import { memo, useCallback } from 'react';
import { Handle, Position, useNodeId, useReactFlow } from 'reactflow';
import CustomHandle from './CustomHandle';



function TextUpdaterNode({ data }) {
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    const handleClick = () => {
        const nodeId = useNodeId()
        const flow = useReactFlow()
    }

    return (
        <div className='customNode' onNodeClick={() => handleClick}>
            <Handle type="target" position={Position.Left} />
            <CustomHandle type="source" position={Position.Right} isConnectable={1} />

            <div className="panelElement">
                <div className='messageHeading'> Send Message</div>
                <div className='actualMessage'>{data?.label}</div>

            </div>
        </div>
    );
}

export default memo(TextUpdaterNode);