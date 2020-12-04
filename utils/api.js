import AsyncStorage from '@react-native-async-storage/async-storage'
import { FLASH_CARDS_STORAGE_KEY } from './_flashcards'

// get Decks
export const getDecks = () => AsyncStorage.getItem(FLASH_CARDS_STORAGE_KEY);
// get Deck
export function getDeck (id) {
    return AsyncStorage.getItem(FLASH_CARDS_STORAGE_KEY)
      .then(results => JSON.parse(results)[id])
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
export function addCardToDeck (title, card) {
    // return AsyncStorage.getItem(FLASH_CARDS_STORAGE_KEY)
    //   .then(formatCalendarResults)
}

// export function fetchCalendarResults () {
//   return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
//     .then(formatCalendarResults)
// }

// export function submitEntry ({ entry, key }) {
//   return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
//     [key]: entry
//   }))
// }

// export function removeEntry (key) {
//   return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
//     .then((results) => {
//       const data = JSON.parse(results)
//       data[key] = undefined
//       delete data[key]
//       AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
//     })
// }