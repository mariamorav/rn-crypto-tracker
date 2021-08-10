import React, {useState} from 'react';
import {
    View, 
    Text,
    TextInput,
    Platform,
    StyleSheet
} from 'react-native';

import Colors from 'cryptoTracker/src/res/colors';

const CoinSearch = (props) => {

    const [query, setQuery] = useState("");

    const handleText = (query) => {
        setQuery(query)

        if(props.onChange) {
            props.onChange(query);
        }
    }

    return (
        <View>
            <TextInput 
                onChangeText={handleText}
                value={query}
                placeholder="Search coin..."
                placeholderTextColor="#FFF"
                style={[
                    styles.textInput,
                    Platform.OS === 'ios' ?
                        styles.textInputIOs :
                        styles.textInputAndroid
                ]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        height: 46,
        backgroundColor: Colors.charade,
        color: Colors.white,
        paddingLeft: 16
    },
    textInputAndroid: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.zircon
    },
    textInputIOs: {
        margin: 8,
        borderRadius: 8
    }
})

export default CoinSearch;