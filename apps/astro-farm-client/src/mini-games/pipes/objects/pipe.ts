import { PipeShape } from '@astro/astro-farm-game-core'

interface PipeProps {
    gridX: number
    gridY: number
    shape: PipeShape
    orientation: number
    updateWaterFlow?: () => void
    isInteractive?: boolean
    isSource: boolean
    cellSize: number
}

export class Pipe extends Phaser.GameObjects.Sprite {
    public shape: PipeShape
    public orientation: number
    public hasWater: boolean
    public gridX: number
    public gridY: number
    private _rotationTween?: Phaser.Tweens.Tween
    private isRotating = false
    private isSource: boolean

    constructor(scene: Phaser.Scene, props: PipeProps) {
        const {
            gridX,
            gridY,
            shape,
            orientation,
            updateWaterFlow,
            isInteractive = true,
            cellSize,
            isSource,
        } = props

        const texture = Pipe.getTextureForType(shape, false, isSource)
        super(scene, 0, 0, texture)

        this.setDisplaySize(cellSize, cellSize)
        this.shape = shape
        this.orientation = orientation
        this.hasWater = false
        this.gridX = gridX
        this.gridY = gridY
        this.isSource = isSource

        this.setRotation(Phaser.Math.DegToRad(this.orientation * 90))

        if (isInteractive) {
            this.setInteractive()
            this.on('pointerdown', () => {
                this.rotate()
                if (updateWaterFlow) {
                    updateWaterFlow()
                }
            })
        }
        scene.add.existing(this)
    }

    // private static getTextureForType(
    //     shape: PipeShape,
    //     hasWater: boolean,
    //     orientation: number
    // ): string {
    //     let textureOrientation = orientation
    //     if (shape === 'straight') {
    //         textureOrientation = orientation % 2
    //     }
    //     return shape + (hasWater ? '-full' : '') + '-' + textureOrientation
    // }

    private static getTextureForType(
        shape: PipeShape,
        hasWater: boolean,
        isSource: boolean
    ): string {
        if (isSource) {
            return 'source'
        }
        return shape + (hasWater ? '-full' : '')
    }

    setWaterState(hasWater: boolean): void {
        const newTexture = Pipe.getTextureForType(this.shape, hasWater, this.isSource)
        this.setTexture(newTexture)
        this.hasWater = hasWater
    }

    rotate(): void {
        if (this.isRotating) return
        this.isRotating = true
        this.scene.sound.play('pipe-rotation')
        this.orientation = (this.orientation + 1) % 4
        this._rotationTween?.stop()
        this._rotationTween = this.scene.tweens.add({
            targets: this,
            rotation: this.rotation + Phaser.Math.DegToRad(90),
            duration: 200,
            ease: 'Cubic.easeOut',
            onComplete: () => {
                this.rotation = Phaser.Math.DegToRad(this.orientation * 90)
                this.isRotating = false
            },
        })
    }
}
