import React, { useState, useEffect } from 'react';
import './Rplace.css';

const RPlaceGrid = () => {
  const [ws, setWs] = useState(null);
  const [connected, setConnected] = useState(false);
  const [coloredBoxes, setColoredBoxes] = useState(new Set());
  
  useEffect(() => {
    const wsUrl = 'wss://websocket-859x.onrender.com';
    const websocket = new WebSocket(wsUrl);

    websocket.onopen = () => {
      console.log('Connected to WebSocket');
      setConnected(true);
    };

    websocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'boxClick') {
          setColoredBoxes(prev => {
            const newSet = new Set(prev);
            // Toggle the box: remove if exists, add if doesn't
            if (newSet.has(data.boxNumber)) {
              newSet.delete(data.boxNumber);
            } else {
              newSet.add(data.boxNumber);
            }
            return newSet;
          });
        }
      } catch (error) {
        console.error('Error processing WebSocket message:', error);
      }
    };

    websocket.onclose = () => {
      console.log('Disconnected from WebSocket');
      setConnected(false);
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, []);

  const handleBoxClick = (boxNumber) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'boxClick',
        boxNumber: boxNumber
      }));
      
    }
  };

  return (
    <div className="rplace-container">
      <h1 className="rplace-title">RPlace</h1>
      <div className={`connection-status ${connected ? 'connected' : ''}`}>
        {connected ? '🟢 WebSocket Connected' : '🔴 WebSocket Disconnected'}
      </div>
      
      <div className="grid-container">
        {Array.from({ length: 25 }, (_, i) => (
          <div
            key={i}
            className={`grid-box ${coloredBoxes.has(i) ? 'colored' : ''}`}
            onClick={() => handleBoxClick(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default RPlaceGrid;