import { darkModeContext } from "../context/isDark"
import { Switch } from "react-native-elements"

function DarkSwitch() {

    return (
        <darkModeContext.Consumer>
            {({ isDark, toggleIsDark }) => {
                return (
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isDark ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleIsDark}
                        value={isDark}
                    />
                )

            }}
        </darkModeContext.Consumer>
    )
}
export default DarkSwitch