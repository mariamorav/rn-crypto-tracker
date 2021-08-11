import React, {useState, useEffect, use} from 'react';
import {
    View,
    StyleSheet,
    FlatList
} from 'react-native';

import FavoritesEmptyState from './FavoritesEmptyState';
import CoinsItem from '../coins/CoinsItem';

import Colors from 'cryptoTracker/src/res/colors';
import Storage from 'cryptoTracker/src/libs/storage';

const FavoritesScreen = (props) => {

    const [favorites, setFavorites] = useState([])

    const getFavorites = async () => {
        try {
            
            const allKeys = await Storage.instance.getAllKeys();
            
            const keys = allKeys.filter(key => key.includes('favorite-'));

            const favs = await Storage.instance.multiGet(keys);

            const favorites = favs.map(fav => JSON.parse(fav[1]));

            setFavorites(favorites);

        } catch (err) {
            console.error(err);
        }
    }

    const handlePress = (coin) => {
        props.navigation.navigate("CoinDetail", {coin});
    }

    useEffect(() => {
        getFavorites();

        props.navigation.addListener("focus", getFavorites);

        return () => {
            props.navigation.removeListener("focus", getFavorites);
        }

    }, [props])

    return (
        <View style={styles.container}> 
        {
            favorites.length === 0 ?
                <FavoritesEmptyState />
                : null
        }
        {
            favorites.length > 0 ?
                <FlatList
                    data={favorites}
                    renderItem={({item}) => 
                        <CoinsItem 
                            item={item} 
                            onPress={() => handlePress(item)}
                        />
                    }
                />
                : null
        }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.charade,
        flex: 1,
    }
})

export default FavoritesScreen;