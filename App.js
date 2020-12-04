import React, { useState, useEffect } from 'react';
import _forOwn from 'lodash/forOwn'
import { Button, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation, useNavigationState } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styled from "styled-components/native";
import PressableButton from './components/PressableButton';
import { getDecks, getDeck } from './utils/api';
const Container = styled.View`
	background: #fff;
	height: auto;
	width: 100%;
  border-radius: 14px;
  margin: 10px 0px;
  padding: 10px 0px;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`;


const Content = styled.View`
	flex-direction: column;
	align-items: center;
	height: auto;
`;

const Title = styled.Text`
	color: #3c4560;
	font-size: 20px;
	font-weight: 600;
`;

const PriceCaption = styled.Text`
	color: #b8b3c3;
	font-size: 15px;
	font-weight: 600;
	margin-top: 4px;
`;

const Card = (deck) => {
  const navigation = useNavigation();
  return <TouchableOpacity onPress={() => navigation.navigate('Details', { id: deck.title })}>
    <Container>
      <Content>
        <Title>{deck.title}</Title>
        <PriceCaption>{deck.questions.length} cards</PriceCaption>
      </Content>
    </Container>
  </TouchableOpacity>
};


function DetailsScreen({ route, navigation }) {
  // const navigation = useNavigationState(s => s);
  const { id } = route.params
  const deck = getDeck(id);
  // console.log({ deck })
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{deck.title}</Text>
      <Text>{deck?.questions?.length} Cards</Text>
      <PressableButton
        onPress={() => true}
        title='Add Card'
      />
      <PressableButton
        onPress={() => true}
        title='Start Quiz'
        bgColor="black"
        color="white"
      />
    </View>
  );
}


function DecksListScreen({ navigation }) {
  const [decks, setDecks] = useState({});
  const loadDecks = async () => {
    const fetchedDecks = await getDecks();
    setDecks(fetchedDecks||{ 
      React: { 
        title: "React", 
        questions: [{},{},{}]
      }
    });
  }

  useEffect(() => {
    loadDecks();
  }, [])

  const DECKS = [];
  _forOwn(decks, (val, key) => {
    DECKS.push(<Card key={`deck_${key}`} {...val} />)
  });
  return (
    <View >
      <ScrollView>
        {DECKS}
      </ScrollView>
    </View> 
  );
}

function AddDeckScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Add Deck screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const DecksListStack = createStackNavigator();

function DecksListStackScreen() {
  return (
    <DecksListStack.Navigator>
      <DecksListStack.Screen name="Decks" component={DecksListScreen} />
      <DecksListStack.Screen name="Details" component={DetailsScreen} />
    </DecksListStack.Navigator>
  );
}

const AddDeckStack = createStackNavigator();

function AddDeckStackScreen() {
  return (
    <AddDeckStack.Navigator>
      <AddDeckStack.Screen name="New Deck" component={AddDeckScreen} />
      <AddDeckStack.Screen name="Details" component={DetailsScreen} />
    </AddDeckStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Decks" component={DecksListStackScreen} />
        <Tab.Screen name="New Deck" component={AddDeckStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
