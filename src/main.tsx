import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { RoomProvider } from './config/liveBlocks'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RoomProvider id="my-room-id">
      <App />
    </RoomProvider>
  </React.StrictMode>
)
