import {
  createClient,
  JsonObject,
  LiveMap,
  LsonObject
} from '@liveblocks/client'
import { createRoomContext } from '@liveblocks/react'
import { IRectangle } from '../components/Playground/Canvas/Shapes/Rectangle'
import { ICursor } from '../components/Playground/Elements/Cursor/Cursor'

const client = createClient({
  publicApiKey: import.meta.env.VITE_liveBlocksPublicKey
})

interface TPresence extends JsonObject {
  cursor: ICursor
}

export type IShapes = LiveMap<string, IRectangle>

interface TStorage extends LsonObject {
  shapes: IShapes
}

export const {
  RoomProvider,
  useOthers,
  useMyPresence,
  useUpdateMyPresence,
  useMap,
  useUndo,
  useRedo
} = createRoomContext<TPresence, TStorage>(client)
