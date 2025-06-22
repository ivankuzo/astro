import Phaser from 'phaser'

export function addFullscreenBackground(scene: Phaser.Scene, key: string) {
    const bg = scene.add.image(0, 0, key).setOrigin(0.5, 0.5)
    const resize = () => {
        const { width, height } = scene.scale
        const texture = scene.textures.get(key)
        const source = texture.getSourceImage()
        const scale = Math.max(width / source.width, height / source.height)
        bg.setScale(scale)
        bg.setPosition(width / 2, height / 2)
    }
    scene.scale.on('resize', resize)
    resize()
    return bg
}
