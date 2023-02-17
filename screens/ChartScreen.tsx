import { Text, Image, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList, Button, Dimensions } from "react-native";
import { ButtonGroup } from "react-native-elements"
import React, { useState, useEffect, useContext } from "react";
import styles from "../assets/styles/HistoryChartStyles";
import axios from 'axios'
import HistoryLineChart from "../components/HistoryLineChart";
import colorSheet from "../assets/styles/color";
import { darkModeContext } from "../context/isDark";


const getLabels = (history: Array<any>, index: number) => {
    let labels: string[] = []

    switch (index) {
        case 0:
            history.forEach(item => {
                const time = new Date(item['earliest_timestamp']).toLocaleTimeString(['zh-TW'], { hour: '2-digit', minute: '2-digit', hour12: false })
                labels.push(time)
            })
            break
        case 1:
            let data = history.reverse() 
            let standard = new Date().setHours(8, 0, 0, 0)
            let today = new Date().setHours(8, 0, 0, 0)
            let yesterday = today - 86400 * 1000
            let head = 0
            let tail = 0

            while (labels.length < history.length) { // 爛code
                while (data[tail]['earliest_timestamp'] > standard.valueOf() && tail < history.length - 1) {
                    tail++
                }

                let first = new Date(data[head]['earliest_timestamp'])
                if (standard == today) {
                    labels.push("今天\n" + first.getHours() + "時")
                }
                else if (standard == yesterday) {
                    labels.push("昨天\n" + first.getHours() + "時")
                }
                else {
                    labels.push(first.getMonth() + 1 + "月" + first.getDate() + "日\n" + first.getHours() + "時")
                }
                for (let i = head + 1; i < tail; i++) {
                    let time = new Date(data[i]['earliest_timestamp'])
                    labels.push(time.getHours() + "時")
                }
                if (tail == 23) { // 因只跑到 tail < history.length - 1, tail = history.length - 1的資料需另外處理
                    if (data[tail]['earliest_timestamp'] > standard.valueOf()) {
                        let time = new Date(data[tail]['earliest_timestamp'])
                        labels.push(time.getHours() + "時")
                    }
                    else {
                        let time = new Date(first.valueOf() - 86400 * 1000)
                        labels.push(time.getMonth() + 1 + "月" + time.getDate() + "日\n" + time.getHours() + "時")
                    }
                }

                standard -= 86400 * 1000
                head = tail
            }
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

const customLabel = (val: string) => {
    if (val.includes("\n")) {
        return (
            <darkModeContext.Consumer>
                {({ isDark, toggleIsDark }) => {
                    const color = colorSheet(isDark)
                    return (
                        <View style={{ width: 70, marginLeft: 15 }}>
                            <Text style={{ fontSize: 12, color: color.fontColor }}>{val}</Text>
                        </View>
                    )
                }}
            </darkModeContext.Consumer>
        );

    }
    return (
        <darkModeContext.Consumer>
            {({ isDark, toggleIsDark }) => {
                const color = colorSheet(isDark)
                return (
                    <View style={{ width: 70, marginLeft: 15, }}>
                        <Text style={{ color: color.fontColor }}>{val}</Text>
                    </View>
                )
            }}
        </darkModeContext.Consumer>
    );
};

const getChartData = (history: Array<any>, type: string, labels: Array<any>, reversed: boolean = false) => {
    const chartData = []
    for (let i = 0; i < history.length; i++) {
        let data = {
            value: history[i][`${type}_avg`],
            dataPointText: history[i][`${type}_avg`],
            labelComponent: () => customLabel(labels[i])
        }
        chartData.push(data)
    }
    if(reversed){
        return chartData.reverse()
    }
    return chartData
}

const ChartScreen = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [temperatureData, setTemperatureData] = useState([]);
    const [humidityData, setHumidityData] = useState([]);
    const { isDark, toggleIsDark } = useContext(darkModeContext)
    const color = colorSheet(isDark)
    const historyLIneChartStyle = styles(isDark)

    useEffect(() => {
        const getDataTask = getDatas(selectedIndex)
        getDataTask.then((response) => {
            let history = response.data
            let labels = getLabels(history, selectedIndex)
            if(selectedIndex == 1) {
                setTemperatureData(getChartData(history, 'temperature', labels, true))
                setHumidityData(getChartData(history, 'humidity', labels, true))
            }
            else {
                setTemperatureData(getChartData(history, 'temperature', labels))
                setHumidityData(getChartData(history, 'humidity', labels))    
            }
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
                selectedTextStyle={{ color: color.buttonSelectedText }}
                textStyle={{ color: color.buttonText }}
                selectedButtonStyle={{ backgroundColor: color.selectButtonColor }}
                containerStyle={{ backgroundColor: color.buttonColor }}
            />
            <Text style={historyLIneChartStyle.title}>溫度變化表</Text>
            <ScrollView style={historyLIneChartStyle.chart}>
                <HistoryLineChart data={temperatureData} type="temperature" />
            </ScrollView>
            
            <View style={{marginTop: 10}}></View>

            <Text style={historyLIneChartStyle.title}>濕度變化表</Text>
            <ScrollView style={historyLIneChartStyle.chart}>
                <HistoryLineChart data={humidityData} type="humidity" />
            </ScrollView>
        </View>
    )
}
            {/* <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <View style={{height: 10, width :10, borderRadius: 500, backgroundColor: color.temperatureDotColor}} />
                <Text style={historyLIneChartStyle.dotColor}>溫度</Text>
                <View style={{height: 10, width :10, borderRadius: 500, backgroundColor: color.humidityDotColor}} />
                <Text style={historyLIneChartStyle.dotColor}>濕度</Text>
            </View> */}

export default ChartScreen