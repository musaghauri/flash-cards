import AsyncStorage from '@react-native-async-storage/async-storage'
import { FLASH_CARDS_STORAGE_KEY } from './_flashcards'

// get Decks
export const getDecks = () => AsyncStorage.getItem(FLASH_CARDS_STORAGE_KEY);
// get Deck
export const getDeck = async (id) => {
    const decks = await AsyncStorage.getItem(FLASH_CARDS_STORAGE_KEY)
    return JSON.parse(decks)[id];
}
// saveDeckTitle
export function saveDeckTitle (title) {
    return AsyncStorage.mergeItem(FLASH_CARDS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title,
            questions: []
        }
    }));
}
// addCardToDeck
export const addCardToDeck = async (title, card) => {
    const decks = await AsyncStorage.getItem(FLASH_CARDS_STORAGE_KEY)
    const deck = JSON.parse(decks)[title]
    return AsyncStorage.mergeItem(FLASH_CARDS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title,
            questions: [...deck.questions, ...[card]]
        }
    }));
}
