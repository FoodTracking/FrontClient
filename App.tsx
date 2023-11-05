import { QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from "./src/contexts/AuthContext";
import { queryClient } from "./src/lib/api/api";
import Navigation from "./src/navigation/RootStackNavigator";

export default function App() {
  const theme = useColorScheme();

  return (
    <SafeAreaProvider>
      <StatusBar style={"auto"} />
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Navigation colorScheme={theme ?? "light"} />
        </QueryClientProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
