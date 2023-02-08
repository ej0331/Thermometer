import { Text, Image, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList, Button, Dimensions } from "react-native";
import { ButtonGroup } from "react-native-elements"
import { LineChart } from 'react-native-chart-kit';
import * as color from "../../assets/styles/color";
import React, { useState, useEffect, useContext } from "react";
import LineChartScreen from "./LineChartScreen";
import styles from "../styles/ShareStyles";
import axios from 'axios'

const getLabels = (index: number) => {
    const labels = []
    switch (index) {
        case 0:
            for (var i = 0; i <= 23; i++) {
                labels.push(i)
            }
            break
        case 1:
            for (var i = 0; i <= 30; i++) {
                labels.push(i)
            }
            break
        case 2:
            for (var i = 0; i <= 12; i++) {
                labels.push(i)
            }
            break
    }

    return labels
}

const getDatas = async(index: number) => {
    var data: never[] = []
    var limit = 10
    switch (index) {
        case 0:
            limit = 24
            break
        case 1:
            limit = 30
            break
        case 2:
            limit = 12
            break
    }
    axios.get('http://192.168.168.155:3000/api/datas?limit=24')
        .then( (response) => data = response["data"])
        .catch( (error) => console.log(error));

    // 非同步寫法
    // try{
    //     const response = await axios.get('http://192.168.168.155:3000/api/datas?limit=24');
    //     data = response['data']
    //     console.log(data);
    // }
    // catch(error){
    //     console.log(error)
    // }
    console.log("mydata", data);
    return data
}

const ChartScreen = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [temperatures, setTemperatures] = useState(getLabels(selectedIndex));
    const [humidities, setHumidities] = useState(getLabels(selectedIndex));
    const [labels, setLabels] = useState(getLabels(selectedIndex));

    useEffect( () => {
        const temp = getDatas(selectedIndex)
        const temperatures: number[] = []
        const humidities: number[] = []
        console.log('mytemp',temp);
        
        temp.forEach ((list, index) => {
            temperatures.push(list['temperature'])
            humidities.push(list['humidity'])
        })
        setLabels(getLabels(selectedIndex))
        setTemperatures(temperatures)
        setHumidities(humidities)
    }, [selectedIndex])

    return (
        <View style={styles.title}>
            <ButtonGroup
                buttons={['Hour', 'Day', 'Month']}
                selectedIndex={selectedIndex}
                onPress={(value) => {
                    setSelectedIndex(value);
                }}
            />
            <Text>Temperature</Text>
            <LineChartScreen labels={labels} datas={temperatures} />

            <Text>Humidity</Text>
            <LineChartScreen labels={labels} datas={humidities} />
        </View>
    )
}

export default ChartScreen