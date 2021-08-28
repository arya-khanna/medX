import React from 'react';
import {
  View,
  Text,
  StyleSheet, 
  TouchableOpacity
} from 'react-native';
import {useState, useEffect, useRef} from "react";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

export default function Reminders() {
    const GetCurrentDate=()=>{
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var dictionary= {
            1: "January",
            2: "February",
            3: "March",
            4: "April",
            5: "May",
            6: "June",
            7: "July",
            8: "August",
            9: "September",
            10: "October",
            11: "November",
            12: "December"
         };
         month = dictionary[month];
        var year = new Date().getFullYear();
        return date + ' ' + month + ' ' + year;
  }

  const CONTENT = {
    tableData: [
      ['12:00PM', 'Perindopril'],
      ['6:00PM', 'Cefalexin'],
      ['11:00PM', 'Perindopril']
    ]
  };

  return (
    <View style={styles.container}>
        <Text style={styles.baseText}><GetCurrentDate /></Text>
        <Table borderStyle={{ borderWidth: 0 }}>
        <TableWrapper style={styles.wrapper}>
          <Rows
            data={CONTENT.tableData}
            style={styles.row}
            textStyle={styles.text}
          />
        </TableWrapper>
      </Table>
      <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Edit Reminder</Text>
     </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      baseText: {
        fontSize: 30,
        color: '#AAA1C8',
        paddingTop: 20,
        paddingLeft: 20,
        fontWeight: 'bold'
      },
      row: {
          height: 80
        },
      text: {
          textAlign: 'center',
          fontSize: 25
        },
        wrapper: {
            paddingTop: 80
        },
        button: {
            backgroundColor: '#192a51',
            width: 100,
            height: 70,
            top: 20,
            left: 130
        },
        buttonText: {
            color: 'white',
            textAlign: 'center',
            fontSize: 20,
            paddingTop: 7

        }

});