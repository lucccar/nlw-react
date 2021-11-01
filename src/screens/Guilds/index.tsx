import { Text, View, FlatList } from 'react-native'
import { Guild } from '../../components/Guild'
import { ListDivider } from '../../components/ListDivider'
import { styles } from './styles'

export default function Guilds() {
    const guilds = [
        {
            id: '1',
            name: 'Lendários',
            icon: null,
            owner: true,
        },
    ]
    return (
        <View>
            <FlatList
                data={guilds}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Guild data={item} />}
                ItemSeparatorComponent={ListDivider}
                showsVerticalScrollIndicator={false}
                style={styles.guilds}
            ></FlatList>
        </View>
    )
}
