import React, { ReactNode } from 'react'
import { View, Text } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'

import { styles } from './styles'
import { theme } from '../../global/styles/theme'

type Props = {
    title: string
    action?: ReactNode
}

export function Header({ title, action }: Props) {
    const { secondary100, secondary40, heading } = theme.colors
    return (
        <LinearGradient
            colors={[secondary100, secondary40]}
            style={styles.container}
        >
            <BorderlessButton>
                <Feather name={'arrow-left'} size={24} color={heading} />
            </BorderlessButton>

            <Text style={styles.title}>{title}</Text>

            {action && <View>{action}</View>}
        </LinearGradient>
    )
}