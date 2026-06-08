<template>
  <div class="game-detail">
    <div class="detail-header card">
      <div class="header-top">
        <button class="btn btn-secondary btn-sm" @click="$emit('back')">
          ← 返回列表
        </button>
        <div class="header-actions">
          <button class="btn btn-secondary btn-sm" @click="$emit('edit', game)">编辑</button>
          <button class="btn btn-danger btn-sm" @click="handleDelete">删除</button>
        </div>
      </div>
      
      <div class="game-meta">
        <span class="game-type" :class="game.type">
          {{ game.type === 'go' ? '围棋' : '象棋' }}
        </span>
        <h2>{{ game.date }}</h2>
        <span class="game-result" :class="game.result">
          {{ game.result }}
        </span>
      </div>
      
      <div class="game-info-grid">
        <div class="info-item">
          <label>对手水平</label>
          <p>{{ game.opponent || '未填写' }}</p>
        </div>
        <div class="info-item">
          <label>开局类型</label>
          <p>{{ game.opening || '未填写' }}</p>
        </div>
      </div>
    </div>
    
    <div class="detail-sections">
      <div v-if="game.keyMoves && game.keyMoves.length > 0" class="detail-section card">
        <h3>🔑 关键手</h3>
        <div class="moves-container">
          <div v-for="(move, idx) in game.keyMoves" :key="idx" class="move-card">
            <div class="move-number">第 {{ move.move }} 手</div>
            <p class="move-desc">{{ move.description }}</p>
          </div>
        </div>
      </div>
      
      <div v-if="game.mistakes && game.mistakes.length > 0" class="detail-section card">
        <h3>⚠️ 失误记录</h3>
        <div class="moves-container">
          <div v-for="(mistake, idx) in game.mistakes" :key="idx" class="move-card mistake">
            <div class="move-number">第 {{ mistake.move }} 手</div>
            <p class="move-desc">{{ mistake.reason }}</p>
          </div>
        </div>
      </div>
      
      <div v-if="game.notes" class="detail-section card">
        <h3>📝 复盘心得</h3>
        <div class="notes-content">
          {{ game.notes }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGamesStore } from '../stores/gamesStore'

const props = defineProps({
  game: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['back', 'edit', 'deleted'])

const store = useGamesStore()

function handleDelete() {
  if (confirm('确定要删除这盘对局记录吗？')) {
    store.deleteGame(props.game.id)
    emit('deleted')
  }
}
</script>

<style scoped>
.game-detail {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.game-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.game-type {
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 14px;
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

.game-meta h2 {
  font-size: 24px;
  color: var(--text-primary);
}

.game-result {
  padding: 4px 16px;
  border-radius: 16px;
  font-size: 16px;
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

.game-info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding-top: 12px;
  border-top: 1px solid var(--border);
}

.info-item label {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.info-item p {
  font-size: 16px;
  color: var(--text-primary);
  font-weight: 500;
}

.detail-sections {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-section h3 {
  font-size: 18px;
  color: var(--accent);
  margin-bottom: 16px;
}

.moves-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 12px;
}

.move-card {
  padding: 14px;
  background-color: var(--bg-primary);
  border-radius: 8px;
  border-left: 4px solid var(--accent);
}

.move-card.mistake {
  border-left-color: var(--danger);
}

.move-number {
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
  margin-bottom: 6px;
}

.move-card.mistake .move-number {
  color: var(--danger);
}

.move-desc {
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.5;
}

.notes-content {
  padding: 16px;
  background-color: var(--bg-primary);
  border-radius: 8px;
  font-size: 15px;
  line-height: 1.8;
  color: var(--text-primary);
  white-space: pre-wrap;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 13px;
}
</style>
