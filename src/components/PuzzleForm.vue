<template>
  <div class="puzzle-form card">
    <h3>新增残局</h3>

    <div class="form-grid">
      <div class="form-item full">
        <label>残局名称 *</label>
        <input v-model="form.name" type="text" placeholder="如：马后炮杀、倒脱靴" />
      </div>

      <div class="form-item">
        <label>棋类 *</label>
        <select v-model="form.type" @change="handleTypeChange">
          <option value="xiangqi">象棋</option>
          <option value="go">围棋</option>
        </select>
      </div>

      <div class="form-item">
        <label>难度 *</label>
        <select v-model="form.difficulty">
          <option value="初级">初级</option>
          <option value="中级">中级</option>
          <option value="高级">高级</option>
        </select>
      </div>

      <div class="form-item full">
        <label>描述</label>
        <input v-model="form.description" type="text" placeholder="简单描述这个残局" />
      </div>

      <div class="form-item full">
        <label>解法</label>
        <textarea
          v-model="form.solution"
          rows="3"
          placeholder="写下残局的解法步骤..."
        ></textarea>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h4>初始局面设置</h4>
        <div class="board-tools">
          <button class="btn btn-secondary btn-sm" @click="clearBoard">清空棋盘</button>
        </div>
      </div>

      <div v-if="form.type === 'xiangqi'" class="board-setup">
        <div class="piece-selector">
          <div class="selector-group">
            <label>选择颜色</label>
            <div class="color-options">
              <button
                class="color-btn red"
                :class="{ active: selectedColor === 'red' }"
                @click="selectedColor = 'red'"
              >
                红方
              </button>
              <button
                class="color-btn black"
                :class="{ active: selectedColor === 'black' }"
                @click="selectedColor = 'black'"
              >
                黑方
              </button>
            </div>
          </div>
          <div class="selector-group">
            <label>选择棋子</label>
            <div class="piece-options">
              <button
                v-for="piece in xiangqiPieces"
                :key="piece.type"
                class="piece-btn"
                :class="{ active: selectedPiece === piece.type }"
                @click="selectedPiece = piece.type"
              >
                {{ piece.text }}
              </button>
            </div>
          </div>
          <div class="selector-tip">
            <p>💡 提示：选择棋子后点击棋盘放置</p>
            <p>💡 点击已有棋子可移除</p>
          </div>
        </div>
        <div class="board-wrapper">
          <svg
            :width="boardWidth"
            :height="boardHeight"
            :viewBox="`0 0 ${boardWidth} ${boardHeight}`"
            @click="handleXiangqiBoardClick"
            class="clickable-board"
          >
            <rect :width="boardWidth" :height="boardHeight" fill="#e6c88a" />

            <g v-for="i in 10" :key="'h' + i">
              <line
                :x1="padding"
                :y1="padding + (i - 1) * cellSize"
                :x2="padding + 8 * cellSize"
                :y2="padding + (i - 1) * cellSize"
                stroke="#5c4033"
                stroke-width="1.5"
              />
            </g>

            <g v-for="i in 9" :key="'v' + i">
              <line
                v-if="i === 1 || i === 9"
                :x1="padding + (i - 1) * cellSize"
                :y1="padding"
                :x2="padding + (i - 1) * cellSize"
                :y2="padding + 9 * cellSize"
                stroke="#5c4033"
                stroke-width="1.5"
              />
              <template v-else>
                <line
                  :x1="padding + (i - 1) * cellSize"
                  :y1="padding"
                  :x2="padding + (i - 1) * cellSize"
                  :y2="padding + 4 * cellSize"
                  stroke="#5c4033"
                  stroke-width="1.5"
                />
                <line
                  :x1="padding + (i - 1) * cellSize"
                  :y1="padding + 5 * cellSize"
                  :x2="padding + (i - 1) * cellSize"
                  :y2="padding + 9 * cellSize"
                  stroke="#5c4033"
                  stroke-width="1.5"
                />
              </template>
            </g>

            <line
              :x1="padding + 3 * cellSize"
              :y1="padding"
              :x2="padding + 5 * cellSize"
              :y2="padding + 2 * cellSize"
              stroke="#5c4033"
              stroke-width="1.5"
            />
            <line
              :x1="padding + 5 * cellSize"
              :y1="padding"
              :x2="padding + 3 * cellSize"
              :y2="padding + 2 * cellSize"
              stroke="#5c4033"
              stroke-width="1.5"
            />
            <line
              :x1="padding + 3 * cellSize"
              :y1="padding + 7 * cellSize"
              :x2="padding + 5 * cellSize"
              :y2="padding + 9 * cellSize"
              stroke="#5c4033"
              stroke-width="1.5"
            />
            <line
              :x1="padding + 5 * cellSize"
              :y1="padding + 7 * cellSize"
              :x2="padding + 3 * cellSize"
              :y2="padding + 9 * cellSize"
              stroke="#5c4033"
              stroke-width="1.5"
            />

            <g class="palace-text">
              <text
                :x="padding + cellSize * 1.5"
                :y="padding + cellSize * 4.7"
                text-anchor="middle"
                dominant-baseline="middle"
                fill="#5c4033"
                font-size="18"
                font-weight="bold"
                font-family="KaiTi, STKaiti, serif"
              >楚 河</text>
              <text
                :x="padding + cellSize * 6.5"
                :y="padding + cellSize * 4.7"
                text-anchor="middle"
                dominant-baseline="middle"
                fill="#5c4033"
                font-size="18"
                font-weight="bold"
                font-family="KaiTi, STKaiti, serif"
              >漢 界</text>
            </g>

            <g v-for="(piece, idx) in form.initialPieces" :key="'piece' + idx">
              <circle
                :cx="padding + piece.x * cellSize"
                :cy="padding + piece.y * cellSize"
                :r="cellSize * 0.42"
                :fill="piece.color === 'red' ? '#f8e8d0' : '#f5e6c8'"
                :stroke="piece.color === 'red' ? '#c0392b' : '#2c2c2c'"
                stroke-width="2"
              />
              <circle
                :cx="padding + piece.x * cellSize"
                :cy="padding + piece.y * cellSize"
                :r="cellSize * 0.36"
                fill="none"
                :stroke="piece.color === 'red' ? '#c0392b' : '#2c2c2c'"
                stroke-width="1"
              />
              <text
                :x="padding + piece.x * cellSize"
                :y="padding + piece.y * cellSize"
                text-anchor="middle"
                dominant-baseline="middle"
                :fill="piece.color === 'red' ? '#c0392b' : '#2c2c2c'"
                :font-size="cellSize * 0.38"
                font-weight="bold"
                font-family="KaiTi, STKaiti, serif"
              >{{ getXiangqiPieceText(piece) }}</text>
            </g>
          </svg>
        </div>
      </div>

      <div v-else class="board-setup">
        <div class="piece-selector">
          <div class="selector-group">
            <label>选择棋子</label>
            <div class="color-options">
              <button
                class="color-btn black-stone"
                :class="{ active: selectedStoneColor === 'B' }"
                @click="selectedStoneColor = 'B'"
              >
                黑子
              </button>
              <button
                class="color-btn white-stone"
                :class="{ active: selectedStoneColor === 'W' }"
                @click="selectedStoneColor = 'W'"
              >
                白子
              </button>
            </div>
          </div>
          <div class="selector-group">
            <label>棋盘大小</label>
            <select v-model.number="goBoardSize">
              <option :value="9">9路</option>
              <option :value="13">13路</option>
              <option :value="19">19路</option>
            </select>
          </div>
          <div class="selector-tip">
            <p>💡 提示：选择棋子后点击交叉点放置</p>
            <p>💡 点击已有棋子可移除</p>
          </div>
        </div>
        <div class="board-wrapper">
          <svg
            :width="goBoardSizePx"
            :height="goBoardSizePx"
            :viewBox="`0 0 ${goBoardSizePx} ${goBoardSizePx}`"
            @click="handleGoBoardClick"
            class="clickable-board"
          >
            <rect :width="goBoardSizePx" :height="goBoardSizePx" fill="#e6c88a" />

            <g v-for="i in goBoardSize" :key="'h' + i">
              <line
                :x1="goPadding"
                :y1="goPadding + (i - 1) * goCellSize"
                :x2="goPadding + (goBoardSize - 1) * goCellSize"
                :y2="goPadding + (i - 1) * goCellSize"
                stroke="#5c4033"
                stroke-width="1"
              />
            </g>

            <g v-for="i in goBoardSize" :key="'v' + i">
              <line
                :x1="goPadding + (i - 1) * goCellSize"
                :y1="goPadding"
                :x2="goPadding + (i - 1) * goCellSize"
                :y2="goPadding + (goBoardSize - 1) * goCellSize"
                stroke="#5c4033"
                stroke-width="1"
              />
            </g>

            <circle
              v-for="(star, idx) in starPoints"
              :key="'star' + idx"
              :cx="goPadding + star.x * goCellSize"
              :cy="goPadding + star.y * goCellSize"
              r="4"
              fill="#5c4033"
            />

            <g v-for="(stone, idx) in form.initialStones" :key="'stone' + idx">
              <circle
                :cx="goPadding + stone.x * goCellSize"
                :cy="goPadding + stone.y * goCellSize"
                :r="goCellSize * 0.45"
                :fill="stone.color === 'B' ? '#1a1a1a' : '#f5f5f5'"
                :stroke="stone.color === 'B' ? '#000' : '#ccc'"
                stroke-width="1"
              />
              <circle
                v-if="stone.color === 'W'"
                :cx="goPadding + stone.x * goCellSize - 2"
                :cy="goPadding + stone.y * goCellSize - 2"
                :r="goCellSize * 0.15"
                fill="rgba(255,255,255,0.3)"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>

    <div class="form-actions">
      <button class="btn btn-secondary" @click="$emit('cancel')">取消</button>
      <button class="btn btn-primary" @click="handleSubmit">保存</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePuzzlesStore } from '../stores/puzzlesStore'

