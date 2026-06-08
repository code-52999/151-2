import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { samplePuzzles } from '../data/sampleData'
import dayjs from 'dayjs'

const STORAGE_KEY = 'chess-notebook-puzzles'

export const usePuzzlesStore = defineStore('puzzles', () => {
  const puzzles = ref([])
  const filterType = ref('all')
  const filterMaster = ref('all')

  function loadFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      puzzles.value = JSON.parse(stored)
    } else {
      puzzles.value = [...samplePuzzles]
      saveToStorage()
    }
  }

  function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(puzzles.value))
  }

  const filteredPuzzles = computed(() => {
    return puzzles.value.filter(puzzle => {
      if (filterType.value !== 'all' && puzzle.type !== filterType.value) return false
      if (filterMaster.value === 'mastered' && !puzzle.master) return false
      if (filterMaster.value === 'unmastered' && puzzle.master) return false
      return true
    })
  })

  function addPuzzle(puzzle) {
    const newPuzzle = {
      ...puzzle,
      id: 'p' + Date.now(),
      master: false,
      practiceCount: 0,
      lastPracticed: null
    }
    puzzles.value.push(newPuzzle)
    saveToStorage()
  }

  function toggleMaster(id) {
    const puzzle = puzzles.value.find(p => p.id === id)
    if (puzzle) {
      puzzle.master = !puzzle.master
      saveToStorage()
    }
  }

  function recordPractice(id) {
    const puzzle = puzzles.value.find(p => p.id === id)
    if (puzzle) {
      puzzle.practiceCount++
      puzzle.lastPracticed = dayjs().format('YYYY-MM-DD')
      saveToStorage()
    }
  }

  function deletePuzzle(id) {
    puzzles.value = puzzles.value.filter(p => p.id !== id)
    saveToStorage()
  }

  return {
    puzzles,
    filterType,
    filterMaster,
    filteredPuzzles,
    loadFromStorage,
    addPuzzle,
    toggleMaster,
    recordPractice,
    deletePuzzle
  }
})
