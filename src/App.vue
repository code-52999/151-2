<template>
  <div class="app">
    <header class="app-header">
      <div class="header-content">
        <h1>📖 棋友复盘小本子</h1>
        <nav class="nav-tabs">
          <button
            class="nav-tab"
            :class="{ active: currentTab === 'games' }"
            @click="switchTab('games')"
          >
            📋 对局记录
          </button>
          <button
            class="nav-tab"
            :class="{ active: currentTab === 'puzzles' }"
            @click="switchTab('puzzles')"
          >
            🧩 残局卡片
          </button>
        </nav>
      </div>
    </header>

    <main class="app-main">
      <div v-if="currentTab === 'games'" class="tab-content">
        <GameList
          v-if="gameView === 'list'"
          @add="gameView = 'add'"
          @select="handleGameSelect"
        />
        <GameForm
          v-else-if="gameView === 'add'"
          @cancel="gameView = 'list'"
          @saved="handleGameSaved"
        />
        <GameForm
          v-else-if="gameView === 'edit'"
          :game="selectedGame"
          @cancel="gameView = 'detail'"
          @saved="handleGameSaved"
        />
        <GameDetail
          v-else-if="gameView === 'detail'"
          :game="selectedGame"
          @back="gameView = 'list'"
          @edit="handleGameEdit"
          @deleted="handleGameDeleted"
        />
      </div>

      <div v-else-if="currentTab === 'puzzles'" class="tab-content">
        <PuzzleList
          v-if="puzzleView === 'list'"
          @select="handlePuzzleSelect"
        />
        <PuzzlePractice
          v-else
          :puzzle="selectedPuzzle"
          @back="puzzleView = 'list'"
          @deleted="handlePuzzleDeleted"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useGamesStore } from './stores/gamesStore'
import { usePuzzlesStore } from './stores/puzzlesStore'
import GameList from './components/GameList.vue'
import GameForm from './components/GameForm.vue'
import GameDetail from './components/GameDetail.vue'
import PuzzleList from './components/PuzzleList.vue'
import PuzzlePractice from './components/PuzzlePractice.vue'

const gamesStore = useGamesStore()
const puzzlesStore = usePuzzlesStore()

const currentTab = ref('games')
const gameView = ref('list')
const puzzleView = ref('list')
const selectedGame = ref(null)
const selectedPuzzle = ref(null)

onMounted(() => {
  gamesStore.loadFromStorage()
  puzzlesStore.loadFromStorage()
})

function switchTab(tab) {
  currentTab.value = tab
  gameView.value = 'list'
  puzzleView.value = 'list'
}

function handleGameSelect(game) {
  selectedGame.value = game
  gameView.value = 'detail'
}

function handleGameEdit(game) {
  selectedGame.value = game
  gameView.value = 'edit'
}

function handleGameSaved() {
  gameView.value = 'list'
}

function handleGameDeleted() {
  gameView.value = 'list'
}

function handlePuzzleSelect(puzzle) {
  selectedPuzzle.value = puzzle
  puzzleView.value = 'practice'
}

function handlePuzzleDeleted() {
  puzzleView.value = 'list'
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.app-header h1 {
  font-size: 22px;
  color: var(--accent);
  font-weight: 700;
}

.nav-tabs {
  display: flex;
  gap: 8px;
}

.nav-tab {
  padding: 8px 20px;
  border: none;
  background: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  color: var(--text-secondary);
  transition: all 0.2s;
}

.nav-tab:hover {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.nav-tab.active {
  background-color: var(--accent);
  color: #fff;
}

.app-main {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 24px;
}

.tab-content {
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
