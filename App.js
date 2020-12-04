import React, { useState, useEffect } from 'react';
import _forOwn from 'lodash/forOwn'
import { Button, Text, View, ScrollView, TouchableOpacity, TouchableWithoutFeedback, TextInput, Keyboard, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer, useNavigation, useNavigationState } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styled from "styled-components/native";
import PressableButton from './components/PressableButton';
import { getDecks, getDeck, saveDeckTitle, addCardToDeck } from './utils/api';
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
  const [deck, setDeck] = useState({});
  const { id } = route.params
  const loadDeck = async () => {
    let fetchedDeck = await getDeck(id);
    setDeck(fetchedDeck);
  }

  useEffect(() => {
    loadDeck();
  }, []);

  useEffect(() => {
    // Interval to update count

    // Subscribe for the focus Listener
    const unsubscribe = navigation.addListener('focus', () => {
      loadDeck();
    });

    return () => {
      // Unsubscribe for the focus Listener
      unsubscribe;
    };
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{deck.title}</Text>
      <Text>{deck?.questions?.length} Cards</Text>
      <PressableButton
        onPress={() => navigation.navigate("AddCard", { title: deck.title })}
        title='Add Card'
      />
      <PressableButton
        onPress={() => navigation.navigate("StartQuiz", { title: deck.title })}
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
    let fetchedDecks = await getDecks();
    fetchedDecks = JSON.parse(fetchedDecks);
    setDecks(fetchedDecks);
  }

  useEffect(() => {
    loadDecks();
  }, [])

  useEffect(() => {
    // Interval to update count

    // Subscribe for the focus Listener
    const unsubscribe = navigation.addListener('focus', () => {
      loadDecks();
    });

    return () => {
      // Unsubscribe for the focus Listener
      unsubscribe;
    };
  }, [navigation]);

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
  const [deckName, setDeckName] = useState('');

  const addDeck = async () => {
    await saveDeckTitle(deckName);
    setDeckName('');
    navigation.navigate('Details', { id: deckName })
  }
  const Title = styled.Text`
    font-size: 18px
  `;

  const TextField = styled.TextInput`
    height: 40px;
    border-color: #000000;
    border-width: 1px;
    width: 100%;
    border-radius: 3px;
    margin: 12px 0;
  `;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Title>What is the title of your new Deck?</Title>
            <TextField value={deckName} onChangeText={text => setDeckName(text)} placeholder="Deck Title" />
            <View>
              <PressableButton
                onPress={addDeck}
                title='Submit'
                bgColor="black"
                color="white"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}


function AddCardScreen({ route, navigation }) {
  const { title } = route.params;
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const addCard = async () => {
    await addCardToDeck(title, { question, answer });
    navigation.goBack()
  }
  const Title = styled.Text`
    font-size: 18px
  `;

  const TextField = styled.TextInput`
    height: 40px;
    border-color: #000000;
    border-width: 1px;
    width: 100%;
    border-radius: 3px;
    margin: 12px 0;
  `;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Title>Add Card to {title}</Title>
            <TextField value={question} onChangeText={text => setQuestion(text)} placeholder="Card Question" />
            <TextField value={answer} onChangeText={text => setAnswer(text)} placeholder="Card Answer" />
            <View>
              <PressableButton
                onPress={addCard}
                title='Submit'
                bgColor="black"
                color="white"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}


function StartQuizScreen({ route, navigation }) {
  const { title } = route.params;
  const [deck, setDeck] = useState({});
  const [questionsRemaining, setQuestionsRemaining] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const loadDeck = async () => {
    let fetchedDeck = await getDeck(title);
    setDeck(fetchedDeck);
    setQuestionsRemaining(fetchedDeck.questions.length);
  }

  useEffect(() => {
    loadDeck();
  }, []);


  const checkAnswer = (answer) => {
    setQuestionsRemaining(questionsRemaining - 1);
    if (answer) setCorrectAnswers(correctAnswers + 1);
    if (questionsRemaining === 1) setQuizComplete(true);
  }
  const restartQuiz = () => {
    setQuestionsRemaining(deck.questions.length);
    setCorrectAnswers(0);
    setQuizComplete(false);
    setShowAnswer(false);
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {
        quizComplete ?
          <>
          <PressableButton
            onPress={restartQuiz}
            title='Restart Quiz'
            bgColor="white"
            color="black"
          />
          <PressableButton
            onPress={() => navigation.goBack()}
            title='Back to Deck'
            bgColor="black"
            color="white"
          />
          </>
          :
          <>
            <Text>{questionsRemaining} Qs Remaining</Text>
            {deck.questions && <Text>{
              showAnswer ?
                deck?.questions[questionsRemaining - 1]?.answer
                :
                deck?.questions[questionsRemaining - 1]?.question
            }
            </Text>}
            <PressableButton
              onPress={() => setShowAnswer(!showAnswer)}
              title='Show Answer'
              bgColor="blue"
              color="white"
            />
            <PressableButton
              onPress={() => checkAnswer(true)}
              title='Correct'
              bgColor="green"
              color="white"
            />
            <PressableButton
              onPress={() => checkAnswer(false)}
              title='Incorrect'
              bgColor="red"
              color="white"
            />
          </>
      }

    </View>
  );
}


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
    </AddDeckStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen options={{ unmountOnBlur: true }} name="DecksStack" component={DecksListStackScreen} />
        <Tab.Screen options={{ unmountOnBlur: true }} name="NewDeckStack" component={AddDeckStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
