import React, { useState } from 'react'
import { FlatList, View, Text } from 'react-native'
import { ButtonAdd } from '../../components/ButtonAdd'
import { CategorySelect } from '../../components/CategorySelect'
import { ListHeader } from '../../components/ListHeader'
import { Profile } from '../../components/Profile'
import { Appointment } from '../../components/Appointments'
import { ListDivider } from '../../components/ListDivider'
import { BackGround } from '../../components/Background'

import { styles } from './styles'

export function Home() {
    const appointments = [
        {
            id: '1',
            guild: {
                id: '1',
                name: 'Lendários',
                icon: null,
                owner: true,
            },
            category: '1',
            date: '22/06 às 20:40h',
            description:
                'É hoje que vamos chegar ao challenger sem perder uma partida da md10',
        },
        {
            id: '2',
            guild: {
                id: '1',
                name: 'Lendários',
                icon: null,
                owner: true,
            },
            category: '1',
            date: '22/06 às 20:40h',
            description:
                'É hoje que vamos chegar ao challenger sem perder uma partida da md10',
        },
        {
            id: '3',
            guild: {
                id: '1',
                name: 'Lendários',
                icon: null,
                owner: true,
            },
            category: '1',
            date: '22/06 às 20:40h',
            description:
                'É hoje que vamos chegar ao challenger sem perder uma partida da md10',
        },
        {
            id: '4',
            guild: {
                id: '1',
                name: 'Lendários',
                icon: null,
                owner: true,
            },
            category: '1',
            date: '22/06 às 20:40h',
            description:
                'É hoje que vamos chegar ao challenger sem perder uma partida da md10',
        },
        {
            id: '5',
            guild: {
                id: '1',
                name: 'Lendários',
                icon: null,
                owner: true,
            },
            category: '1',
            date: '22/06 às 20:40h',
            description:
                'É hoje que vamos chegar ao challenger sem perder uma partida da md10',
        },
    ]
    const [category, setCategory] = useState('')
    function handleCategoruSelect(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId)
    }
    return (
        <BackGround>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd />
            </View>

            <CategorySelect
                categorySelected={category}
                setCategory={handleCategoruSelect}
            />

            <View style={styles.content}>
                <ListHeader title={'Partidas agendadas'} subtitle={'Total 6'} />
                <FlatList
                    data={appointments}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <Appointment data={item} />}
                    ItemSeparatorComponent={ListDivider}
                    showsVerticalScrollIndicator={false}
                    style={styles.matches}
                />
            </View>
        </BackGround>
    )
}
