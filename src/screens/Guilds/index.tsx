import React from 'react'
import { View, FlatList } from 'react-native'
import { GuildProps } from '../../components/Guild'
import { Guild } from '../../components/Guild'
import { ListDivider } from '../../components/ListDivider'
import { styles } from './styles'

type Props = {
    handleGuildSelected: (guild: GuildProps) => void
}

export function Guilds({ handleGuildSelected }: Props) {
    const guilds = [
        {
            id: '1',
            name: 'Lendários',
            icon: 'image.png',
            owner: true,
        },
        {
            id: '2',
            name: 'Derrotados',
            icon: 'image.png',
            owner: true,
        },
        {
            id: '3',
            name: 'Lendários',
            icon: 'image.png',
            owner: true,
        },
        {
            id: '4',
            name: 'Derrotados',
            icon: 'image.png',
            owner: true,
        },
        {
            id: '5',
            name: 'Lendários',
            icon: 'image.png',
            owner: true,
        },
        {
            id: '6',
            name: 'Derrotados',
            icon: 'image.png',
            owner: true,
        },
        {
            id: '7',
            name: 'Lendários',
            icon: 'image.png',
            owner: true,
        },
        {
            id: '8',
            name: 'Derrotados',
            icon: 'image.png',
            owner: true,
        },
        {
            id: '9',
            name: 'Lendários',
            icon: 'image.png',
            owner: true,
        },
        {
            id: '10',
            name: 'Derrotados',
            icon: 'image.png',
            owner: true,
        },
    ]
    return (
        <View>
            <FlatList
                data={guilds}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Guild
                        data={item}
                        onPress={() => handleGuildSelected(item)}
                    />
                )}
                ItemSeparatorComponent={() => <ListDivider isCentered />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 68, paddingTop: 80 }}
                // ListHeaderComponent={ListDivider}
                style={styles.guilds}
            ></FlatList>
        </View>
    )
}