const emit = defineEmits(['cancel', 'saved'])

const store = usePuzzlesStore()

const form = ref({
  name: '',
  type: 'xiangqi',
  difficulty: '初级',
  description: '',
  solution: '',
  initialPieces: [],
  initialStones: []
})

const cellSize = 50
const padding = 25
const boardWidth = 8 * cellSize + padding * 2
const boardHeight = 9 * cellSize + padding * 2

const selectedColor = ref('red')
const selectedPiece = ref('general')

const goBoardSize = ref(9)
const selectedStoneColor = ref('B')
const goCellSize = 30
const goPadding = 20

const goBoardSizePx = computed(() => (goBoardSize.value - 1) * goCellSize + goPadding * 2)

const xiangqiPieces = [
  { type: 'general', text: '帥/將' },
  { type: 'advisor', text: '仕/士' },
  { type: 'elephant', text: '相/象' },
  { type: 'horse', text: '馬' },
  { type: 'chariot', text: '車' },
  { type: 'cannon', text: '炮/砲' },
  { type: 'soldier', text: '兵/卒' }
]

const xiangqiPieceMap = {
  general: { red: '帥', black: '將' },
  advisor: { red: '仕', black: '士' },
  elephant: { red: '相', black: '象' },
  horse: { red: '馬', black: '馬' },
  chariot: { red: '車', black: '車' },
  cannon: { red: '炮', black: '砲' },
  soldier: { red: '兵', black: '卒' }
}

