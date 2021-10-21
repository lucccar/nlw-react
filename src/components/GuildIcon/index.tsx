import React from 'react'
import { styles } from './styles'
import { Image } from 'react-native'

export function GuidIcon() {
    const uri =
        'https://vignette.wikia.nocookie.net/spartaremix/images/e/ec/Discord-new-logo.png'
    return (
        <Image source={{ uri }} style={styles.image} resizeMode="cover"></Image>
    )
}
