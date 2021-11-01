import { styles } from './styles'
import React, { ReactNode } from 'react'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Fontisto } from '@expo/vector-icons'
import { FlatList, ImageBackground, Text, View } from 'react-native'

import { BackGround } from '../../components/Background'
import { Header } from '../../components/Header'
import { Member } from '../../components/Member'
import { ListHeader } from '../../components/ListHeader'
import { ListDivider } from '../../components/ListDivider'
import { ButtonIcon } from '../../components/ButtonIcon'
import { theme } from '../../global/styles/theme'
import BannerImg from '../../assets/banner.png'

export function AppointmentDetails() {
    const members = [
        {
            id: '1',
            username: 'Lucas',
            avatar_url: 'https://github.com/lucccar.png',
            status: 'online',
        },
        {
            id: '2',
            username: 'Vinícius',
            avatar_url: 'https://github.com/vinibs.png',
            status: 'offline',
        },
        {
            id: '3',
            username: 'Joana',
            avatar_url: 'https://github.com/joanna12.png',
            status: 'online',
        },
        {
            id: '4',
            username: 'Rodolfo',
            avatar_url: 'https://github.com/rodlottin.png',
            status: 'offline',
        },
        {
            id: '5',
            username: 'Pinga',
            avatar_url: 'https://github.com/urataki.png',
            status: 'online',
        },
        {
            id: '6',
            username: 'Vinícius',
            avatar_url: 'https://github.com/vinibs.png',
            status: 'offline',
        },
    ]
    return (
        <BackGround>
            <Header
                title={'Detalhes'}
                action={
                    <BorderlessButton>
                        <Fontisto
                            name="share"
                            size={24}
                            color={theme.colors.primary}
                        />
                    </BorderlessButton>
                }
            />
            <ImageBackground source={BannerImg} style={styles.banner}>
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>Lendários</Text>
                    <Text style={styles.subtitle}>
                        É hoje que vamos do Diamante ao Ferro 2!
                    </Text>
                </View>
            </ImageBackground>
            <ListHeader
                title={'Jogadores'}
                subtitle={`Total ${members.length}`}
            />
            <FlatList
                data={members}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Member data={item} />}
                ItemSeparatorComponent={ListDivider}
                style={styles.members}
            />
            <View style={styles.footer}>
                <ButtonIcon title={'Entrar na partida'} />
            </View>
        </BackGround>
    )
}
