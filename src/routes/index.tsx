import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes'
import { BackGround } from '../../src/components/Background'

export function Routes() {
    return (
        <BackGround>
            <NavigationContainer>
                <AuthRoutes />
            </NavigationContainer>
        </BackGround>
    )
}
