import { memo, useCallback } from 'react';
import { Handle, Position, useNodeId, useStore, useReactFlow } from 'reactflow';
import CustomHandle from './CustomHandle';



function TextUpdaterNode({ data }) {
    const onChange = useCallback((evt) => {
        console.log(evt.target.value);
    }, []);

    const handleClick = () => {
        const nodeId = useNodeId()
        // console.log(nodeId);
        const flow = useReactFlow()
        // console.log(flow.getNode(nodeId));
    }

    // const node = data
    // console.log(setNodeData);
    // console.log(data);
    const store = useStore();
    return (
        <div className='customNode' onNodeClick={() => handleClick}>
            <Handle type="target" position={Position.Left} />
            <CustomHandle type="source" position={Position.Right} isConnectable={1} />

            <div className="panelElement">
                <div className='messageHeading'> Send Message</div>
                <div className='actualMessage'>{data?.label}</div>

                {/* <div className='actualMessage'>{nodeData}</div> */}
            </div>
        </div>
    );
}

export default memo(TextUpdaterNode);