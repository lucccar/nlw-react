import { styles } from './styles'
import React, { useState, useEffect } from 'react'
import { BorderlessButton } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/core'
import { Fontisto } from '@expo/vector-icons'
import * as Linking from 'expo-linking'
import {
    FlatList,
    ImageBackground,
    Text,
    View,
    Alert,
    Share,
    Platform,
} from 'react-native'

import { AppointmentProps } from '../../components/Appointments'
import { BackGround } from '../../components/Background'
import { Header } from '../../components/Header'
import { Member, MemberProps } from '../../components/Member'
import { ListHeader } from '../../components/ListHeader'
import { ListDivider } from '../../components/ListDivider'
import { ButtonIcon } from '../../components/ButtonIcon'
import { Load } from '../../components/Load'
import { theme } from '../../global/styles/theme'
import BannerImg from '../../assets/banner.png'
import { api } from '../../services/api'

type Params = {
    guildSelected: AppointmentProps
}

type GuildWidget = {
    id: string
    name: string
    instant_invite: string
    members: MemberProps[]
}

export function AppointmentDetails() {
    const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget)
    const [loading, setLoading] = useState(true)

    const route = useRoute()
    const { guildSelected } = route.params as Params

    const navigation = useNavigation()

    async function fetchGuildWidget() {
        try {
            // console.log(guildSelected)
            const response = await api.get(
                `/guilds/${guildSelected.guild.id}/widget.json`
            )
            console.log(response.data)
            setWidget(response.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            Alert.alert('Verifique as configurações do servidor', '', [
                {
                    text: 'OK',
                    onPress: () => {
                        navigation.navigate('Home')
                    },
                    style: 'default',
                },
            ])
            // navigation.navigate('Home')
        }
    }

    function handleShareInvite() {
        const message =
            Platform.OS === 'ios'
                ? `Junte-se a ${guildSelected.guild.name}`
                : widget.instant_invite
        Share.share({
            message,
            url: widget.instant_invite,
        })
    }

    function handleOpenGuild() {
        Linking.openURL(widget.instant_invite)
    }

    useEffect(() => {
        fetchGuildWidget()
    }, [])

    return (
        <BackGround>
            <Header
                title={'Detalhes'}
                action={
                    widget.instant_invite && (
                        <BorderlessButton onPress={handleShareInvite}>
                            <Fontisto
                                name="share"
                                size={24}
                                color={theme.colors.primary}
                            />
                        </BorderlessButton>
                    )
                }
            />
            <ImageBackground source={BannerImg} style={styles.banner}>
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>{guildSelected.guild.name}</Text>
                    <Text style={styles.subtitle}>
                        {guildSelected.description}
                    </Text>
                </View>
            </ImageBackground>
            {loading ? (
                <Load />
            ) : (
                <>
                    <ListHeader
                        title={'Jogadores'}
                        subtitle={`Total ${widget.members.length}`}
                    />
                    <FlatList
                        data={widget.members}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <Member data={item} />}
                        ItemSeparatorComponent={() => (
                            <ListDivider isCentered />
                        )}
                        style={styles.members}
                    />
                    {widget.instant_invite && (
                        <View style={styles.footer}>
                            <ButtonIcon
                                title={'Entrar na partida'}
                                onPress={handleOpenGuild}
                            />
                        </View>
                    )}
                </>
            )}
        </BackGround>
    )
}
