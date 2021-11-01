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

import { BackGround } from '../../components/Background'
import { Header } from '../../components/Header'
import { GuidIcon } from '../../components/GuildIcon'
import { CategorySelect } from '../../components/CategorySelect'
import { SmallInput } from '../../components/SmallInput'
import { TextArea } from '../../components/TextArea'
import { Button } from '../../components/Button'
import { theme } from '../../global/styles/theme'

export function AppointmentCreate() {
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

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={'padding'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 1 : 70}
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
                        <RectButton>
                            <View style={styles.select}>
                                {
                                    // <View style={styles.image} />
                                    <GuidIcon />
                                }
                                <View style={styles.selectBody}>
                                    <Text style={styles.label}>
                                        Selecione um servidor
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
                                    <Text style={styles.label}>Dia e Mês</Text>

                                    <View style={styles.column}>
                                        <SmallInput maxLength={2} />
                                        <Text style={styles.divider}>/</Text>
                                        <SmallInput maxLength={2} />
                                    </View>
                                </View>
                            </View>

                            <View>
                                <View>
                                    <Text style={styles.label}>
                                        Hora e minuto
                                    </Text>

                                    <View style={styles.column}>
                                        <SmallInput maxLength={2} />
                                        <Text style={styles.divider}>:</Text>
                                        <SmallInput maxLength={2} />
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
                        />
                        <View style={styles.footer}>
                            <Button title="Agendar partida" />
                        </View>
                    </View>
                </BackGround>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
