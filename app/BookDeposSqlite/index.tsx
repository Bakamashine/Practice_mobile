import React from 'react'
import {View} from 'react-native'
import BookDeposButton from '@/components/ui/BookDeposButton'
import MainClass from '@/datebase/MainClass'

export default function BookDeposSqlite() {
    const sqlite = new MainClass;
    return (
        <View>
            <BookDeposButton
                text='Сделать миграции'
                func={() => sqlite.migrate}
            />
        </View>
    )
}
