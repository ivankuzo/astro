export enum PipeShape {
    STRAIGHT = 'straight',
    CORNER = 'corner',
    TRIPLE = 'triple',
    END = 'end',
}

export type Direction = 'up' | 'down' | 'left' | 'right'

export type BasePipe = {
    shape: PipeShape
    orientation: number
}

export type LevelMap = BasePipe[][]

export type SourcePipeCoordinates = {
    x: number
    y: number
}

export type PipesLevel = {
    map: LevelMap
    source: SourcePipeCoordinates
}

export type PipesGame = {
    walletAddress: string
    level: PipesLevel
    isSubmitted: boolean
}
const PIPE_DIRECTIONS: Record<PipeShape, Direction[][]> = {
    [PipeShape.STRAIGHT]: [
        ['up', 'down'],
        ['left', 'right'],
        ['up', 'down'],
        ['left', 'right'],
    ],
    [PipeShape.CORNER]: [
        ['up', 'right'],
        ['right', 'down'],
        ['down', 'left'],
        ['left', 'up'],
    ],
    [PipeShape.TRIPLE]: [
        ['up', 'left', 'right'],
        ['up', 'right', 'down'],
        ['right', 'down', 'left'],
        ['down', 'left', 'up'],
    ],
    [PipeShape.END]: [['up'], ['right'], ['down'], ['left']],
}

export const getDirections = (type: PipeShape, orientation: number): Direction[] => {
    return PIPE_DIRECTIONS[type][orientation % 4]
}

export const connects = (a: BasePipe, b: BasePipe, dirFromA: Direction): boolean => {
    const opposite: Record<Direction, Direction> = {
        up: 'down',
        down: 'up',
        left: 'right',
        right: 'left',
    }
    const aDirs = getDirections(a.shape, a.orientation)
    const bDirs = getDirections(b.shape, b.orientation)
    return aDirs.includes(dirFromA) && bDirs.includes(opposite[dirFromA])
}

export const getFilledCells = (map: LevelMap, source: SourcePipeCoordinates): Set<string> => {
    const visited = new Set<string>()
    const width = map[0].length
    const height = map.length
    const fill = (x: number, y: number) => {
        const key = `${x},${y}`
        if (visited.has(key)) return
        visited.add(key)
        const pipe = map[y][x]
        for (const dir of getDirections(pipe.shape, pipe.orientation)) {
            const [dx, dy] =
                dir === 'up' ? [0, -1] : dir === 'down' ? [0, 1] : dir === 'left' ? [-1, 0] : [1, 0]
            const nx = x + dx
            const ny = y + dy
            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                const neighbor = map[ny][nx]
                if (connects(pipe, neighbor, dir)) {
                    fill(nx, ny)
                }
            }
        }
    }
    fill(source.x, source.y)
    return visited
}

export const isLevelConnected = (map: LevelMap, source: SourcePipeCoordinates): boolean => {
    return getFilledCells(map, source).size === map.length * map[0].length
}

const dfs = (
    cell: { x: number; y: number },
    visited: boolean[][],
    connections: Record<string, Set<Direction>>,
    DIRS: { dx: number; dy: number; dir: Direction; opp: Direction }[],
    GRID_WIDTH: number,
    GRID_HEIGHT: number
) => {
    visited[cell.y][cell.x] = true
    const key = `${cell.x},${cell.y}`
    connections[key] = connections[key] || new Set()
    const dirs = [...DIRS].sort(() => Math.random() - 0.5)
    dirs.forEach(({ dx, dy, dir, opp }) => {
        const nx = cell.x + dx
        const ny = cell.y + dy
        if (nx < 0 || nx >= GRID_WIDTH || ny < 0 || ny >= GRID_HEIGHT) return
        if (!visited[ny][nx]) {
            connections[key].add(dir)
            const nkey = `${nx},${ny}`
            connections[nkey] = connections[nkey] || new Set()
            connections[nkey].add(opp)
            dfs({ x: nx, y: ny }, visited, connections, DIRS, GRID_WIDTH, GRID_HEIGHT)
        }
    })
}

const getPipeTypeAndOrientation = (
    dirs: Set<Direction>,
    isSource: boolean
): { shape: PipeShape; orientation: number } => {
    const dirArr = Array.from(dirs).sort()
    const shapes: PipeShape[] = isSource
        ? [PipeShape.END]
        : [PipeShape.END, PipeShape.STRAIGHT, PipeShape.CORNER, PipeShape.TRIPLE]
    for (const shape of shapes) {
        for (let orientation = 0; orientation < 4; orientation++) {
            const d = getDirections(shape, orientation).slice().sort()
            if (d.length === dirArr.length && d.every((val, idx) => val === dirArr[idx])) {
                return { shape, orientation }
            }
        }
    }
    return { shape: PipeShape.END, orientation: 0 }
}

export const generateLevel = (): { map: LevelMap; source: SourcePipeCoordinates } => {
    const GRID_WIDTH = 7
    const GRID_HEIGHT = 9
    const SOURCE_PIPE_POS: SourcePipeCoordinates = {
        x: Math.floor(Math.random() * GRID_WIDTH),
        y: Math.floor(Math.random() * GRID_HEIGHT),
    }
    const visited: boolean[][] = Array.from({ length: GRID_HEIGHT }, () =>
        Array(GRID_WIDTH).fill(false)
    )
    const connections: Record<string, Set<Direction>> = {}
    const DIRS: { dx: number; dy: number; dir: Direction; opp: Direction }[] = [
        { dx: 0, dy: -1, dir: 'up', opp: 'down' },
        { dx: 0, dy: 1, dir: 'down', opp: 'up' },
        { dx: -1, dy: 0, dir: 'left', opp: 'right' },
        { dx: 1, dy: 0, dir: 'right', opp: 'left' },
    ]
    dfs(SOURCE_PIPE_POS, visited, connections, DIRS, GRID_WIDTH, GRID_HEIGHT)
    const map: LevelMap = Array.from({ length: GRID_HEIGHT }, (_, y) =>
        Array.from({ length: GRID_WIDTH }, (_, x) => {
            const key = `${x},${y}`
            const isSource = x === SOURCE_PIPE_POS.x && y === SOURCE_PIPE_POS.y
            const dirs = connections[key] || new Set()
            return getPipeTypeAndOrientation(dirs, isSource)
        })
    )
    if (!isLevelConnected(map, SOURCE_PIPE_POS)) {
        return generateLevel()
    }
    return { map, source: SOURCE_PIPE_POS }
}

export const randomizeLevelMap = (map: LevelMap): LevelMap =>
    map.map(row =>
        row.map(({ shape }) => ({
            shape,
            orientation: Math.floor(Math.random() * 4),
        }))
    )

export const areLevelMapsEqual = (map1: LevelMap, map2: LevelMap) => {
    const normMap1 = normalizeLevelMap(map1)
    const normMap2 = normalizeLevelMap(map2)

    return JSON.stringify(normMap1) === JSON.stringify(normMap2)
}

const normalizeLevelMap = (map: LevelMap): LevelMap => {
    return map.map(row =>
        row.map(cell => {
            if (cell.shape === PipeShape.STRAIGHT) {
                return {
                    ...cell,
                    orientation: cell.orientation % 2,
                }
            }
            return cell
        })
    )
}
