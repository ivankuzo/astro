import Phaser from 'phaser'
import { Pipe } from '../objects/pipe'
import {
    LevelMap,
    SourcePipeCoordinates,
    getFilledCells,
    PipesLevel,
} from '@astro/astro-farm-game-core'
import { VictoryPopup } from '../objects/victory-popup'
import { addFullscreenBackground } from '../utils/addFullscreenBackground'

export class Game extends Phaser.Scene {
    private grid: Pipe[][] = []
    private source: SourcePipeCoordinates = { x: 0, y: 0 }

    private gridWidth = 0
    private gridHeight = 0
    private cellSize = 0

    constructor() {
        super('Game')
    }

    create() {
        addFullscreenBackground(this, 'background')
        const levelData = this.registry.get('levelData') as PipesLevel
        const { map, source } = levelData

        this.gridWidth = map[0].length
        this.gridHeight = map.length
        this.cellSize = this.calculateCellSize()
        this.source = source

        this.grid = this.createGridFromLevelMap(map)
        this.alignGridToCenter()
        this.updateWaterFlow()
        this.createExitButton()
    }

    private createGridFromLevelMap(levelMap: LevelMap): Pipe[][] {
        const grid: Pipe[][] = []

        for (let y = 0; y < this.gridHeight; y++) {
            grid[y] = []
            for (let x = 0; x < this.gridWidth; x++) {
                const config = levelMap[y][x]
                const pipe = new Pipe(this, {
                    gridX: x,
                    gridY: y,
                    shape: config.shape,
                    orientation: config.orientation,
                    cellSize: this.cellSize,
                    isSource: x === this.source.x && y === this.source.y,
                    updateWaterFlow: () => this.updateWaterFlow(),
                })
                grid[y][x] = pipe
            }
        }

        return grid
    }

    private alignGridToCenter(): void {
        const allPipes = this.grid.flat()

        const offsetX = (this.scale.width - this.gridWidth * this.cellSize) / 2
        const offsetY = (this.scale.height - this.gridHeight * this.cellSize) / 2

        Phaser.Actions.GridAlign(allPipes, {
            width: this.gridWidth,
            height: this.gridHeight,
            cellWidth: this.cellSize,
            cellHeight: this.cellSize,
            x: offsetX,
            y: offsetY,
            position: Phaser.Display.Align.CENTER,
        })
    }

    private calculateCellSize(): number {
        const isPortrait = this.scale.height > this.scale.width
        const padding = isPortrait ? 1 : 2
        const cellWidth = this.scale.width / (this.gridWidth + padding)
        const cellHeight = this.scale.height / (this.gridHeight + padding)
        return Math.floor(Math.min(cellWidth, cellHeight))
    }

    private updateWaterFlow = (): void => {
        const map = this.grid.map(row =>
            row.map(pipe => ({ shape: pipe.shape, orientation: pipe.orientation }))
        )
        const filled = getFilledCells(map, this.source)
        this.grid.flat().forEach(pipe => {
            const key = `${pipe.gridX},${pipe.gridY}`
            pipe.setWaterState(filled.has(key))
        })
        if (filled.size === this.gridWidth * this.gridHeight) {
            this.grid.flat().forEach(pipe => pipe.disableInteractive())
            const solution = this.grid.map(v =>
                v.map(p => ({ shape: p.shape, orientation: p.orientation }))
            )
            this.sound.play('slime')
            VictoryPopup.show(this, solution)
        }
    }

    private createExitButton() {
        const onExit = this.registry.get('onExit')
        const button = this.add
            .text(20, 20, 'Exit', {
                font: '20px Arial',
                color: '#fff',
                stroke: '#fff',
                strokeThickness: 1,
                padding: { x: 10, y: 5 },
            })
            .setOrigin(0, 0)
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                onExit()
            })
        button.setDepth(1000)
    }
}
