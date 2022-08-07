import { useMap, useOthers } from '@/config/liveBlocks'
import { IIconButton } from '../Generals/IconButton/IconButton'
import Canvas from './Canvas/Canvas'
import { ICursor } from './Elements/Cursor/Cursor'
import Box from './Elements/Toolsbar/Elements/Box'
import Capacitor from './Elements/Toolsbar/Elements/Capacitor'
import Pointer from './Elements/Toolsbar/Elements/Pointer'
import Resistor from './Elements/Toolsbar/Elements/Resistor'
import ToolsBar from './Elements/Toolsbar/ToolsBar'
import styles from './styles/Playground.module.css'

function Playground() {
  const others = useOthers()
  const othersCursors = others.map((user) => {
    if (user.presence) {
      return user.presence.cursor
    }
  })

  const otherCursorsDefined = othersCursors.filter(
    (cursor): cursor is ICursor => cursor != undefined
  )
  const shapes = useMap('shapes')

  if (shapes == null) {
    return <div className="loading">Loading</div>
  }

  const buttons: IIconButton[] = [
    {
      alt: 'Mouse selector',
      isActive: false,
      onClick: () => {
        console.info('you clicked me!')
      },
      children: <Pointer />
    },
    {
      alt: 'poner un cuadrado',
      isActive: false,
      onClick: () => {
        console.info('you clicked me!')
      },
      children: <Box />
    },
    {
      alt: 'poner una resistencia',
      isActive: false,
      onClick: () => {
        console.info('you clicked me!')
      },
      children: <Resistor />
    },
    {
      alt: 'poner un capacitor',
      isActive: false,
      onClick: () => {
        console.info('You clicked me!')
      },
      children: <Capacitor />
    }
  ]

  return (
    <div className={styles.Container}>
      <div>Users: {others.count}</div>
      <Canvas shapes={shapes} cursors={otherCursorsDefined} />
      <ToolsBar buttons={buttons} />
    </div>
  )
}

export default Playground
