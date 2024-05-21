import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';


import Sidebar from './Sidebar';

import './App.css';
import Message from './Message';
import TextUpdaterNode from './Message';
import { createContext } from 'react';
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
      data: { label: "shiva" }
    },
  ];
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodeMessage, setNodeMessage] = useState("")
  const [nodeClick, setNodeClick] = useState(false)
  const [nodeId, setNodeId] = useState(0)

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
      // console.log(JSON.parse(localStorage.getItem(flowKey)));
    }
  }, [reactFlowInstance]);

  // const onRestore = useCallback(() => {
  //   const restoreFlow = async () => {
  //     const flow = JSON.parse(localStorage.getItem(flowKey));

  //     if (flow) {
  //       const { x = 0, y = 0, zoom = 1 } = flow.viewport;
  //       setNodes(flow.nodes || []);
  //       setEdges(flow.edges || []);
  //       setViewport({ x, y, zoom });
  //     }
  //   };

  //   restoreFlow();
  // }, [setNodes, setViewport]);



  useEffect(() => {
    console.log(nodes);
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

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      // const insideData = event.dataTransfer.getData('text');
      // console.log(insideData);
      // setNodeMessage(insideData)
      // check if the dropped element is valid
      // if (typeof type === 'undefined' || !type) {
      //   return;
      // }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      // console.log(getId());
      const newNode = {
        id: getId(),
        type: 'textUpdater',
        position,
        data: { label: "shiva" },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );
  const onNodeClick = useCallback((event, node) => {
    // if (node.data)
    console.log(node);
    setNodeMessage(node.data.label)
    setNodeId(node.id)
    setNodeClick(true)

    // Do something with the data, such as displaying it in a modal or saving it to a database.

  })
  console.log(nodeClick);
  console.log(nodeMessage);
  console.log(nodeId);

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
            <Panel position="top-right">

              <div className='panel'>

                <button onClick={onSave()}>save flow</button>

                {/* <button onClick={onRestore()}>Restore flow</button> */}
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
