import { Scene } from 'phaser'
import { getPipesGame } from '../../../shared/api/pipes'
import { addFullscreenBackground } from '../utils/addFullscreenBackground'

export class Preloader extends Scene {
    constructor() {
        super('Preloader')
    }

    init() {
        const { width, height } = this.scale
        this.add
            .text(width / 2, height / 2, 'Loading...', { fontSize: '32px', color: '#ffffff' })
            .setOrigin(0.5)
    }

    async preload() {
        // this.load.setPath('images/mini-games/pipes/images/end')

        // this.load.image('end-0', 'end-0.png')
        // this.load.image('end-1', 'end-1.png')
        // this.load.image('end-2', 'end-2.png')
        // this.load.image('end-3', 'end-3.png')
        // this.load.image('end-full-0', 'end-0-full.png')
        // this.load.image('end-full-1', 'end-1-full.png')
        // this.load.image('end-full-2', 'end-2-full.png')
        // this.load.image('end-full-3', 'end-3-full.png')

        // this.load.setPath('images/mini-games/pipes/images/corner')

        // this.load.image('corner-0', 'corner-0.png')
        // this.load.image('corner-1', 'corner-1.png')
        // this.load.image('corner-2', 'corner-2.png')
        // this.load.image('corner-3', 'corner-3.png')
        // this.load.image('corner-full-0', 'corner-0-full.png')
        // this.load.image('corner-full-1', 'corner-1-full.png')
        // this.load.image('corner-full-2', 'corner-2-full.png')
        // this.load.image('corner-full-3', 'corner-3-full.png')

        // this.load.setPath('images/mini-games/pipes/images/straight')

        // this.load.image('straight-0', 'straight-0.png')
        // this.load.image('straight-1', 'straight-1.png')
        // this.load.image('straight-full-0', 'straight-0-full.png')
        // this.load.image('straight-full-1', 'straight-1-full.png')

        // this.load.setPath('images/mini-games/pipes/images/triple')
        // this.load.image('triple-0', 'triple-0.png')
        // this.load.image('triple-1', 'triple-1.png')
        // this.load.image('triple-2', 'triple-2.png')
        // this.load.image('triple-3', 'triple-3.png')
        // this.load.image('triple-full-0', 'triple-0-full.png')
        // this.load.image('triple-full-1', 'triple-1-full.png')
        // this.load.image('triple-full-2', 'triple-2-full.png')
        // this.load.image('triple-full-3', 'triple-3-full.png')

        // this.load.image('straight', 'straight.png')
        // this.load.image('straight_water', 'straight_water.png')
        // this.load.image('l_shape', 'l_shape.png')
        // this.load.image('l_shape_water', 'l_shape_water.png')
        // this.load.image('t_shape', 't_shape.png')
        // this.load.image('t_shape_water', 't_shape_water.png')
        // this.load.image('end', 'end.png')
        // this.load.image('end_water', 'end_water.png')

        this.load.setPath('images/mini-games/pipes/images/')
        this.load.image('straight', 'straight.png')
        this.load.image('straight-full', 'straight-full.png')
        this.load.image('corner', 'corner.png')
        this.load.image('corner-full', 'corner-full.png')
        this.load.image('triple', 'triple.png')
        this.load.image('triple-full', 'triple-full.png')
        this.load.image('end', 'end.png')
        this.load.image('end-full', 'end-full.png')
        this.load.image('source', 'source.png')

        this.load.setPath('images/mini-games/pipes/sounds')
        this.load.audio('pipe-rotation', 'pipe-rotation.mp3')
        this.load.audio('slime', 'slime.mp3')
    }

    async create() {
        addFullscreenBackground(this, 'background')
        this.registry.set('onPlayAgain', async () => await this.loadGame())
        await this.loadGame()
    }

    async loadGame() {
        const levelData = await getPipesGame()
        this.registry.set('levelData', levelData)
        this.scene.start('Game')
    }
}
