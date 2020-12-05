import React, { useState, useEffect } from 'react';
import _forOwn from 'lodash/forOwn'
import { Text, View } from 'react-native';
import PressableButton from './PressableButton';
import { getDeck } from '../utils/api';

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
      setShowAnswer(false);
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
            <Text>{correctAnswers} questions correct!</Text>
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

  export default StartQuizScreen;