const starPoints = computed(() => {
  const size = goBoardSize.value
  if (size === 19) {
    return [
      { x: 3, y: 3 }, { x: 9, y: 3 }, { x: 15, y: 3 },
      { x: 3, y: 9 }, { x: 9, y: 9 }, { x: 15, y: 9 },
      { x: 3, y: 15 }, { x: 9, y: 15 }, { x: 15, y: 15 }
    ]
  } else if (size === 13) {
    return [
      { x: 3, y: 3 }, { x: 9, y: 3 },
      { x: 6, y: 6 },
      { x: 3, y: 9 }, { x: 9, y: 9 }
    ]
  } else if (size === 9) {
    return [
      { x: 2, y: 2 }, { x: 6, y: 2 },
      { x: 4, y: 4 },
      { x: 2, y: 6 }, { x: 6, y: 6 }
    ]
  }
  return []
})

function getXiangqiPieceText(piece) {
  return xiangqiPieceMap[piece.type]?.[piece.color] || ''
}

function handleTypeChange() {
  form.value.initialPieces = []
  form.value.initialStones = []
}

function handleXiangqiBoardClick(event) {
  const svg = event.currentTarget
  const rect = svg.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const scaleX = boardWidth / rect.width
  const scaleY = boardHeight / rect.height

  const svgX = x * scaleX
  const svgY = y * scaleY

  const gridX = Math.round((svgX - padding) / cellSize)
  const gridY = Math.round((svgY - padding) / cellSize)

  if (gridX < 0 || gridX > 8 || gridY < 0 || gridY > 9) return

  const existingIndex = form.value.initialPieces.findIndex(
    p => p.x === gridX && p.y === gridY
  )

  if (existingIndex !== -1) {
    form.value.initialPieces.splice(existingIndex, 1)
  } else {
    form.value.initialPieces.push({
      type: selectedPiece.value,
      color: selectedColor.value,
      x: gridX,
      y: gridY
    })
  }
}

