import { darkModeContext } from "../context/isDark"
import { Switch } from "react-native-elements"
import { useContext } from "react"

function DarkSwitch() {
    const { isDark, toggleIsDark } = useContext(darkModeContext)

    return (
        <Switch
            trackColor={{ false: '#767577', true: '#767577' }}
            thumbColor='#f4f3f4'
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleIsDark}
            value={isDark}
        />
    )
}
export default DarkSwitch