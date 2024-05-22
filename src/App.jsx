import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Panel, getConnectedEdges
} from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './Sidebar';

import './App.css';
import TextUpdaterNode from './Message';
import SettingsBar from './SettingsBar';

let id = 0;
const getId = () => `dndnode_${id++}`;
const flowKey = 'flow-key';

const DnDFlow = () => {
  const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);
  const initialNodes = [
    {
      id: '1',
      type: 'textUpdater',
      position: { x: 250, y: 5 },
      data: { label: "click node to type" }
    },
  ];
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodeMessage, setNodeMessage] = useState("")
  const [nodeClick, setNodeClick] = useState(false)
  const [nodeId, setNodeId] = useState(0)
  const [errorState, setErrorState] = useState("")

  //executes on saving flow

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [reactFlowInstance]);

  // console.log(nodes);
  // console.log(edges);
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            label: nodeMessage,
          };
        }

        return node;
      })
    );
  }, [nodeMessage, setNodeMessage]);

  // console.log(nodes);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );


  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // runs on dragging node to flow
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      // console.log(getId());
      const newNode = {
        id: getId(),
        type: 'textUpdater',
        position,
        data: { label: "click node to type" },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  //runs on clicking node
  const onNodeClick = useCallback((event, node) => {
    // if (node.data)
    event.preventDefault()
    // console.log(node);
    setNodeMessage(node.data.label)
    setNodeId(node.id)
    setNodeClick(true)

    // Do something with the data, such as displaying it in a modal or saving it to a database.

  })

  //this checks if it has more than one node with empty target and saves if it does not find more than one
  const checkAndSave = () => {
    const connectedEdges = getConnectedEdges(nodes, edges);
    setErrorState("")
    const result = nodes.map((node) => {

      const connectedEdges = getConnectedEdges([node], edges);
      // counting any edges to the target
      const edgesLength = connectedEdges.reduce((total, edge) => {
        console.log(edge.target);
        if (edge.target === node.id) {
          total = total + 1
        }
        return total
      }, 0)
      // console.log(edgesLength);
      return edgesLength
      // return connectedEdges
    })

    //counting if there are more than one target with empty connections
    let count = 0
    const nofEmpty = result.map((res) => {
      if (res === 0) {
        count++
      }
    })
    if (count > 1) {
      // console.log("empty more than one");
      setErrorState("empty more than one,So,cannot save the file")
      setTimeout(() => {
        setErrorState("")
      }, 5000);
      return
    }

    onSave()
  }

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            onNodeClick={onNodeClick}
          >
            <Controls />
            <Panel position='top-center'>{errorState}</Panel>
            <Panel position="top-right">

              <div className='panel'>
                <button onClick={checkAndSave}>save flow</button>
                {/* if node is clicked then panel with settings bar appears else nodes bar */}
                {nodeClick ? (
                  <SettingsBar nodeMessage={nodeMessage} setNodeMessage={setNodeMessage} setNodeClick={setNodeClick} />
                ) : (<Sidebar />)}
              </div>
            </Panel>
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
