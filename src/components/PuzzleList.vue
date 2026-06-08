<template>
  <div class="puzzle-list">
    <div class="filter-bar card">
      <div class="filter-row">
        <div class="filter-item">
          <label>棋类</label>
          <select v-model="store.filterType">
            <option value="all">全部</option>
            <option value="go">围棋</option>
            <option value="xiangqi">象棋</option>
          </select>
        </div>
        <div class="filter-item">
          <label>掌握程度</label>
          <select v-model="store.filterMaster">
            <option value="all">全部</option>
            <option value="mastered">已掌握</option>
            <option value="unmastered">未掌握</option>
          </select>
        </div>
      </div>
      <div class="stats">
        <span>共 {{ store.filteredPuzzles.length }} 题</span>
        <span class="mastered-count">已掌握 {{ masteredCount }}</span>
      </div>
    </div>

    <div class="puzzles-grid">
      <div
        v-for="puzzle in store.filteredPuzzles"
        :key="puzzle.id"
        class="puzzle-card card"
        :class="{ mastered: puzzle.master }"
        @click="$emit('select', puzzle)"
      >
        <div class="puzzle-header">
          <span class="puzzle-type" :class="puzzle.type">
            {{ puzzle.type === 'go' ? '围棋' : '象棋' }}
          </span>
          <span class="puzzle-difficulty" :class="puzzle.difficulty">
            {{ puzzle.difficulty }}
          </span>
          <button
            class="master-btn"
            :class="{ active: puzzle.master }"
            @click.stop="toggleMaster(puzzle.id)"
            :title="puzzle.master ? '标记为未掌握' : '标记为已掌握'"
          >
            {{ puzzle.master ? '⭐' : '☆' }}
          </button>
        </div>
        
        <h4 class="puzzle-name">{{ puzzle.name }}</h4>
        <p class="puzzle-desc">{{ puzzle.description }}</p>
        
        <div class="puzzle-footer">
          <span class="practice-count">练习 {{ puzzle.practiceCount || 0 }} 次</span>
          <span v-if="puzzle.lastPracticed" class="last-practice">
            上次: {{ puzzle.lastPracticed }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePuzzlesStore } from '../stores/puzzlesStore'

const store = usePuzzlesStore()

defineEmits(['select'])

const masteredCount = computed(() => {
  return store.filteredPuzzles.filter(p => p.master).length
})

function toggleMaster(id) {
  store.toggleMaster(id)
}
</script>

<style scoped>
.puzzle-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 12px;
}

.filter-row {
  display: flex;
  gap: 16px;
}

.filter-item {
  display: flex;
  flex-direction: column;
  min-width: 120px;
}

.stats {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: var(--text-secondary);
}

.mastered-count {
  color: var(--success);
  font-weight: 500;
}

.puzzles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.puzzle-card {
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
}

.puzzle-card:hover {
  transform: translateY(-3px);
  border-color: var(--accent-light);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.puzzle-card.mastered {
  background: linear-gradient(135deg, #fff9e6 0%, #fff 100%);
  border-color: #ffd700;
}

.puzzle-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.puzzle-type {
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
}

.puzzle-type.go {
  background-color: #e8d5b7;
  color: #8b4513;
}

.puzzle-type.xiangqi {
  background-color: #d4e8d4;
  color: #2e7d32;
}

.puzzle-difficulty {
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
}

.puzzle-difficulty.初级 {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.puzzle-difficulty.中级 {
  background-color: #fff3e0;
  color: #e65100;
}

.puzzle-difficulty.高级 {
  background-color: #ffebee;
  color: #c62828;
}

.master-btn {
  margin-left: auto;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 0 4px;
  transition: transform 0.2s;
}

.master-btn:hover {
  transform: scale(1.2);
}

.master-btn.active {
  color: #ffc107;
}

.puzzle-name {
  font-size: 16px;
  color: var(--text-primary);
  margin-bottom: 6px;
}

.puzzle-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 12px;
  flex: 1;
}

.puzzle-footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-secondary);
  padding-top: 10px;
  border-top: 1px solid var(--border);
}
</style>
