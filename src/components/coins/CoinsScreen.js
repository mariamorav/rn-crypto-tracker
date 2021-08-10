import React, {useState, useEffect} from 'react';
import { 
    View, 
    Text, 
    Pressable, 
    StyleSheet, 
    FlatList,
    ActivityIndicator
} from 'react-native';
import Http from '../../libs/http';

import CoinsItem from './CoinsItem';
import CoinSearch from './CoinSearch';
import Colors from 'cryptoTracker/src/res/colors';

const CoinsScreen = (props) => {

    const [coins, setCoins] = useState({});
    const [allCoins, setAllCoins] = useState({});
    const [loading, setLoading] = useState(false);

    const getCoins = async () => {
        try {
            setLoading(true);
            let res = await Http.instance.get('https://api.coinlore.net/api/tickers/');
            setCoins(res.data);
            setAllCoins(res.data);
            //console.log(res);
            setLoading(false);
        } catch (e) {
            console.log(e);
        }
    }

    const handlePress = (coin) => {
        props.navigation.navigate('CoinDetail', {coin});
    }

    const handleSearch = (query) => {
        const coinsFiltered = allCoins.filter((coin) => {
            return coin.name.toLowerCase().includes(query.toLowerCase()) || 
                coin.symbol.toLowerCase().includes(query.toLowerCase());
        })

        setCoins(coinsFiltered);
    }

    useEffect(() => {
        getCoins();
    }, []);

    return (
        <View style={styles.container}>
            <CoinSearch onChange={handleSearch} />

            {loading ? 
                <ActivityIndicator 
                    color="#000" 
                    size="large"
                    style={styles.loading}
                />
                : null
            }
            <FlatList 
                data={coins}
                initialNumToRender={30}
                renderItem={({item}) => 
                    <CoinsItem 
                        item={item} 
                        onPress={() => handlePress(item)}
                    />
                }
            />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade,
    },
    titleText: {
        color: '#000',
        textAlign: 'center'
    },
    btn: {
        padding: 8,
        backgroundColor: 'blue',
        borderRadius: 8,
        margin: 16
    },
    btnText: {
        color: '#FFF',
        textAlign: 'center',
    },
    loading: {
        marginTop: 60
    }
})

export default CoinsScreen;