import Reac from 'react'
import { styles } from './styles'
import { Text, View } from 'react-native'
import { RectButtonProps, RectButton } from 'react-native-gesture-handler'

export type GuildProps = {}

export type AppointmentProps = {
    id: string
    guild: GuildProps
    category: string
    date: string
    description: string
}

type Props = RectButtonProps & {
    data: AppointmentProps
}

export function Appointments({ data, ...rest }: Props) {
    return (
        <RectButton {...rest}>
            <View style={styles.container}></View>
        </RectButton>
    )
}
