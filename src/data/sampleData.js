export const sampleGames = [
  {
    id: '1',
    type: 'go',
    date: '2026-05-28',
    opponent: '业余4段',
    result: '负',
    opening: '星小目',
    keyMoves: [
      { move: 37, description: '打入过深，被对方攻击' },
      { move: 58, description: '错过打入对方上方的好点' }
    ],
    mistakes: [
      { move: 42, reason: '计算不足，局部弃子亏损' },
      { move: 65, reason: '大局观差，抢占小官子' }
    ],
    notes: '本局主要问题是中盘战斗时过于保守，被对方掌握主动权。打入要注意周围子力配合，不能孤军深入。',
    createdAt: '2026-05-28T20:30:00'
  },
  {
    id: '2',
    type: 'go',
    date: '2026-06-02',
    opponent: '业余3段',
    result: '胜',
    opening: '中国流',
    keyMoves: [
      { move: 23, description: '拆边及时，奠定外势' },
      { move: 89, description: '劫争转换得利' }
    ],
    mistakes: [
      { move: 51, reason: '局部应对有误，损失约10目' }
    ],
    notes: '今天大局观不错，但是局部计算还需要加强。劫争的处理比较满意，判断清楚了劫材价值。',
    createdAt: '2026-06-02T19:15:00'
  },
  {
    id: '3',
    type: 'xiangqi',
    date: '2026-06-05',
    opponent: '市赛第8名',
    result: '负',
    opening: '中炮对屏风马',
    keyMoves: [
      { move: 12, description: '进车压马看似主动，实则给对方反击机会' },
      { move: 28, description: '跳马位置不佳，被对方利用' }
    ],
    mistakes: [
      { move: 18, reason: '贪子失势，被对方出子领先' },
      { move: 35, reason: '防守失误，漏看对方闷宫杀' }
    ],
    notes: '输在中局转换，总是想着吃子，忽略了大子出动速度。屏风马布局还要多研究，尤其是弃马局的变化。',
    createdAt: '2026-06-05T21:00:00'
  }
]

export const samplePuzzles = [
  {
    id: 'p1',
    type: 'go',
    name: '倒脱靴',
    difficulty: '中级',
    description: '黑先，利用弃子吃回白棋',
    initialStones: [
      { x: 2, y: 0, color: 'W' }, { x: 3, y: 0, color: 'W' }, { x: 4, y: 0, color: 'W' },
      { x: 1, y: 1, color: 'W' }, { x: 5, y: 1, color: 'W' },
      { x: 1, y: 2, color: 'B' }, { x: 2, y: 2, color: 'B' }, { x: 3, y: 2, color: 'B' }, { x: 4, y: 2, color: 'B' }, { x: 5, y: 2, color: 'B' },
      { x: 1, y: 3, color: 'B' }, { x: 2, y: 3, color: 'W' }, { x: 3, y: 3, color: 'W' }, { x: 4, y: 3, color: 'W' }, { x: 5, y: 3, color: 'B' },
      { x: 1, y: 4, color: 'B' }, { x: 2, y: 4, color: 'B' }, { x: 3, y: 4, color: 'B' }, { x: 4, y: 4, color: 'B' }, { x: 5, y: 4, color: 'B' }
    ],
    solution: '黑走(3,1)提，白(3,0)打吃，黑(2,3)接，白(3,3)提四子，黑(3,4)再吃回三子',
    master: false,
    practiceCount: 0,
    lastPracticed: null
  },
  {
    id: 'p2',
    type: 'go',
    name: '金鸡独立',
    difficulty: '初级',
    description: '黑先，利用一路立做活',
    initialStones: [
      { x: 0, y: 1, color: 'W' }, { x: 1, y: 1, color: 'W' }, { x: 2, y: 1, color: 'W' },
      { x: 0, y: 2, color: 'W' }, { x: 1, y: 2, color: 'B' }, { x: 2, y: 2, color: 'B' },
      { x: 0, y: 3, color: 'W' }, { x: 1, y: 3, color: 'B' },
      { x: 0, y: 4, color: 'W' }
    ],
    solution: '黑(2,3)立，白两边不入气，黑成功做活',
    master: false,
    practiceCount: 0,
    lastPracticed: null
  },
  {
    id: 'p3',
    type: 'xiangqi',
    name: '马后炮杀',
    difficulty: '初级',
    description: '红先，三步杀',
    initialPieces: [
      { type: 'general', color: 'red', x: 4, y: 9 },
      { type: 'horse', color: 'red', x: 6, y: 7 },
      { type: 'cannon', color: 'red', x: 4, y: 7 },
      { type: 'advisor', color: 'black', x: 3, y: 9 },
      { type: 'general', color: 'black', x: 5, y: 9 }
    ],
    solution: '炮四进五 士4进5，马六进四 将5平4，炮四平六杀',
    master: false,
    practiceCount: 0,
    lastPracticed: null
  },
  {
    id: 'p4',
    type: 'xiangqi',
    name: '铁门闩',
    difficulty: '中级',
    description: '红先，利用车炮锁将',
    initialPieces: [
      { type: 'general', color: 'red', x: 4, y: 9 },
      { type: 'chariot', color: 'red', x: 4, y: 3 },
      { type: 'cannon', color: 'red', x: 4, y: 5 },
      { type: 'soldier', color: 'red', x: 5, y: 6 },
      { type: 'general', color: 'black', x: 4, y: 0 },
      { type: 'advisor', color: 'black', x: 3, y: 0 },
      { type: 'advisor', color: 'black', x: 5, y: 0 },
      { type: 'elephant', color: 'black', x: 2, y: 2 }
    ],
    solution: '兵五平六 象7进5，兵六进一 士5进4，车四进六杀',
    master: true,
    practiceCount: 5,
    lastPracticed: '2026-06-01'
  }
]
