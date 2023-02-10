import { Text, Image, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList, Button, Dimensions } from "react-native";
import { ButtonGroup } from "react-native-elements"
import { LineChart } from 'react-native-chart-kit';
import * as color from "../../assets/styles/color";
import React, { useState, useEffect, useContext } from "react";
import LineChartScreen from "./LineChartScreen";
import styles from "../styles/ShareStyles";
import axios from 'axios'

const getLabels = (index: number, array: Date[]) => {
    const labels: String[] = []
    const data = array

    switch (index) {
        case 0:
            data.forEach(item => {
                const time = item.toLocaleTimeString(['zh-TW'], { hour: '2-digit', minute: '2-digit' })
                labels.push(time.toString())
            })

            break
        case 1:

            data.forEach(item => {
                const time = item.getHours()
                labels.push(time.toString())
            })
            break
        case 2:
            data.forEach(item => {
                const time = item.getDate()
                labels.push(time.toString())
            })
            break
    }
    return labels
}

const getDatas = async (index: number) => {
    let now = new Date(Date.now())
    let endTimestamp = now.valueOf()
    let type = ''
    switch (index) {
        case 0:
            type = 'quarter'
            // code
            break
        case 1:
            type = 'hour'
            // code
            break
        case 2:
            type = 'day'
            // code
            break
    }

    return axios.get(`http://192.168.168.155:3000/api/datas/${type}`)
}

const ChartScreen = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [temperatures, setTemperatures] = useState([24]);
    const [humidities, setHumidities] = useState([16]);
    const [labels, setLabels] = useState(getLabels(selectedIndex, []));

    useEffect(() => {
        const getDataTask = getDatas(selectedIndex)
        const temperatures: number[] = []
        const humidities: number[] = []
        const labels: Date[] = []

        getDataTask.then((response) => {
            response.data.forEach((record) => {
                const date = new Date(record['earliest_timestamp'])
                temperatures.push(record['temperature_avg'])
                humidities.push(record['humidity_avg'])
                labels.push(date)
            })

            setLabels(getLabels(selectedIndex, labels))
            setTemperatures(temperatures)
            setHumidities(humidities)
        })

            .catch((e) => {
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