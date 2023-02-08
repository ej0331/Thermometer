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

const getDatas = async (index: number) => {
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
    return axios.get(`http://192.168.168.155:3000/api/datas?limit=${limit}`)
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
            console.log("MyResponse", e)
        })

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