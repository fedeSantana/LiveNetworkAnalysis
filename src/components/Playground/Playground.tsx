import { useMap, useOthers, useRedo, useUndo } from '@/config/liveBlocks'
import { useState } from 'react'
import { IIconButton } from '../Generals/IconButton/IconButton'
import Canvas from './Canvas/Canvas'
import { ICursor } from './Elements/Cursor/Cursor'
import Rectangle, { IRectangle } from './Canvas/Shapes/Rectangle'
import Box from './Elements/Toolsbar/Elements/Box'
import Capacitor from './Elements/Toolsbar/Elements/Capacitor'
import Pointer from './Elements/Toolsbar/Elements/Pointer'
import Resistor from './Elements/Toolsbar/Elements/Resistor'
import ToolsBar from './Elements/Toolsbar/ToolsBar'
import styles from './styles/Playground.module.css'
import { ShapesNames } from './Canvas/Shapes'
import { ClickEventsNames } from './ClickEvents/ClickEventsNames'
import Undo from './Elements/Toolsbar/Elements/Undo'
import Redo from './Elements/Toolsbar/Elements/Redo'

export interface otherCursor extends ICursor {
  id: number
}

type ToolbarTools =
  | 'pointer'
  | 'rectangle'
  | 'resistor'
  | 'capacitor'
  | 'undo'
  | 'redo'

function Playground() {
  const others = useOthers()
  const othersCursors = others.map((user) => {
    if (user.presence) {
      return {
        ...user.presence.cursor,
        id: user.connectionId
      }
    }
  })
  const [selectedShape, setSelectedShape] = useState<ShapesNames | false>(
    false
  )
  const [toolbarElementActive, setToolbarElementActive] = useState<
    ToolbarTools | false
  >(false)

  const otherCursorsDefined = othersCursors.filter(
    (cursor): cursor is otherCursor => cursor != undefined
  )
  const shapes = useMap('shapes')

  const undo = useUndo()
  const redo = useRedo()

  if (shapes == null) {
    return <div className="loading">Loading</div>
  }

  const buttons: IIconButton[] = [
    {
      alt: 'Mouse selector',
      isActive: toolbarElementActive === 'pointer',
      onClick: () => {
        setToolbarElementActive('pointer')
      },
      children: <Pointer />
    },
    {
      alt: 'Rectángulo',
      isActive: toolbarElementActive === 'rectangle',
      onClick: () => {
        setSelectedShape('Rectangle')
        setToolbarElementActive('rectangle')
      },
      children: <Box />
    },
    {
      alt: 'poner una resistencia',
      isActive: toolbarElementActive === 'resistor',
      onClick: () => {
        setToolbarElementActive('resistor')
      },
      children: <Resistor />
    },
    {
      alt: 'poner un capacitor',
      isActive: toolbarElementActive === 'capacitor',
      onClick: () => {
        setToolbarElementActive('capacitor')
      },
      children: <Capacitor />
    },
    {
      alt: 'undo',
      isActive: toolbarElementActive === 'undo',
      onClick: () => {
        undo()
        setToolbarElementActive('undo')
      },
      children: <Undo />
    },
    {
      alt: 'redo',
      isActive: toolbarElementActive === 'redo',
      onClick: () => {
        redo()
        setToolbarElementActive('redo')
      },
      children: <Redo />
    }
  ]

  return (
    <div className={styles.Container}>
      <div>Users: {others.count}</div>
      <Canvas
        shapes={shapes}
        cursors={otherCursorsDefined}
        selectedShape={selectedShape}
        setSelectedShape={setSelectedShape}
      />
      <ToolsBar buttons={buttons} />
    </div>
  )
}

export default Playground
