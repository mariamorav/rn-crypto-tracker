import React from 'react';
import {
    View, 
    Text,
    StyleSheet
} from 'react-native';

const FavoritesEmptyState = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>You don't have any favorites yet.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'center',
    }
})

export default FavoritesEmptyState;