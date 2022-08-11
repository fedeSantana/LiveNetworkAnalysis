import { useState, useEffect } from 'react'

interface IMousePosition {
  x: null | number
  y: null | number
}

/**
 * @author Josh Comeau
 * @link [Post que explica su uso](https://www.joshwcomeau.com/snippets/react-hooks/use-mouse-position/)
 * @returns Devuelve la posición del mouse
 */
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<IMousePosition>({
    x: null,
    y: null
  })

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY })
    }

    window.addEventListener('mousemove', updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  return mousePosition
}

export default useMousePosition
