<template>
  <div class="game-form card">
    <h3>{{ isEdit ? '编辑对局' : '新增对局' }}</h3>
    
    <div class="form-grid">
      <div class="form-item">
        <label>棋类 *</label>
        <select v-model="form.type">
          <option value="go">围棋</option>
          <option value="xiangqi">象棋</option>
        </select>
      </div>
      
      <div class="form-item">
        <label>对局日期 *</label>
        <input v-model="form.date" type="date" />
      </div>
      
      <div class="form-item">
        <label>对手水平</label>
        <input v-model="form.opponent" type="text" placeholder="如：业余3段、市赛第8名" />
      </div>
      
      <div class="form-item">
        <label>结果</label>
        <select v-model="form.result">
          <option value="胜">胜</option>
          <option value="负">负</option>
          <option value="和">和</option>
        </select>
      </div>
      
      <div class="form-item full">
        <label>开局类型</label>
        <input v-model="form.opening" type="text" placeholder="如：星小目、中国流、中炮对屏风马" />
      </div>
    </div>
    
    <div class="section">
      <div class="section-header">
        <h4>关键手</h4>
        <button class="btn btn-secondary btn-sm" @click="addKeyMove">+ 添加</button>
      </div>
      <div class="moves-list">
        <div
          v-for="(move, idx) in form.keyMoves"
          :key="idx"
          class="move-item"
        >
          <input
            v-model.number="move.move"
            type="number"
            min="1"
            placeholder="手数"
            class="move-num"
          />
          <input
            v-model="move.description"
            type="text"
            placeholder="描述这手棋的重要性"
            class="move-desc"
          />
          <button class="btn btn-danger btn-sm" @click="removeKeyMove(idx)">删除</button>
        </div>
        <div v-if="form.keyMoves.length === 0" class="empty-hint">
          还没有添加关键手
        </div>
      </div>
    </div>
    
    <div class="section">
      <div class="section-header">
        <h4>失误记录</h4>
        <button class="btn btn-secondary btn-sm" @click="addMistake">+ 添加</button>
      </div>
      <div class="moves-list">
        <div
          v-for="(mistake, idx) in form.mistakes"
          :key="idx"
          class="move-item"
        >
          <input
            v-model.number="mistake.move"
            type="number"
            min="1"
            placeholder="手数"
            class="move-num"
          />
          <input
            v-model="mistake.reason"
            type="text"
            placeholder="失误原因分析"
            class="move-desc"
          />
          <button class="btn btn-danger btn-sm" @click="removeMistake(idx)">删除</button>
        </div>
        <div v-if="form.mistakes.length === 0" class="empty-hint">
          还没有添加失误记录
        </div>
      </div>
    </div>
    
    <div class="form-item full">
      <label>复盘心得</label>
      <textarea
        v-model="form.notes"
        rows="5"
        placeholder="写下你的复盘总结、心得体会..."
      ></textarea>
    </div>
    
    <div class="form-actions">
      <button class="btn btn-secondary" @click="$emit('cancel')">取消</button>
      <button class="btn btn-primary" @click="handleSubmit">保存</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useGamesStore } from '../stores/gamesStore'
import dayjs from 'dayjs'

const props = defineProps({
  game: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['cancel', 'saved'])

const store = useGamesStore()

const isEdit = ref(false)

const form = ref({
  type: 'go',
  date: dayjs().format('YYYY-MM-DD'),
  opponent: '',
  result: '负',
  opening: '',
  keyMoves: [],
  mistakes: [],
  notes: ''
})

onMounted(() => {
  if (props.game) {
    isEdit.value = true
    form.value = {
      ...props.game,
      keyMoves: [...(props.game.keyMoves || [])],
      mistakes: [...(props.game.mistakes || [])]
    }
  }
})

function addKeyMove() {
  form.value.keyMoves.push({ move: form.value.keyMoves.length + 1, description: '' })
}

function removeKeyMove(idx) {
  form.value.keyMoves.splice(idx, 1)
}

function addMistake() {
  form.value.mistakes.push({ move: form.value.mistakes.length + 1, reason: '' })
}

function removeMistake(idx) {
  form.value.mistakes.splice(idx, 1)
}

function handleSubmit() {
  if (isEdit.value) {
    store.updateGame(props.game.id, form.value)
  } else {
    store.addGame(form.value)
  }
  emit('saved')
}
</script>

<style scoped>
.game-form {
  max-width: 700px;
  margin: 0 auto;
}

h3 {
  margin-bottom: 20px;
  color: var(--accent);
  font-size: 20px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}

.form-item {
  display: flex;
  flex-direction: column;
}

.form-item.full {
  grid-column: 1 / -1;
}

.form-item input,
.form-item select,
.form-item textarea {
  width: 100%;
}

.section {
  margin-bottom: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.section-header h4 {
  color: var(--accent);
}

.moves-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.move-item {
  display: flex;
  gap: 8px;
  align-items: center;
}

.move-num {
  width: 80px;
}

.move-desc {
  flex: 1;
}

.empty-hint {
  color: var(--text-secondary);
  font-size: 13px;
  padding: 10px;
  text-align: center;
  background-color: var(--bg-primary);
  border-radius: 6px;
}

.btn-sm {
  padding: 4px 10px;
  font-size: 12px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}
</style>
