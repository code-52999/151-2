<template>
  <div class="go-board-container">
    <svg :width="boardSize" :height="boardSize" :viewBox="`0 0 ${boardSize} ${boardSize}`">
      <rect :width="boardSize" :height="boardSize" fill="#e6c88a" />
      
      <g v-for="i in gridSize" :key="'h' + i">
        <line
          :x1="padding"
          :y1="padding + (i - 1) * cellSize"
          :x2="padding + (gridSize - 1) * cellSize"
          :y2="padding + (i - 1) * cellSize"
          stroke="#5c4033"
          stroke-width="1"
        />
      </g>
      
      <g v-for="i in gridSize" :key="'v' + i">
        <line
          :x1="padding + (i - 1) * cellSize"
          :y1="padding"
          :x2="padding + (i - 1) * cellSize"
          :y2="padding + (gridSize - 1) * cellSize"
          stroke="#5c4033"
          stroke-width="1"
        />
      </g>
      
      <circle
        v-for="(star, idx) in starPoints"
        :key="'star' + idx"
        :cx="padding + star.x * cellSize"
        :cy="padding + star.y * cellSize"
        r="4"
        fill="#5c4033"
      />
      
      <g v-for="(stone, idx) in stones" :key="'stone' + idx">
        <circle
          :cx="padding + stone.x * cellSize"
          :cy="padding + stone.y * cellSize"
          :r="cellSize * 0.45"
          :fill="stone.color === 'B' ? '#1a1a1a' : '#f5f5f5'"
          :stroke="stone.color === 'B' ? '#000' : '#ccc'"
          stroke-width="1"
        />
        <circle
          v-if="stone.color === 'W'"
          :cx="padding + stone.x * cellSize - 2"
          :cy="padding + stone.y * cellSize - 2"
          :r="cellSize * 0.15"
          fill="rgba(255,255,255,0.3)"
        />
      </g>
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: Number,
    default: 19
  },
  stones: {
    type: Array,
    default: () => []
  },
  cellSize: {
    type: Number,
    default: 28
  },
  padding: {
    type: Number,
    default: 30
  }
})

const gridSize = computed(() => props.size)

const boardSize = computed(() => {
  return (gridSize.value - 1) * props.cellSize + props.padding * 2
})

const starPoints = computed(() => {
  if (props.size === 19) {
    return [
      { x: 3, y: 3 }, { x: 9, y: 3 }, { x: 15, y: 3 },
      { x: 3, y: 9 }, { x: 9, y: 9 }, { x: 15, y: 9 },
      { x: 3, y: 15 }, { x: 9, y: 15 }, { x: 15, y: 15 }
    ]
  } else if (props.size === 13) {
    return [
      { x: 3, y: 3 }, { x: 9, y: 3 },
      { x: 6, y: 6 },
      { x: 3, y: 9 }, { x: 9, y: 9 }
    ]
  } else if (props.size === 9) {
    return [
      { x: 2, y: 2 }, { x: 6, y: 2 },
      { x: 4, y: 4 },
      { x: 2, y: 6 }, { x: 6, y: 6 }
    ]
  }
  return []
})
</script>

<style scoped>
.go-board-container {
  display: inline-block;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
