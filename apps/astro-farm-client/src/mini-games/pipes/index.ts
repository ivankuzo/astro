import { Boot } from './scenes/boot'
import { Game } from './scenes/game'
import { Preloader } from './scenes/preloader'

export const createPhaserGame = (parent: string | HTMLElement) => {
    return new Phaser.Game({
        type: Phaser.AUTO,
        parent,
        backgroundColor: '#000000',
        scale: {
            mode: Phaser.Scale.ScaleModes.RESIZE,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: '100%',
            height: '100%',
        },
        antialias: true,
        pixelArt: false,
        scene: [Boot, Preloader, Game],
    })
}
