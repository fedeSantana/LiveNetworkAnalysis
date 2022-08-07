import { IShapes, useUpdateMyPresence } from '../../../config/liveBlocks'
import Rectangle from '../Elements/Rectangle/Rectangle'
import Cursor, { ICursor } from '../Elements/Cursor/Cursor'
import styles from './Canvas.module.css'

interface ICanvas {
  shapes: IShapes
  cursors: ICursor[]
}

function Canvas({ shapes, cursors }: ICanvas) {
  const updateMyPresence = useUpdateMyPresence()

  const Cursors = cursors.map((cursor) => (
    <Cursor x={cursor.x} y={cursor.y} color={cursor.color} />
  ))

  return (
    <div
      className={styles.Canvas}
      onPointerMove={(e) =>
        updateMyPresence({ cursor: { x: e.clientX, y: e.clientY } })
      }
    >
      {Array.from(shapes, ([shapeId, shape]) => {
        return (
          <Rectangle
            key={shapeId}
            x={shape.x}
            y={shape.y}
            fill={shape.fill}
          />
        )
      })}
      {Cursors}
    </div>
  )
}

export default Canvas
