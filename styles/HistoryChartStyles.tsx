import { StyleSheet } from 'react-native';
import colorSheet from './color';
function historyChartStyle(isDark: Boolean) {
    const color = colorSheet(isDark)

    return (StyleSheet.create({
        item: {
            padding: 10,
            fontSize: 18,
            height: 44,
        },
        button: {
            alignItems: 'center',
            padding: 10,
            marginTop: 10,
            backgroundColor: '#DDDDDD'
        },
        title: {
            paddingTop: 10,
            textAlign: "center",
            fontSize: 18,
            color: color.fontColor,
        },
        font: {
            fontSize: 32
        },
        dataPoint: {
            width: 5,
            height: 5,
            backgroundColor: 'white',
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#white',
        },
        customLabelView: {
            width: 70,
            marginLeft: 7
        },
        customLabelText: {
            color: 'white',
            fontWeight: 'bold'
        }
    }))
}


export default historyChartStyle