import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { sampleGames } from '../data/sampleData'

const STORAGE_KEY = 'chess-notebook-games'

export const useGamesStore = defineStore('games', () => {
  const games = ref([])
  const filterType = ref('all')
  const filterResult = ref('all')
  const searchKeyword = ref('')

  function loadFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      games.value = JSON.parse(stored)
    } else {
      games.value = [...sampleGames]
      saveToStorage()
    }
  }

  function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(games.value))
  }

  const filteredGames = computed(() => {
    return games.value.filter(game => {
      if (filterType.value !== 'all' && game.type !== filterType.value) return false
      if (filterResult.value !== 'all' && game.result !== filterResult.value) return false
      if (searchKeyword.value) {
        const keyword = searchKeyword.value.toLowerCase()
        return (
          game.opponent.toLowerCase().includes(keyword) ||
          game.opening.toLowerCase().includes(keyword) ||
          game.notes.toLowerCase().includes(keyword)
        )
      }
      return true
    }).sort((a, b) => new Date(b.date) - new Date(a.date))
  })

  function addGame(game) {
    const newGame = {
      ...game,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    games.value.unshift(newGame)
    saveToStorage()
  }

  function updateGame(id, updates) {
    const index = games.value.findIndex(g => g.id === id)
    if (index !== -1) {
      games.value[index] = { ...games.value[index], ...updates }
      saveToStorage()
    }
  }

  function deleteGame(id) {
    games.value = games.value.filter(g => g.id !== id)
    saveToStorage()
  }

  function getGameById(id) {
    return games.value.find(g => g.id === id)
  }

  return {
    games,
    filterType,
    filterResult,
    searchKeyword,
    filteredGames,
    loadFromStorage,
    addGame,
    updateGame,
    deleteGame,
    getGameById
  }
})
