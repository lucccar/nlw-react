import React, { useCallback, useState } from 'react'
import { FlatList, View } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLLECTION_APPOINTMENTS } from '../../configs/database'
import { ButtonAdd } from '../../components/ButtonAdd'
import { CategorySelect } from '../../components/CategorySelect'
import { ListHeader } from '../../components/ListHeader'
import { Profile } from '../../components/Profile'
import { Appointment, AppointmentProps } from '../../components/Appointments'
import { ListDivider } from '../../components/ListDivider'
import { BackGround } from '../../components/Background'
import { Load } from '../../components/Load'
import { styles } from './styles'

export function Home() {
    const [appointments, setAppointments] = useState<AppointmentProps[]>([])
    const [loading, setLoading] = useState(true)

    async function loadAppointments() {
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
        const storage: AppointmentProps[] = response ? JSON.parse(response) : []

        if (category) {
            setAppointments(
                storage.filter((item) => item.category === category)
            )
        } else {
            setAppointments(storage)
        }
        setLoading(false)
    }

    const [category, setCategory] = useState('')

    const navigation = useNavigation()

    function handleCategoruSelect(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId)
    }

    function handleAppointmentDetails(guildSelected: AppointmentProps) {
        navigation.navigate('AppointmentDetails', { guildSelected })
    }

    function handleAppointmentCreate() {
        navigation.navigate('AppointmentCreate')
    }

    useFocusEffect(
        useCallback(() => {
            loadAppointments()
        }, [category])
    )

    return (
        <BackGround>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd onPress={handleAppointmentCreate} />
            </View>

            <CategorySelect
                categorySelected={category}
                setCategory={handleCategoruSelect}
            />

            {loading ? (
                <Load />
            ) : (
                <>
                    <View style={styles.content}>
                        <ListHeader
                            title={'Partidas agendadas'}
                            subtitle={`Total ${appointments.length}`}
                        />
                    </View>
                    <FlatList
                        data={appointments}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <Appointment
                                data={item}
                                onPress={() => handleAppointmentDetails(item)}
                            />
                        )}
                        ItemSeparatorComponent={ListDivider}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 69 }}
                        style={styles.matches}
                    />
                </>
            )}
        </BackGround>
    )
}
