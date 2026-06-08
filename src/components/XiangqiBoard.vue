<template>
  <div class="xiangqi-board-container">
    <svg :width="boardWidth" :height="boardHeight" :viewBox="`0 0 ${boardWidth} ${boardHeight}`">
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
      
      <g v-for="(piece, idx) in pieces" :key="'piece' + idx">
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
        >{{ getPieceText(piece) }}</text>
      </g>
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  pieces: {
    type: Array,
    default: () => []
  },
  cellSize: {
    type: Number,
    default: 50
  },
  padding: {
    type: Number,
    default: 25
  }
})

const boardWidth = computed(() => 8 * props.cellSize + props.padding * 2)
const boardHeight = computed(() => 9 * props.cellSize + props.padding * 2)

const pieceMap = {
  general: { red: '帥', black: '將' },
  advisor: { red: '仕', black: '士' },
  elephant: { red: '相', black: '象' },
  horse: { red: '馬', black: '馬' },
  chariot: { red: '車', black: '車' },
  cannon: { red: '炮', black: '砲' },
  soldier: { red: '兵', black: '卒' }
}

function getPieceText(piece) {
  return pieceMap[piece.type]?.[piece.color] || ''
}
</script>

<style scoped>
.xiangqi-board-container {
  display: inline-block;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
