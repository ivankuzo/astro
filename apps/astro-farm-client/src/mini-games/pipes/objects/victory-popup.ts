import Phaser from 'phaser'
import { LevelMap } from '@astro/astro-farm-game-core'
import { UIButton } from './ui-button'

export class VictoryPopup extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, solution: LevelMap) {
        super(scene)
        this.add([
            this.createBackground(),
            this.createLabel(),
            this.createRewardImage(),
            this.createButton(solution),
        ])
        this.setDepth(1000)
    }

    static show(scene: Phaser.Scene, solution: LevelMap) {
        const popup = new VictoryPopup(scene, solution)
        scene.add.existing(popup)
        return popup
    }

    private createBackground() {
        const { width, height } = this.scene.scale
        const graphics = this.scene.add.graphics()
        graphics.fillStyle(0x2e1a47, 1)
        graphics.fillRoundedRect(width / 2 - 180, height / 2 - 160, 360, 320, 32)
        graphics.lineStyle(4, 0x23114d, 1)
        graphics.strokeRoundedRect(width / 2 - 180, height / 2 - 160, 360, 320, 32)
        graphics.setDepth(1000)
        return graphics
    }

    private createLabel() {
        const { width, height } = this.scene.scale
        return this.scene.add
            .text(width / 2, height / 2 - 100, 'YOU WIN!', {
                font: '48px "Fira Sans Black"',
                color: '#fff',
                stroke: '#fff',
                strokeThickness: 4,
            })
            .setOrigin(0.5)
            .setDepth(1001)
    }

    private createRewardImage() {
        const { width, height } = this.scene.scale
        return this.scene.add
            .image(width / 2, height / 2, 'reward')
            .setDisplaySize(120, 120)
            .setOrigin(0.5)
            .setDepth(1001)
    }

    private createButton(solution: LevelMap) {
        const { width, height } = this.scene.scale
        return new UIButton(this.scene, {
            x: width / 2,
            y: height / 2 + 100,
            text: 'Claim Reward',
            onClick: async () => {
                await VictoryPopup.getReward(this.scene, solution)
                this.replaceWithPlayAgainButton()
            },
        })
    }

    private replaceWithPlayAgainButton() {
        const { width, height } = this.scene.scale
        this.removeAll(true)
        const playAgainButton = new UIButton(this.scene, {
            x: width / 2,
            y: height / 2 + 100,
            text: 'Play Again',
            onClick: async () => {
                const onPlayAgain = this.scene.registry.get('onPlayAgain')
                if (onPlayAgain) {
                    await onPlayAgain()
                }
            },
        })
        this.add([
            this.createBackground(),
            this.createLabel(),
            this.createRewardImage(),
            playAgainButton,
        ])
    }

    private static async getReward(scene: Phaser.Scene, solution: LevelMap) {
        const onGetReward = scene.registry.get('onGetReward')
        if (onGetReward) {
            await onGetReward(solution)
        }
    }
}
