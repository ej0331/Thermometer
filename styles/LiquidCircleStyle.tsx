import { StyleSheet } from "react-native";
import colorSheet from "./color";
function waveStyles(isDark: Boolean) {
    const color = colorSheet(isDark)
    return StyleSheet.create({
        container: {
            // borderWidth: StyleSheet.hairlineWidth,
            alignItems: "center",
            justifyContent: "center",
        },
        waveTitle: {
            fontSize: 24,
            alignItems: "center",
            position: "absolute",
            // paddingTop: 40,
            // color:'#F8F8F8',
            zIndex: 1,
        },
        waveValue: {
            fontSize: 20,
            color: color.fontColor
        },
        waveBall: {
            width: 150,
            position: 'relative',
            aspectRatio: 1,
            borderWidth: 1,
            borderColor: color.fontColor,
            borderRadius: 50,
            overflow: 'hidden',
        },
        wave: {
            width: 150,
            aspectRatio: 1,
            overflow: 'hidden',
            backgroundColor: 'white',
        },
    })
}


export default waveStyles