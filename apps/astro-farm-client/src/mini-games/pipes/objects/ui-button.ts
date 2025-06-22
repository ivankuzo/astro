import Phaser from 'phaser'

interface UIButtonOptions {
    x: number
    y: number
    text: string
    style?: Phaser.Types.GameObjects.Text.TextStyle
    onClick?: () => Promise<void> | void
}

export class UIButton extends Phaser.GameObjects.Text {
    private isLoading = false
    private defaultText: string

    constructor(scene: Phaser.Scene, options: UIButtonOptions) {
        super(scene, options.x, options.y, options.text, options.style || {})
        this.defaultText = options.text
        this.setOrigin(0.5)
        this.setInteractive({ useHandCursor: true })
        this.on('pointerdown', async () => {
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
        scene.add.existing(this)
    }

    setLoading(loading: boolean) {
        this.isLoading = loading
        this.setInteractive(!loading)
        this.setText(loading ? '...' : this.defaultText)
    }

    setButtonText(text: string) {
        this.defaultText = text
        this.setText(text)
    }
}
