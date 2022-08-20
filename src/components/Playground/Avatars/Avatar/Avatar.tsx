import React from 'react'

import styles from './Avatar.module.css'

export default function Avatar({
  id,
  name,
  backgroundColor
}: {
  id: number
  name: string
  backgroundColor: string
}) {
  const color = '%239a9996'
  return (
    <div className={styles.avatar}>
      <img
        src={`https://avatars.dicebear.com/api/bottts/${id}.png?size=64&background=${color}`}
        alt={name}
        height={32}
        width={32}
        className={styles.avatar_picture}
      />
    </div>
  )
}
