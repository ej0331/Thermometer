import { StyleSheet } from "react-native";
import colorSheet from "./color";
function thermometerStyles(isDark: Boolean) {
    const color = colorSheet(isDark)
    return StyleSheet.create({
        container: {
            // marginTop: 10,
            // borderWidth: StyleSheet.hairlineWidth,
        },
        title: {
            textAlign: "center",
            fontSize: 20,
            color: color.fontColor,
        },
    })
}

export default thermometerStyles