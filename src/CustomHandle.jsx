import React, { useMemo } from 'react';
import { getConnectedEdges, Handle, useNodeId, useStore } from 'reactflow';

const selector = (s) => ({
    nodeInternals: s.nodeInternals,
    edges: s.edges,
});

const CustomHandle = (props) => {
    const { nodeInternals, edges } = useStore(selector);
    const nodeId = useNodeId();

    const isHandleConnectable = useMemo(() => {
        if (typeof props.isConnectable === 'function') {
            const node = nodeInternals.get(nodeId);
            const connectedEdges = getConnectedEdges([node], edges);

            return props.isConnectable({ node, connectedEdges });
        }

        if (typeof props.isConnectable === 'number') {
            // console.log(typeof nodeId);
            // if (typeof nodeId == "object") return
            if (nodeId == undefined) return
            const node = nodeInternals.get(nodeId);
            // console.log(node);


            const connectedEdges = getConnectedEdges([node], edges);
            // console.log(connectedEdges);

            const edgesLength = connectedEdges.reduce((total, edge) => {

                if (edge.source == node.id) {
                    total = total + 1
                }
                return total
            }, 0)
            // console.log(edgesLength);

            return edgesLength < props.isConnectable;
        }

        return props.isConnectable;
    }, [nodeInternals, edges, nodeId, props.isConnectable]);

    return (
        <Handle {...props} isConnectable={isHandleConnectable}></Handle>
    );
};

export default CustomHandle;
