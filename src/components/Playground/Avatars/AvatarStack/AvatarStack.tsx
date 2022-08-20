import { useOthers, useSelf } from '@/config/liveBlocks'
import { getRandomColor } from '@/Utils/getRandomColor'
import Avatar from '../Avatar/Avatar'
import styles from './AvatarStack.module.css'

export default function AvatarStack() {
  const users = useOthers()
  const currentUser = useSelf() //returns current user in the room

  const threeUsersIds = users.map((user) => user.connectionId).slice(0, 3)

  const hasMoreUsers = users.count > 3

  return (
    <div className={styles.avatar_stack}>
      <div className={styles.avatar_stack}>
        {threeUsersIds.map((connectionId) => {
          return (
            <Avatar
              key={connectionId}
              id={connectionId}
              name={`Usuario anonimo ${connectionId}`}
              backgroundColor={getRandomColor(connectionId)}
            />
          )
        })}

        {hasMoreUsers && (
          <div className={styles.avatar_more}>+{users.count - 3}</div>
        )}
      </div>

      {currentUser && (
        <Avatar
          id={currentUser.connectionId}
          name="You"
          backgroundColor={getRandomColor(0)}
        />
      )}
    </div>
  )
}
