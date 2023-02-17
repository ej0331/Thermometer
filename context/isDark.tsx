import { createContext } from "react";


export const darkModeContext = createContext({ 
    isDark: false ,
    toggleIsDark:() => {}
})