import {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    bottomBar: {
        height: 60,
        backgroundColor: 'white',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    middleIcon: {
        bottom: 18,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowOpacity: 0.6,
        elevation: 8,
    }
});