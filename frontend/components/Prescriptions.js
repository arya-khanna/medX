import { Style, StyleTwoTone } from '@material-ui/icons';
import React from 'react';
import { StyleSheetManager, text } from 'styled-components';
import { styles } from 'styled-system';

export default function Prescriptions() {

    return (
    <View style={styles.container}>
        <View style={styles.itemsWrapper}>

            <View style={styles.prescription}>
                <Text style={styles.sectionTitle}>My Prescriptions</Text>

            </View>



        </View>


    </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemsWrapper: {
        paddingTop: 80,
        paddingHorizontal: 40
    },
    prescription: {

    },
    sectionTitle: {
        fontsize: 24,
        fontWeight: 'bold'
    }

});


