import IconButton, {
  IIconButton
} from '../../../Generals/IconButton/IconButton'
import styles from '../../styles/Toolbar.module.css'

interface IToolsBar {
  buttons: IIconButton[]
}

function ToolsBar({ buttons }: IToolsBar) {
  return (
    <div className={styles.tools_panel_container}>
      <div className={styles.tools_panel}>
        <div className={styles.tools_panel_section}>
          {buttons.map((button) => (
            <IconButton
              key={button.alt}
              alt={button.alt}
              isActive={button.isActive}
              onClick={button.onClick}
            >
              {button.children}
            </IconButton>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ToolsBar
