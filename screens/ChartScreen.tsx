import { Text, Image, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList, Button, Dimensions } from "react-native";
import { ButtonGroup } from "react-native-elements"
import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/HistoryChartStyles";
import axios from 'axios'
import HistoryLineChart from "../components/HistoryLineChart";

const getLabels = (history: Array<any>, index: number) => {
    let labels: string[] = []

    switch (index) {
        case 0:
            history.forEach(item => {
                const time = new Date(item['earliest_timestamp']).toLocaleTimeString(['zh-TW'], { hour: '2-digit', minute: '2-digit' })
                labels.push(time)
            })
            break
        case 1:
            let data = history.reverse()            
            let standard = new Date().setHours(0, 0, 0, 0)
            let today = new Date().setHours(0, 0, 0, 0)
            let yesterday = today - 86400 * 1000
            let head = 0
            let tail = 0
            
            while (labels.length < history.length) { // 爛code
                while (data[tail]['earliest_timestamp'] > standard.valueOf() && tail < history.length - 1) {
                    tail++
                }
                console.log("current head: ", head);
                console.log("current tail: ", tail);
                
                let first = new Date(data[head]['earliest_timestamp'])
                console.log('today ', tail, today, new Date(today));
                console.log('yesterday ', tail, yesterday, new Date(yesterday));
                console.log('currentDate ', tail, standard.valueOf(), new Date(standard.valueOf()));
                
                if (standard == today) {
                    labels.push("今天" + first.getHours() + "時")
                    console.log("add today first time: ", head);
                }
                else if (standard == yesterday) {
                    labels.push("昨天" + first.getHours() + "時")
                    console.log("add yesterday first time: ", head);
                }
                else {
                    labels.push(first.getMonth() + 1 + "月" + first.getDate() + "日\n" + first.getHours() + "時")
                    console.log("add first time: ", head);
                }
                for (let i = head + 1; i < tail; i++) {
                    let time = new Date(data[i]['earliest_timestamp'])
                    labels.push(time.getHours() + "時")
                    console.log("add time", time);
                }
                standard -= 86400 * 1000
                head = tail
            }
            labels = labels.reverse()
            console.log(labels);
            
            break
        case 2:
            history.forEach(item => {
                const time = new Date(item['earliest_timestamp'])
                labels.push(time.getMonth() + 1 + "月" + time.getDate() + "日")
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

const customLabel = (val: string) => {
    return (
        <View style={{ width: 70, marginLeft: 7 }}>
            <Text>{val}</Text>
        </View>
    );
};

const getChartData = (history: Array<any>, type: string, index: number) => {
    const chartData = []
    let labels = getLabels(history, index)
    for (let i = 0; i < history.length; i++) {
        let myCustomLabel = customLabel(labels[i])
        let data = {
            value: history[i][`${type}_avg`],
            dataPointText: history[i][`${type}_avg`],
            labelComponent: () => myCustomLabel
        }
        chartData.push(data)
    }
    return chartData
}

const ChartScreen = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [temperatureData, setTemperatureData] = useState([]);
    const [humidityData, setHumidityData] = useState([]);

    useEffect(() => {
        const getDataTask = getDatas(selectedIndex)

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