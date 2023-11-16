import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HeaderCustom({ title }: { title: string }) {
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#000",
              textAlign: "center",
              paddingBottom: 10,
            }}
          >
            {title}
          </Text>
        </TouchableOpacity>
        <View style={{ borderWidth: 0.5, borderColor: "grey" }} />
      </View>
    </SafeAreaView>
  );
}
