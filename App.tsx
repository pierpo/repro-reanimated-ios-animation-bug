import { Button, StyleSheet, Text, View } from "react-native";
import { UncontrolledSwitch } from "./src/UncontrolledSwitch";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export const Page1 = () => {
  const { navigate } = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Use this switch. Animation should work at first.</Text>
      <UncontrolledSwitch />

      <Text>Go to the other page</Text>
      <Button
        title="go"
        onPress={() => {
          // @ts-ignore meh it's okay, navigation works
          navigate("Page2");
        }}
      />
    </View>
  );
};

export const Page2 = () => {
  return (
    <View style={styles.container}>
      <Text>Now, go back. Animation won't work anymore.</Text>
    </View>
  );
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Page1" component={Page1} />
        <Stack.Screen name="Page2" component={Page2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
