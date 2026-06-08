<template>
  <div class="game-list">
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
          <label>结果</label>
          <select v-model="store.filterResult">
            <option value="all">全部</option>
            <option value="胜">胜</option>
            <option value="负">负</option>
            <option value="和">和</option>
          </select>
        </div>
        <div class="filter-item search-item">
          <label>搜索</label>
          <input
            v-model="store.searchKeyword"
            type="text"
            placeholder="对手、开局、心得..."
          />
        </div>
      </div>
      <div class="add-btn-wrap">
        <button class="btn btn-primary" @click="$emit('add')">+ 新增对局</button>
      </div>
    </div>

    <div class="games-container">
      <div v-if="store.filteredGames.length === 0" class="empty-state card">
        <p>还没有对局记录，点击上方按钮添加你的第一盘棋吧！</p>
      </div>
      <div
        v-for="game in store.filteredGames"
        :key="game.id"
        class="game-item card"
        @click="$emit('select', game)"
      >
        <div class="game-header">
          <span class="game-type" :class="game.type">
            {{ game.type === 'go' ? '围棋' : '象棋' }}
          </span>
          <span class="game-date">{{ game.date }}</span>
          <span class="game-result" :class="game.result">
            {{ game.result }}
          </span>
        </div>
        <div class="game-info">
          <p><strong>对手：</strong>{{ game.opponent }}</p>
          <p><strong>开局：</strong>{{ game.opening }}</p>
        </div>
        <div class="game-notes">
          {{ truncateText(game.notes, 80) }}
        </div>
        <div class="game-stats">
          <span>关键手 {{ game.keyMoves?.length || 0 }} 个</span>
          <span>失误 {{ game.mistakes?.length || 0 }} 处</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGamesStore } from '../stores/gamesStore'

const store = useGamesStore()

defineEmits(['add', 'select'])

function truncateText(text, maxLength) {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}
</script>

<style scoped>
.game-list {
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
  flex-wrap: wrap;
}

.filter-item {
  display: flex;
  flex-direction: column;
  min-width: 120px;
}

.search-item {
  min-width: 200px;
}

.add-btn-wrap {
  display: flex;
  align-items: flex-end;
}

.games-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: var(--text-secondary);
}

.game-item {
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
}

.game-item:hover {
  transform: translateY(-2px);
  border-color: var(--accent-light);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.game-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.game-type {
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.game-type.go {
  background-color: #e8d5b7;
  color: #8b4513;
}

.game-type.xiangqi {
  background-color: #d4e8d4;
  color: #2e7d32;
}

.game-date {
  color: var(--text-secondary);
  font-size: 13px;
}

.game-result {
  margin-left: auto;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
}

.game-result.胜 {
  background-color: #c8e6c9;
  color: #2e7d32;
}

.game-result.负 {
  background-color: #ffcdd2;
  color: #c62828;
}

.game-result.和 {
  background-color: #fff3e0;
  color: #e65100;
}

.game-info {
  display: flex;
  gap: 20px;
  margin-bottom: 8px;
  font-size: 14px;
}

.game-notes {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 10px;
  line-height: 1.5;
}

.game-stats {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: var(--text-secondary);
  padding-top: 10px;
  border-top: 1px solid var(--border);
}
</style>
