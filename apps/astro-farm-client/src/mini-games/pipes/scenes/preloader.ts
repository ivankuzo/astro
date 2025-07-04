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
        this.load.image('reward', 'images/boosts/energy_50.png')

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
