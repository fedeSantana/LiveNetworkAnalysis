import React from 'react'
import { IShapes, useUpdateMyPresence } from '../../../config/liveBlocks'
import Rectangle from './Shapes/Rectangle'
import Cursor, { ICursor } from '../Elements/Cursor/Cursor'
import styles from './Canvas.module.css'
import SelectedShape, { ShapesNames } from './Shapes'
import useMousePosition from '@/hooks/useMousePosition'
import { ClickEventsNames } from '../ClickEvents/ClickEventsNames'
import insertRectangle from '../Elements/Toolsbar/Functions/insertRectangle'
import { otherCursor } from '../Playground'

interface ICanvas {
  shapes: IShapes
  cursors: otherCursor[]
  selectedShape: ShapesNames | false
  setSelectedShape: React.Dispatch<
    React.SetStateAction<false | ShapesNames>
  >
}

const COLORS = ['#DC2626', '#D97706', '#059669', '#7C3AED', '#DB2777']

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

function getRandomColor(): string {
  return COLORS[getRandomInt(COLORS.length)]
}

function Canvas({
  shapes,
  cursors,
  selectedShape,
  setSelectedShape
}: ICanvas) {
  const updateMyPresence = useUpdateMyPresence()

  const otherCursors = cursors.map((cursor) => (
    <Cursor
      x={cursor.x}
      y={cursor.y}
      color={COLORS[cursor.id % COLORS.length]}
      key={cursor.id}
    />
  ))
  const myCursor = useMousePosition()

  return (
    <div
      className={styles.Canvas}
      onPointerMove={(e) =>
        updateMyPresence({ cursor: { x: e.clientX, y: e.clientY } })
      }
      onClick={() => {
        selectedShape &&
          insertRectangle(shapes, {
            name: 'Rectangle',
            x: myCursor.x ?? 0,
            y: myCursor.y ?? 0,
            fill: '#D97706'
          })
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
      {selectedShape && myCursor.x && myCursor.y && (
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
