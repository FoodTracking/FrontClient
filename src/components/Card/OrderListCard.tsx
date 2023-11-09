import { Feather } from '@expo/vector-icons';
import { Card } from '@rneui/themed';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OrderItem } from '../../types';
import { updateStatus } from '../../lib/api/api';

export interface OrderListCardProps {
  Customer: string;
  orderDetails: OrderItem[];
  price: number;
  style?: object;
  orderStatus: string;
  orderId: string;
  children?: React.ReactNode;
}
export default function OrderListCard({
  Customer,
  orderDetails,
  price,
  style,
  orderId,
  orderStatus,
}: OrderListCardProps) {
  return (
    <SafeAreaView>
      <Card
        containerStyle={{
          width: '90%',
          height: 200,
          marginHorizontal: 10,
          marginLeft: 20,
          borderWidth: 1,
          borderColor: 'grey',
          borderRadius: 10,
        }}
      >
        <Card.Title>{Customer}</Card.Title>
        <Card.Divider />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text style={{ marginBottom: 10 }}>
              Détail Commande :
              {orderDetails.map((products) => products.name).join(', ')}
            </Text>
            <Text style={{ marginBottom: 10 }}>Prix : {price} €</Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text>Status Commande: {orderStatus}</Text>
            <TouchableOpacity
              style={{
                right: 0,
              }}
              onPress={() => updateStatus(orderId)}
            >
              <Feather name='check-circle' size={24} color='black' />
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </SafeAreaView>
  );
}
