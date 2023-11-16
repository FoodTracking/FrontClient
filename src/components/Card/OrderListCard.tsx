import { Feather } from "@expo/vector-icons";
import { Card } from "@rneui/themed";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { updateStatus } from "../../lib/api/api";
import { OrderItem } from "../../types";

export interface OrderListCardProps {
  Customer: string;
  orderDetails?: OrderItem[];
  price: number;
  style?: object;
  orderStatus: string;
  orderId: string;
  canUpdate: boolean;
  children?: React.ReactNode;
}
export default function OrderListCard({
  Customer,
  orderDetails,
  price,
  style,
  canUpdate,
  orderId,
  orderStatus,
}: OrderListCardProps) {
  return (
    <Card
      containerStyle={{
        width: "90%",
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 10,
      }}
    >
      <Card.Title>{Customer}</Card.Title>
      <Card.Divider />
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View>
          {orderDetails && (
            <Text style={{ marginBottom: 10 }}>
              Détail Commande :
              {orderDetails
                .map(
                  (products) =>
                    " " + products.name + " Quantité: " + products.quantity,
                )
                .join("\n")}
            </Text>
          )}
          <Text style={{ marginBottom: 10 }}>Prix : {price} €</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>Status Commande: {orderStatus}</Text>
          {canUpdate && (
            <TouchableOpacity
              style={{
                right: 0,
              }}
              onPress={() => updateStatus(orderId)}
            >
              <Feather name="check-circle" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Card>
  );
}
