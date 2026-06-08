<template>
  <div class="puzzle-practice">
    <div class="practice-header card">
      <button class="btn btn-secondary btn-sm" @click="$emit('back')">
        ← 返回卡片
      </button>
      <div class="puzzle-info">
        <span class="puzzle-type" :class="puzzle.type">
          {{ puzzle.type === 'go' ? '围棋' : '象棋' }}
        </span>
        <h2>{{ puzzle.name }}</h2>
        <span class="puzzle-difficulty" :class="puzzle.difficulty">
          {{ puzzle.difficulty }}
        </span>
      </div>
      <div class="practice-stats">
        <span>练习 {{ puzzle.practiceCount || 0 }} 次</span>
      </div>
    </div>

    <div class="practice-content">
      <div class="board-section card">
        <div class="section-title">
          <h3>题面</h3>
          <p class="puzzle-desc">{{ puzzle.description }}</p>
        </div>
        <div class="board-wrapper">
          <GoBoard
            v-if="puzzle.type === 'go'"
            :size="9"
            :stones="puzzle.initialStones || []"
            :cell-size="40"
          />
          <XiangqiBoard
            v-else
            :pieces="puzzle.initialPieces || []"
            :cell-size="50"
          />
        </div>
      </div>

      <div class="solution-section card">
        <div class="section-title">
          <h3>解法</h3>
          <button
            class="btn btn-secondary btn-sm"
            @click="showSolution = !showSolution"
          >
            {{ showSolution ? '隐藏答案' : '显示答案' }}
          </button>
        </div>
        <div v-if="showSolution" class="solution-content">
          <p>{{ puzzle.solution }}</p>
        </div>
        <div v-else class="solution-placeholder">
          <p>先自己想一想，再看答案哦~</p>
        </div>
      </div>
    </div>

    <div class="practice-actions card">
      <button class="btn btn-primary" @click="handlePractice">
        ✓ 标记练习完成
      </button>
      <button
        class="btn"
        :class="puzzle.master ? 'btn-secondary' : 'btn-primary'"
        @click="toggleMaster"
      >
        {{ puzzle.master ? '取消掌握' : '标记已掌握' }}
      </button>
      <button class="btn btn-danger" @click="handleDelete">
        删除此题
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePuzzlesStore } from '../stores/puzzlesStore'
import GoBoard from './GoBoard.vue'
import XiangqiBoard from './XiangqiBoard.vue'

const props = defineProps({
  puzzle: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['back', 'deleted'])

const store = usePuzzlesStore()
const showSolution = ref(false)

function handlePractice() {
  store.recordPractice(props.puzzle.id)
  alert('练习记录已更新！')
}

function toggleMaster() {
  store.toggleMaster(props.puzzle.id)
}

function handleDelete() {
  if (confirm('确定要删除这个残局卡片吗？')) {
    store.deletePuzzle(props.puzzle.id)
    emit('deleted')
  }
}
</script>

<style scoped>
.puzzle-practice {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 900px;
  margin: 0 auto;
}

.practice-header {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.puzzle-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.puzzle-type {
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 13px;
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

.puzzle-info h2 {
  font-size: 22px;
  color: var(--text-primary);
}

.puzzle-difficulty {
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 13px;
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

.practice-stats {
  font-size: 14px;
  color: var(--text-secondary);
}

.practice-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 768px) {
  .practice-content {
    grid-template-columns: 1fr 1fr;
  }
}

.board-section,
.solution-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.section-title h3 {
  font-size: 18px;
  color: var(--accent);
}

.puzzle-desc {
  font-size: 14px;
  color: var(--text-secondary);
  margin-top: 4px;
}

.board-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: var(--bg-primary);
  border-radius: 8px;
}

.solution-content {
  padding: 20px;
  background-color: var(--bg-primary);
  border-radius: 8px;
  line-height: 1.8;
  font-size: 15px;
  color: var(--text-primary);
}

.solution-placeholder {
  padding: 40px 20px;
  text-align: center;
  color: var(--text-secondary);
  background-color: var(--bg-primary);
  border-radius: 8px;
  font-style: italic;
}

.practice-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 13px;
}
</style>
