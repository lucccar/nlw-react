import React from 'react'
import { styles } from './styles'
import { Image } from 'react-native'

export function GuidIcon() {
    const uri = 'http://getdrawings.com/free-icon/green-discord-icon-60.png'
    return (
        <Image source={{ uri }} style={styles.image} resizeMode="cover"></Image>
    )
}
