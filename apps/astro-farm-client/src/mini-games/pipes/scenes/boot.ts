import Phaser from 'phaser'

export class Boot extends Phaser.Scene {
    constructor() {
        super('Boot')
    }

    preload() {
        this.load.setPath('images/mini-games/pipes/images')
        this.load.image('background', 'background.png')
    }

    async create() {
        // await document.fonts.load('32px "Fira Sans Black"')
        // await document.fonts.load('32px "Fira Sans SemiBold"')
        await document.fonts.load('32px "Fira Sans"')
        this.scene.start('Preloader')
    }
}
