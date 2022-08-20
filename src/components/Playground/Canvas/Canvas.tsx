import React from 'react'
import { IShapes, useUpdateMyPresence } from '../../../config/liveBlocks'
import Rectangle from './Shapes/Rectangle'
import Cursor from '../Elements/Cursor/Cursor'
import styles from './Canvas.module.css'
import SelectedShape, { ShapesNames } from './Shapes'
import useMousePosition from '@/hooks/useMousePosition'
import insertRectangle from '../Elements/Toolsbar/Functions/insertRectangle'
import { otherCursor, ToolbarTools } from '../Playground'
import { getRandomColor } from '@/Utils/getRandomColor'
import { CanvasMode } from './CanvasMode'

interface ICanvas {
  shapes: IShapes
  cursors: otherCursor[]
  selectedShape: ShapesNames | false
  setSelectedShape: React.Dispatch<
    React.SetStateAction<false | ShapesNames>
  >
  canvasMode: CanvasMode
  setCanvasMode: React.Dispatch<React.SetStateAction<CanvasMode>>
  setToolbarElementActive: React.Dispatch<
    React.SetStateAction<false | ToolbarTools>
  >
}

function Canvas({
  shapes,
  cursors,
  selectedShape,
  setCanvasMode,
  setSelectedShape,
  setToolbarElementActive,
  canvasMode
}: ICanvas) {
  const updateMyPresence = useUpdateMyPresence()

  const otherCursors = cursors.map((cursor) => (
    <Cursor
      x={cursor.x}
      y={cursor.y}
      color={getRandomColor(cursor.id)}
      key={cursor.id}
    />
  ))
  const myCursor = useMousePosition()

  return (
    <div
      className={styles.Canvas}
      onPointerMove={(e) => {
        if (canvasMode === CanvasMode.SelectionNet) {
          updateMyPresence({ cursor: { x: e.clientX, y: e.clientY } })
        } else {
          updateMyPresence({ cursor: { x: 0, y: 0 } })
        }
      }}
      onClick={() => {
        if (selectedShape && canvasMode === CanvasMode.Inserting) {
          insertRectangle(shapes, {
            name: 'Rectangle',
            x: myCursor.x ?? 0,
            y: myCursor.y ?? 0,
            fill: '#D97706'
          })
          setSelectedShape(false)
          setCanvasMode(CanvasMode.None)
          setToolbarElementActive(false)
        }
      }}
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
      {otherCursors}
      {canvasMode === CanvasMode.Inserting &&
        selectedShape &&
        myCursor.x &&
        myCursor.y && (
          <SelectedShape
            name={selectedShape}
            x={myCursor.x}
            y={myCursor.y}
            fill={'#D97706'}
          />
        )}
    </div>
  )
}

export default Canvas
