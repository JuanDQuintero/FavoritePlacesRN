import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors';
import AddPlace from './screens/AddPlace';
import AllPlaces from './screens/AllPlaces';
import Map from './screens/Map';
import { init } from './util/database';

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    init().then(() => {
      setDbInitialized(true);
      SplashScreen.hideAsync();
    }).catch((err) => {
      console.log(err);
      SplashScreen.hideAsync();
    });
  }, []);
  
  if (!dbInitialized) {
    return null;
  }

  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: Colors.gray700,
          contentStyle: {backgroundColor: Colors.gray700}
        }}>
          <Stack.Screen name="AllPlaces" component={AllPlaces} options={({ navigation }) => ({
            title: 'Your favorite places',
            headerRight: ({tintColor}) => <IconButton icon='add' size={24} color={tintColor} onPress={() => navigation.navigate('AddPlace')}/>
          })}/>
          <Stack.Screen name="AddPlace" component={AddPlace} options={{
            title: 'Add a new place'
          }}/>
          <Stack.Screen name = "Map" component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
