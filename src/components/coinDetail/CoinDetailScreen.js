import React, {useState, useEffect } from 'react';
import { 
    View, 
    Text,
    Image,
    StyleSheet,
    SectionList,
    FlatList,
    Pressable,
    Alert
} from 'react-native';

import Http from 'cryptoTracker/src/libs/http';
import Storage from 'cryptoTracker/src/libs/storage';

import CoinMarketItem from './CoinMarketItem';

import Colors from 'cryptoTracker/src/res/colors';

const CoinDetailScreen = (props) => {

    const [coin, setCoin] = useState(props.route.params.coin);
    const [markets, setMarkets] = useState([]);

    const [isFavorited, setIsFavorited] = useState(false);

    const toogleFav = () => {
        if(isFavorited) {
            removeFavorite();
        } else {
            addFavorite();
        }
    }

    const addFavorite = async () => {
        const Coin = JSON.stringify(coin);
        const key = `favorite-${coin.id}`;

        const stored = await Storage.instance.add(key, Coin);

        if(stored) {
            setIsFavorited(true);
        }
    }

    const removeFavorite = async () => {

        Alert.alert("Remove favorite", "Are you sure?", [
            {
                text: "Cancel",
                onPress: () => {},
                style: "cancel"
            },
            {
                text: "Remove",
                onPress: async () => {
                    const key = `favorite-${coin.id}`;
                    await Storage.instance.remove(key);
                    setIsFavorited(false);
                },
                style:"destructive"
            },
        ]);
    }

    const getFavorite = async () => {
        try {
            const key = `favorite-${coin.id}`;
            
            const favStr = await Storage.instance.get(key);

            if (favStr !== null) {
                setIsFavorited(true);
            }

        } catch (err) {
            
            console.log("getFavoriteError: ", err)
        }
    }

    const getSymbolIcon = (name) => {

        if(name) {

            const symbol = name.toLowerCase().replace(" ", "-");

            return `https://c1.coinlore.com/img/25x25/${symbol}.png`
        
        }

    }
    
    const getSections = (coin) => {
        const sections = [
            {
                title: "Market cap",
                data: [coin.market_cap_usd]
            },
            {
                title: "Volume 24h",
                data:[coin.volume24]
            },
            {
                title: "Change 24h",
                data: [coin.percent_change_24h]
            }
        ]

        return sections;
    }

    const getMarkets = async (coinId) => {

        const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;

        const markets = await Http.instance.get(url);

        setMarkets(markets);

    }

    useEffect(async () => {

        props.navigation.setOptions({title: coin.symbol});

        getMarkets(coin.id);

        getFavorite();

    }, [props]);

    return (
        <View style={styles.container}>
            <View style={styles.subHeader}>
                <View style={styles.row}>
                    <Image 
                        source={{uri: getSymbolIcon(coin.name)}} 
                        style={styles.imgIcon}
                    />
                    <Text style={styles.titleText}>
                        {coin.name}
                    </Text>
                </View>
                <View>
                    <Pressable
                        style={[
                            styles.btnFav, 
                            isFavorited ? 
                                styles.btnFavRemove :
                                styles.btnFavAdd 
                        ]}
                        onPress={() => toogleFav()}
                    >
                        <Text
                            style={styles.btnText}
                        > 
                            { isFavorited ? "Remove favorite" : "Add Favorite"} 
                        </Text>
                    </Pressable>
                </View>
            </View>
            <SectionList
                style={styles.section}
                sections={getSections(coin)}
                keyExtractor={(item) => item}
                renderItem={({item}) => 
                    <View style={styles.sectionItem}>
                        <Text style={styles.itemText}>{item}</Text>
                    </View>
                }
                renderSectionHeader={({section}) => 
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionText}>{section.title}</Text>
                    </View>
                }
            />
            <Text style={styles.marketTitle}>Markets</Text>
            
            <FlatList
                style={styles.marketsList}
                horizontal={true}
                data={markets}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <CoinMarketItem item={item}/>}
            />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade
    },
    subHeader: {
        backgroundColor: "rgba(0,0,0, 0.2)",
        padding: 16,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 16,
        color: Colors.white,
        fontWeight: 'bold',
        marginLeft: 8
    },
    imgIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    section: {
        maxHeight: 220
    },
    sectionHeader: {
        backgroundColor: "rgba(0,0,0, 0.3)",
        padding: 8
    },
    sectionItem: {
        padding: 8
    },
    itemText: {
        color: Colors.white,
        fontSize: 14
    },
    sectionText: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: 'bold'
    },
    marketsList: {
        maxHeight: 110,
        paddingLeft:16
    },
    marketTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.white,
        paddingLeft:16
    },
    btnFav: {
        padding: 8,
        borderRadius: 8,
    },
    btnFavAdd: {
        backgroundColor: Colors.picton
    },
    btnFavRemove: {
        backgroundColor: Colors.carmine
    },
    btnText: {
        color: Colors.white,
        fontWeight: 'bold',
    }
});

export default CoinDetailScreen;