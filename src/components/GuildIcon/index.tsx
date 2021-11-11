import React from 'react'
import { styles } from './styles'
import DiscordSVG from '../../assets/discord.svg'
import { Image, View } from 'react-native'

const { CDN_IMAGE } = process.env

type Props = {
    guildID: string
    iconID: string | null
}

export function GuidIcon({ guildID, iconID }: Props) {
    const uri = `${CDN_IMAGE}/icons/${guildID}/${iconID}.png`

    return (
        <View style={styles.container}>
            {iconID ? (
                <Image
                    source={{ uri }}
                    style={styles.image}
                    resizeMode="cover"
                    onError={() => <DiscordSVG width={40} height={40} />}
                />
            ) : (
                <DiscordSVG width={40} height={40} />
            )}
        </View>
    )
}
