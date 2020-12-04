import * as React from 'react';
import { Button, Text, View, ScrollView } from 'react-native';
import { NavigationContainer, useNavigation, useNavigationState } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styled from "styled-components/native";
import PressableButton from './components/PressableButton'
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

const Card = ({ title = "Udaci Cards", totalCards = 5}) => (
	<Container>
		<Content>
			<Title>{title}</Title>
			<PriceCaption>{totalCards} cards</PriceCaption>
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
		</Content>
	</Container>
);


function DetailsScreen({ route, navigation }) {
  // const navigation = useNavigationState(s => s);
  const { title, totalCards } = route.params
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{JSON.stringify(navigation)}</Text>
      <Text>{title}</Text>
      <Text>{totalCards} Cards</Text>
    </View>
  );
}


function DecksListScreen({ navigation }) {
  return (
    <View >
    <View style={{ alignItems: "center" }}>
      <Text >Decks List screen</Text>
    </View>
      <ScrollView>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details', { title: "Udaci Cards", totalCards: 5 })}
        />
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
