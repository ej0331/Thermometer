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
            for (var i = 0; i <= 4; i++) { // 4 quarter for 1 hour
                labels.push(i)
            }
            break
        case 1:
            for (var i = 0; i <= 24; i++) { // 24 hours for 1 day
                labels.push(i)
            }
            break
        case 2:
            for (var i = 0; i <= 7; i++) { // 7 day for 1 week
                labels.push(i)
            }
            break
    }

    return labels
}

const getDatas = async (index: number) => {
    let now = new Date(Date.now())
    let endTimestamp = now.valueOf()

    switch (index) {
        case 0: 
            // code
            break
        case 1: 
            // code
            break
        case 2: 
            // code
            break
    }

    return axios.get(`new endpoint`)
}

const ChartScreen = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [temperatures, setTemperatures] = useState(getLabels(selectedIndex));
    const [humidities, setHumidities] = useState(getLabels(selectedIndex));
    const [labels, setLabels] = useState(getLabels(selectedIndex));

    useEffect( () => {
        const getDataTask = getDatas(selectedIndex)
        const temperatures: number[] = []
        const humidities: number[] = []

        getDataTask.then( (response) => {
            response.data.forEach ((record) => {
                temperatures.push(record['temperature'])
                humidities.push(record['humidity'])
            })
            setLabels(getLabels(selectedIndex))
            setTemperatures(temperatures)
            setHumidities(humidities)
        })

        getDataTask.catch( (e) => {
            console.log("Error:", e)
        })

    }, [selectedIndex])

    return (
        <View style={styles.title}>
            <ButtonGroup
                buttons={['Hour', 'Day', 'Week']}
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