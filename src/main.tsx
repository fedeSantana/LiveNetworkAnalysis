import { LiveMap } from '@liveblocks/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { RoomProvider } from './config/liveBlocks'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RoomProvider
      id="livenetworkanalysis"
      initialStorage={{
        shapes: new LiveMap()
      }}
    >
      <App />
    </RoomProvider>
  </React.StrictMode>
)
