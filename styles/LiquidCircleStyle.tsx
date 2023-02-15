import { StyleSheet } from "react-native";

const waveStyles = StyleSheet.create({
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
        zIndex: 1,
    },
    waveValue: {
        fontSize: 20,
    },
    waveBall: {
        width: 150,
        position:'relative',
        aspectRatio: 1,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 50,
        overflow: 'hidden',
    },
    wave: {
        width: 150,
        aspectRatio: 1,
        overflow: 'hidden',
        backgroundColor: 'white',
    },
});

export default waveStyles