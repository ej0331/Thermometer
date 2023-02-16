import { Text, Image, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList, Button, Dimensions } from "react-native";
import { ButtonGroup } from "react-native-elements"
import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/HistoryChartStyles";
import axios from 'axios'
import HistoryLineChart from "../components/HistoryLineChart";

const getLabels = (index: number, history: Array<any>) => {
    const labels: String[] = []

    switch (index) {
        case 0:
            history.forEach(item => {
                const time = item.toLocaleTimeString(['zh-TW'], { hour: '2-digit', minute: '2-digit' })
                labels.push(time.toString())
            })
            break
        case 1:
            const data = history.reverse()
            let today = new Date()
            let yesterday = new Date().setHours(-24, 0, 0, 0)
            let head = 0
            let tail = 0

            while (labels.length != history.length) { //爛code
                while (data[tail] > today.valueOf()) {
                    tail++
                }
                labels.push("今天" + data[head].getHours() + "時")
                for (var i = head + 1; i <= tail; i++) {
                    labels.push(data[i].getHours() + "時")
                }
                head = tail
    
                while (data[tail] > yesterday.valueOf()) {
                    tail++
                }
                labels.push("昨天" + data[head].getHours() + "時")
                for (var i = head + 1; i <= tail; i++) {
                    labels.push(data[i].getHours() + "時")
                }
                head = tail
                
            }

            // array.forEach(item => {
            //     const hour = item.getHours()
            //     if (item.valueOf() > currentDate.valueOf()) {
            //         labels.push("今天" + hour + "時")
            //     }
            //     else if (item.valueOf() >= yesterday.valueOf() && item.valueOf() <= currentDate.valueOf()) {
            //         labels.push("昨天" + hour + "時")
            //     }
            //     else {
            //         labels.push(item.getMonth() + 1 + "月" + item.getDate() + "日" + hour + "時")
            //     }
            // })
            break
        case 2:
            history.forEach(item => {
                labels.push(item.getMonth() + 1 + "月" + item.getDate() + "日")
            })
            break
    }

    return labels
}

const getDatas = async (index: number) => {
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

const customDataPoint = () => {
    return (
        <View
            style={{
                width: 5,
                height: 5,
                backgroundColor: 'white',
                // borderWidth: 1,
                // borderRadius: 10,
                // borderColor: '#07BAD1',
            }}
        />
    );
};

const customLabel = (val) => {
    return (
        <View style={{ width: 70, marginLeft: 7 }}>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>{val}</Text>
        </View>
    );
};

const getChartData = (history: Array<any>, type: string, index: number) => {
    const chartData = []
    history.forEach(record => {
        let data = {
            value: record[`${type}_avg`],
            dataPointText: record[`${type}_avg`],
            // labelComponent: () => customLabel(getLabel(index, date)),
            // customDataPoint: customDataPoint,
        }
        chartData.push(data)
    });

    return chartData
}

const ChartScreen = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [temperatureData, setTemperatureData] = useState([24]);
    const [humidityData, setHumidityData] = useState([16]);

    useEffect(() => {
        const getDataTask = getDatas(selectedIndex)
        const temperatureHistory: number[] = []
        const humidityHistory: number[] = []
        const labels: Date[] = []

        getDataTask.then((response) => {
            setTemperatureData(getChartData(response.data, 'temperature', selectedIndex))
            setHumidityData(getChartData(response.data, 'humidity', selectedIndex))
        })

            .catch((e) => {
                console.log("Error:", e)
            })
    }, [selectedIndex])

    return (
        <View>
            <ButtonGroup
                buttons={['Hour', 'Day', 'Week']}
                selectedIndex={selectedIndex}
                onPress={(value) => {
                    setSelectedIndex(value);
                }}
            />
            <Text style={styles.title}>History</Text>
            <ScrollView>
                <HistoryLineChart temperatureData={temperatureData} humidityData={humidityData} />
            </ScrollView>
        </View>
    )
}

export default ChartScreen