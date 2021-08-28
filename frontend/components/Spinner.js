import React from 'react';
import { ActivityIndicator } from 'react-native';
import Colors from '../styles/Colors';

const Spinner = () => {
    return <ActivityIndicator
        style={{
            alignContent: 'center'
        }}
        size="large" color={Colors.brandBlue}
    />
}

export default Spinner;

