import {useColorScheme} from "react-native";
import Navigation from "./src/navigation/RootStackNavigator";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";


export default function App() {
  const [theme] = useColorScheme()
  return (
    <SafeAreaProvider>
      <StatusBar style={'auto'}/>
      <Navigation colorScheme={theme ?? 'light'}/>
    </SafeAreaProvider>
  );
}
