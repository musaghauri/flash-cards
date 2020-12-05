import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { setLocalNotification } from './utils/helpers';
import { FontAwesome, Ionicons } from '@expo/vector-icons'

import StartQuizScreen from './components/StartQuiz'
import DetailsScreen from './components/DeckDetails'
import DecksListScreen from './components/DecksList'
import AddDeckScreen from './components/AddDeck'
import AddCardScreen from './components/AddCard'


const DecksListStack = createStackNavigator();

function DecksListStackScreen() {
  return (
    <DecksListStack.Navigator>
      <DecksListStack.Screen name="Decks" component={DecksListScreen} />
      <DecksListStack.Screen name="Details" component={DetailsScreen} />
      <DecksListStack.Screen name="AddCard" component={AddCardScreen} />
      <DecksListStack.Screen name="StartQuiz" component={StartQuizScreen} />
    </DecksListStack.Navigator>
  );
}

const AddDeckStack = createStackNavigator();

function AddDeckStackScreen() {
  return (
    <AddDeckStack.Navigator>
      <AddDeckStack.Screen name="New Deck" component={AddDeckScreen} />
      <DecksListStack.Screen name="Details" component={DetailsScreen} />
      <DecksListStack.Screen name="AddCard" component={AddCardScreen} />
      <DecksListStack.Screen name="StartQuiz" component={StartQuizScreen} />
    </AddDeckStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    setLocalNotification();
  }, [])
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          options={{
            unmountOnBlur: true,
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
          }}
          name="DecksStack" 
          component={DecksListStackScreen} 
        />
        <Tab.Screen 
          options={{ 
            unmountOnBlur: true,
            tabBarLabel: 'New Deck',
            tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
          }} 
          name="NewDeckStack" 
          component={AddDeckStackScreen} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
