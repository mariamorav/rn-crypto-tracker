import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

import Colors from 'cryptoTracker/src/res/colors';

const CoinMarketItem = ({item}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.priceText}>{item.price}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0, 0.1)',
        borderColor: Colors.zircon,
        borderWidth: 0.6,
        padding: 16,
        margin: 8,
        alignItems: 'center',
        borderRadius: 5
    },
    nameText: {
        color: Colors.white,
        fontWeight: 'bold',
    },
    priceText: {
        color: Colors.white,
    }
})

export default CoinMarketItem;
