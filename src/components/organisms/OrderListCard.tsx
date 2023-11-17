import { Card, Text } from "@rneui/themed";
import React, { ReactNode } from "react";
import { View } from "react-native";

import { updateStatus } from "../../lib/api/api";
import { OrderItem } from "../../types";
import AppButton from "../atoms/AppButton";

export interface OrderListCardProps {
  customerName: string;
  orderId: string;
  orderDetails?: OrderItem[];
  price: number;
  orderStatus: string;
  canUpdate: boolean;
  children?: ReactNode;
}
export default function OrderListCard({
  customerName,
  orderDetails,
  orderId,
  price,
  canUpdate,
  orderStatus,
}: OrderListCardProps) {
  return (
    <Card
      containerStyle={{
        width: "90%",
        borderRadius: 10,
      }}
    >
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontWeight: "bold" }}>{customerName}</Text>
          <Text>Statut: {orderStatus}</Text>
        </View>
        <Text style={{ fontSize: 22 }}>{price} €</Text>
      </View>
      {orderDetails && (
        <>
          <Card.Divider style={{ marginTop: 10, marginBottom: 5 }} />
          <View
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text style={{ marginBottom: 10 }}>Détail :</Text>
                {orderDetails.map((item) => (
                  <View
                    key={item.productId}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>{item.name}</Text>
                    <Text>x{item.quantity}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </>
      )}
      {canUpdate && (
        <>
          <Card.Divider style={{ marginTop: 10, marginBottom: 10 }} />
          <AppButton
            title={"Étape suivante"}
            onPress={() => updateStatus(orderId)}
          />
        </>
      )}
    </Card>
  );
}