function handleGoBoardClick(event) {
  const svg = event.currentTarget
  const rect = svg.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const scale = goBoardSizePx.value / rect.width

  const svgX = x * scale
  const svgY = y * scale

  const gridX = Math.round((svgX - goPadding) / goCellSize)
  const gridY = Math.round((svgY - goPadding) / goCellSize)

  if (gridX < 0 || gridX >= goBoardSize.value || gridY < 0 || gridY >= goBoardSize.value) return

  const existingIndex = form.value.initialStones.findIndex(
    s => s.x === gridX && s.y === gridY
  )

  if (existingIndex !== -1) {
    form.value.initialStones.splice(existingIndex, 1)
  } else {
    form.value.initialStones.push({
      x: gridX,
      y: gridY,
      color: selectedStoneColor.value
    })
  }
}

function clearBoard() {
  if (form.value.type === 'xiangqi') {
    form.value.initialPieces = []
  } else {
    form.value.initialStones = []
  }
}

function handleSubmit() {
  if (!form.value.name.trim()) {
    alert('请填写残局名称')
    return
  }

  const puzzleData = {
    name: form.value.name,
    type: form.value.type,
    difficulty: form.value.difficulty,
    description: form.value.description,
    solution: form.value.solution
  }

  if (form.value.type === 'xiangqi') {
    puzzleData.initialPieces = [...form.value.initialPieces]
  } else {
    puzzleData.initialStones = [...form.value.initialStones]
  }

  store.addPuzzle(puzzleData)
  emit('saved')
}
</script>

<style scoped>
.puzzle-form {
  max-width: 900px;
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
  margin-bottom: 16px;
}

.section-header h4 {
  color: var(--accent);
}

.board-tools {
  display: flex;
  gap: 8px;
}

.btn-sm {
  padding: 4px 10px;
  font-size: 12px;
}

.board-setup {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.piece-selector {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 180px;
  background-color: var(--bg-primary);
  padding: 16px;
  border-radius: 8px;
}

.selector-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.selector-group label {
  font-size: 13px;
  color: var(--text-secondary);
  font-weight: 500;
}

.color-options {
  display: flex;
  gap: 8px;
}

.color-btn {
  flex: 1;
  padding: 8px 12px;
  border: 2px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  background-color: #fff;
  transition: all 0.2s;
}

.color-btn.red {
  color: #c0392b;
}

.color-btn.black {
  color: #2c2c2c;
}

.color-btn.black-stone {
  background-color: #2c2c2c;
  color: #fff;
  border-color: #2c2c2c;
}

.color-btn.white-stone {
  background-color: #f5f5f5;
  color: #333;
  border-color: #ccc;
}

.color-btn.active {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px rgba(139, 69, 19, 0.2);
}

.piece-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
}

.piece-btn {
  padding: 8px 6px;
  border: 2px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  background-color: #fff;
  transition: all 0.2s;
  font-family: KaiTi, STKaiti, serif;
  font-weight: bold;
}

.piece-btn.active {
  border-color: var(--accent);
  background-color: rgba(139, 69, 19, 0.1);
}

.selector-tip {
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.8;
  padding-top: 8px;
  border-top: 1px dashed var(--border);
}

.selector-tip p {
  margin: 0;
}

.board-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  min-width: 300px;
}

.clickable-board {
  cursor: crosshair;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 100%;
  height: auto;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}
</style>
