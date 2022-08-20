import { useMap, useOthers, useRedo, useUndo } from '@/config/liveBlocks'
import { useReducer, useState } from 'react'
import { IIconButton } from '../Generals/IconButton/IconButton'
import Canvas from './Canvas/Canvas'
import { ICursor } from './Elements/Cursor/Cursor'
import Box from './Elements/Toolsbar/Elements/Box'
import Capacitor from './Elements/Toolsbar/Elements/Capacitor'
import Pointer from './Elements/Toolsbar/Elements/Pointer'
import Resistor from './Elements/Toolsbar/Elements/Resistor'
import ToolsBar from './Elements/Toolsbar/ToolsBar'
import styles from './styles/Playground.module.css'
import { ShapesNames } from './Canvas/Shapes'
import Undo from './Elements/Toolsbar/Elements/Undo'
import Redo from './Elements/Toolsbar/Elements/Redo'
import AvatarStack from './Avatars/AvatarStack/AvatarStack'
import { CanvasMode } from './Canvas/CanvasMode'

export interface otherCursor extends ICursor {
  id: number
}

export type ToolbarTools =
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

  const [canvasMode, setCanvasMode] = useState<CanvasMode>(CanvasMode.None)
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
        setCanvasMode(CanvasMode.SelectionNet)
      },
      children: <Pointer />
    },
    {
      alt: 'Rectángulo',
      isActive: toolbarElementActive === 'rectangle',
      onClick: () => {
        setSelectedShape('Rectangle')
        setToolbarElementActive('rectangle')
        setCanvasMode(CanvasMode.Inserting)
      },
      children: <Box />
    },
    {
      alt: 'poner una resistencia',
      isActive: toolbarElementActive === 'resistor',
      onClick: () => {
        setToolbarElementActive('resistor')
        setCanvasMode(CanvasMode.Inserting)
      },
      children: <Resistor />
    },
    {
      alt: 'poner un capacitor',
      isActive: toolbarElementActive === 'capacitor',
      onClick: () => {
        setToolbarElementActive('capacitor')
        setCanvasMode(CanvasMode.Inserting)
      },
      children: <Capacitor />
    },
    {
      alt: 'undo',
      isActive: toolbarElementActive === 'undo',
      onClick: () => {
        undo()
        setToolbarElementActive('undo')
        setCanvasMode(CanvasMode.None)
      },
      children: <Undo />
    },
    {
      alt: 'redo',
      isActive: toolbarElementActive === 'redo',
      onClick: () => {
        redo()
        setToolbarElementActive('redo')
        setCanvasMode(CanvasMode.None)
      },
      children: <Redo />
    }
  ]

  return (
    <div className={styles.Container}>
      <div className={styles.AvatarStackContainer}>
        <AvatarStack />
      </div>
      <Canvas
        canvasMode={canvasMode}
        shapes={shapes}
        selectedShape={selectedShape}
        cursors={otherCursorsDefined}
        setCanvasMode={setCanvasMode}
        setSelectedShape={setSelectedShape}
        setToolbarElementActive={setToolbarElementActive}
      />
      <ToolsBar buttons={buttons} />
    </div>
  )
}

export default Playground
