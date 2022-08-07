import styles from './IconButton.module.css'

export type IIconButton = {
  onClick: () => void
  isActive: boolean
  alt: string
  children: JSX.Element // Must be a svg
}

export default function IconButton({
  onClick,
  isActive,
  alt,
  children
}: IIconButton) {
  return (
    <button
      aria-label={alt}
      className={`${styles.button} ${
        isActive ? styles.button_active : ''
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
