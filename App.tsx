import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from "./src/contexts/AuthContext";
import Navigation from "./src/navigation/RootStackNavigator";

export default function App() {
  const theme = useColorScheme();

  return (
    <SafeAreaProvider>
      <StatusBar style={"auto"} />
      <AuthProvider>
        <Navigation colorScheme={theme ?? "light"} />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
