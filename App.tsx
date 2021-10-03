import React from 'react'
import { StatusBar } from 'react-native'
import { useFonts } from 'expo-font'
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter'
import {
    Rajdhani_500Medium,
    Rajdhani_700Bold,
} from '@expo-google-fonts/rajdhani'
import AppLoading from 'expo-app-loading'
import { BackGround } from './src/components/Background'

import { SignIn } from './src/screens/SignIn'

export default function App() {
    const [fontsLoadded] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Rajdhani_500Medium,
        Rajdhani_700Bold,
    })

    if (!fontsLoadded) {
        return <AppLoading />
    }

    return (
        <BackGround>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <SignIn />
        </BackGround>
    )
}
