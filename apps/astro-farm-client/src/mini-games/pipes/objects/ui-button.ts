import Phaser from 'phaser'

interface UIButtonOptions {
    x: number
    y: number
    text: string
    onClick?: () => Promise<void> | void
}

export class UIButton extends Phaser.GameObjects.Container {
    private isLoading = false
    private defaultText: string
    private textObject: Phaser.GameObjects.Text
    private bg: Phaser.GameObjects.Rectangle

    constructor(scene: Phaser.Scene, options: UIButtonOptions) {
        super(scene, options.x, options.y)
        this.defaultText = options.text

        // background
        this.bg = scene.add.rectangle(0, 0, 220, 56, 0x8e5cff, 1)
        this.bg.setOrigin(0.5)
        this.bg.setStrokeStyle(2, 0xffffff)

        this.add(this.bg)
        this.bg.setInteractive({ useHandCursor: true })

        // text
        this.textObject = scene.add.text(0, 0, options.text, {
            font: '28px "Fira Sans SemiBold"',
            color: '#fff',
        })
        this.textObject.setOrigin(0.5)
        this.add(this.textObject)

        this.setSize(220, 56)

        this.bg.on('pointerdown', async () => {
            if (this.isLoading) return
            if (options.onClick) {
                this.setLoading(true)
                try {
                    await options.onClick()
                } finally {
                    this.setLoading(false)
                }
            }
        })
        this.bg.on('pointerover', () => this.bg.setFillStyle(0x6d3fd6, 1))
        this.bg.on('pointerout', () => this.bg.setFillStyle(0x8e5cff, 1))
        scene.add.existing(this)
    }

    setLoading(loading: boolean) {
        this.isLoading = loading
        this.bg.disableInteractive()
        this.textObject.setText(loading ? '...' : this.defaultText)
        if (!loading) this.bg.setInteractive({ useHandCursor: true })
    }

    setButtonText(text: string) {
        this.defaultText = text
        this.textObject.setText(text)
    }
}
