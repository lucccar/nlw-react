import { styles } from './styles'
import { Feather } from '@expo/vector-icons'
import React, { ReactNode, useState } from 'react'
import { RectButton } from 'react-native-gesture-handler'
import {
    Text,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native'

import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { BackGround } from '../../components/Background'
import { Header } from '../../components/Header'
import { GuidIcon } from '../../components/GuildIcon'
import { CategorySelect } from '../../components/CategorySelect'
import { SmallInput } from '../../components/SmallInput'
import { TextArea } from '../../components/TextArea'
import { Button } from '../../components/Button'
import { ModalView } from '../../components/ModalView'
import { Guilds } from '../Guilds'

import { theme } from '../../global/styles/theme'
import { GuildProps } from '../../components/Guild'
import { COLLECTION_APPOINTMENTS } from '../../configs/database'
import { useNavigation } from '@react-navigation/core'

export function AppointmentCreate() {
    const navigation = useNavigation()

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

    const [category, setCategory] = useState('')

    const [openGuildsModal, setOpenGuildsModal] = useState(false)
    function handleOpenGuilds() {
        setOpenGuildsModal(true)
    }
    function handleCloseGuilds() {
        setOpenGuildsModal(false)
    }

    const [guild, setGuild] = useState<GuildProps>({} as GuildProps)
    function handleGuildSelect(guildSelected: GuildProps) {
        setGuild(guildSelected)
        setOpenGuildsModal(false)
    }

    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [hour, setHour] = useState('')
    const [minute, setMinute] = useState('')
    const [description, setDescription] = useState('')

    async function handleSave() {
        const newAppointment = {
            id: uuid.v4(),
            guild,
            category,
            date: `${day}/${month} às ${hour}:${minute}h`,
            description,
        }
        const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
        const appointments = storage ? JSON.parse(storage) : []
        await AsyncStorage.setItem(
            COLLECTION_APPOINTMENTS,
            JSON.stringify([...appointments, newAppointment])
        )

        navigation.navigate('Home')
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'position' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? -70 : 70}
            enabled
        >
            <ScrollView>
                <BackGround>
                    <Header title={'Agendar Partida'} />
                    <Text
                        style={[
                            styles.label,
                            { marginLeft: 24, marginTop: 36, marginBottom: 18 },
                        ]}
                    >
                        Categoria
                    </Text>
                    <CategorySelect
                        hasCheckBox
                        setCategory={setCategory}
                        categorySelected={category}
                    />

                    <View style={styles.form}>
                        <RectButton onPress={handleOpenGuilds}>
                            <View style={styles.select}>
                                {guild.icon ? (
                                    <GuidIcon
                                        guildID={guild.id}
                                        iconID={guild.icon}
                                    />
                                ) : (
                                    <View style={styles.image} />
                                )}
                                <View style={styles.selectBody}>
                                    <Text style={styles.label}>
                                        {guild.name
                                            ? guild.name
                                            : 'Selecione um servidor'}
                                    </Text>
                                </View>

                                <Feather
                                    name={'chevron-right'}
                                    color={theme.colors.heading}
                                    size={18}
                                />
                            </View>
                        </RectButton>
                        <View style={styles.field}>
                            <View>
                                <View>
                                    <Text
                                        style={[
                                            styles.label,
                                            { marginBottom: 12 },
                                        ]}
                                    >
                                        Dia e Mês
                                    </Text>

                                    <View style={styles.column}>
                                        <SmallInput
                                            maxLength={2}
                                            onChangeText={setDay}
                                        />
                                        <Text style={styles.divider}>/</Text>
                                        <SmallInput
                                            maxLength={2}
                                            onChangeText={setMonth}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View>
                                <View>
                                    <Text
                                        style={[
                                            styles.label,
                                            { marginBottom: 12 },
                                        ]}
                                    >
                                        Hora e minuto
                                    </Text>

                                    <View style={styles.column}>
                                        <SmallInput
                                            maxLength={2}
                                            onChangeText={setHour}
                                        />
                                        <Text style={styles.divider}>:</Text>
                                        <SmallInput
                                            maxLength={2}
                                            onChangeText={setMinute}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={[styles.field, { marginBottom: 12 }]}>
                            <Text style={styles.label}>Descrição</Text>
                            <Text style={styles.caracteresLimit}>
                                Max 100 caracteres
                            </Text>
                        </View>
                        <TextArea
                            multiline
                            maxLength={100}
                            numberOfLines={5}
                            autoCorrect={false}
                            onChangeText={setDescription}
                        />
                        <View style={styles.footer}>
                            <Button
                                title="Agendar partida"
                                onPress={handleSave}
                            />
                        </View>
                    </View>
                </BackGround>
            </ScrollView>
            <ModalView visible={openGuildsModal} closeModal={handleCloseGuilds}>
                <Guilds handleGuildSelected={handleGuildSelect} />
            </ModalView>
        </KeyboardAvoidingView>
    )
}
