import React, { useState, useEffect } from 'react'
import { View, FlatList } from 'react-native'
import { Guild, GuildProps } from '../../components/Guild'
import { Load } from '../../components/Load'
import { ListDivider } from '../../components/ListDivider'
import { styles } from './styles'
import { api } from '../../services/api'

type Props = {
    handleGuildSelected: (guild: GuildProps) => void
}

export function Guilds({ handleGuildSelected }: Props) {
    const [guilds, setGuilds] = useState<GuildProps[]>([])
    const [loading, setLoading] = useState(true)

    async function fetchGuilds() {
        try {
            const response = await api.get('/users/@me/guilds')
            // console.log(response.data)
            setGuilds(response.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            // console.log(response)
        }
    }
    useEffect(() => {
        fetchGuilds()
    })

    return (
        <View style={styles.container}>
            {loading ? (
                <Load />
            ) : (
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
                    contentContainerStyle={{
                        paddingBottom: 68,
                        paddingTop: 80,
                    }}
                    // ListHeaderComponent={ListDivider}
                    style={styles.guilds}
                ></FlatList>
            )}
        </View>
    )
}
