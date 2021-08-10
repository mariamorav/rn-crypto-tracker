import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Icon } from 'react-native-elements'
import Colors from 'cryptoTracker/src/res/colors';

const CoinsItem = ({item}) => {
    return (
        <View style={styles.container}> 
            <View style={styles.row}>
                <Text style={styles.symbolText}>{item.symbol}</Text>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.priceText}>
                    {`$${item.price_usd}`}
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.percentText}>
                    {item.percent_change_1h}
                </Text>
                <Icon 
                    style={styles.imgIcon}
                    name={item.percent_change_1h > 0 ? 'arrow-up-outline': 'arrow-down-outline'} 
                    color={item.percent_change_1h > 0 ? 'green' : 'red'}
                    type='ionicon'
                    size={18}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        justifyContent: 'space-between',
        borderBottomColor: Colors.zircon,
        borderBottomWidth: 0.3
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    symbolText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 12
    },
    nameText: {
        color: Colors.white,
        fontSize: 14
    },
    percentText: {
        color: Colors.white,
        fontSize: 12
    },
    priceText: {
        color: Colors.white,
        fontSize: 12,
        marginLeft: 14
    },
    imgIcon: {
        marginLeft: 5
    }
})

export default CoinsItem;