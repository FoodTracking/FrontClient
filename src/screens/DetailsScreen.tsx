import {StackScreenProps} from "@react-navigation/stack";
import {JSX} from "react";
import {Button, SafeAreaView, Text} from "react-native";

import {ExploreParamList} from "../navigation/ExploreStack";

export interface DetailsScreenProps {
  id: string;
  navigation: StackScreenProps<ExploreParamList>;
}

export default function DetailsScreen({
                                        id,
                                        navigation
                                      }: DetailsScreenProps): JSX.Element {

  return (
    <SafeAreaView>
      <Button>
        Return
      </Button>
      <Text>AAA</Text>


    </SafeAreaView>
  );
}