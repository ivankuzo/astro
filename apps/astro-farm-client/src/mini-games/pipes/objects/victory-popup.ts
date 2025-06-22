import { submitPipesGameResult } from '../../../shared/api/pipes'
import Phaser from 'phaser'
import { LevelMap } from '@astro/astro-farm-game-core'
import { UIButton } from './ui-button'

const POPUP_STYLE = {
    width: 300,
    height: 180,
    bgColor: 0x222222,
    bgAlpha: 0.95,
}

const LABEL_STYLE = {
    text: 'Congratulations!',
    font: '32px "Fira Sans Black"',
    color: '#fff',
    offsetY: -30,
}

const BUTTON_STYLE = {
    text: 'Get Reward',
    font: '24px "Fira Sans SemiBold"',
    color: '#00ff00',
    backgroundColor: '#333',
    padding: { left: 16, right: 16, top: 8, bottom: 8 },
    offsetY: 40,
}

export class VictoryPopup extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, solution: LevelMap) {
        super(scene)
        const { width, height } = scene.scale
        this.add([
            this.createBackground(width, height),
            this.createLabel(width, height),
            this.createButton(width, height, solution),
        ])
        this.setDepth(1000)
    }

    static show(scene: Phaser.Scene, solution: LevelMap) {
        const popup = new VictoryPopup(scene, solution)
        scene.add.existing(popup)
        return popup
    }

    private createBackground(width: number, height: number) {
        const graphics = this.scene.add.graphics()
        graphics.fillStyle(0x2e1a47, 0.92)
        graphics.fillRoundedRect(width / 2 - 180, height / 2 - 110, 360, 220, 32)
        graphics.lineStyle(4, 0x8e5cff, 1)
        graphics.strokeRoundedRect(width / 2 - 180, height / 2 - 110, 360, 220, 32)
        graphics.setDepth(1000)
        return graphics
    }

    private createLabel(width: number, height: number) {
        return this.scene.add
            .text(width / 2, height / 2 - 40, 'Congratulations!', {
                font: '36px "Fira Sans Black"',
                color: '#fff',
                stroke: '#8e5cff',
                strokeThickness: 4,
                shadow: {
                    offsetX: 0,
                    offsetY: 2,
                    color: '#000',
                    blur: 8,
                    fill: true,
                },
            })
            .setOrigin(0.5)
            .setDepth(1001)
    }

    private createButton(width: number, height: number, solution: LevelMap) {
        return this.createRewardButton(width, height, solution)
    }

    private createRewardButton(width: number, height: number, solution: LevelMap) {
        return new UIButton(this.scene, {
            x: width / 2,
            y: height / 2 + BUTTON_STYLE.offsetY,
            text: BUTTON_STYLE.text,
            style: {
                font: '28px "Fira Sans SemiBold"',
                color: '#fff',
                backgroundColor: '#8e5cff',
                padding: { left: 32, right: 32, top: 16, bottom: 16 },
                stroke: '#fff',
                strokeThickness: 2,
                shadow: {
                    offsetX: 0,
                    offsetY: 2,
                    color: '#000',
                    blur: 8,
                    fill: true,
                },
            },
            onClick: async () => {
                await VictoryPopup.getReward(this.scene, solution)
                this.replaceWithPlayAgainButton(width, height)
            },
        })
    }

    private replaceWithPlayAgainButton(width: number, height: number) {
        this.removeAll(true)
        const playAgainButton = new UIButton(this.scene, {
            x: width / 2,
            y: height / 2 + BUTTON_STYLE.offsetY,
            text: 'Play Again',
            style: {
                font: '28px "Fira Sans SemiBold"',
                color: '#fff',
                backgroundColor: '#8e5cff',
                padding: { left: 32, right: 32, top: 16, bottom: 16 },
                stroke: '#fff',
                strokeThickness: 2,
                shadow: {
                    offsetX: 0,
                    offsetY: 2,
                    color: '#000',
                    blur: 8,
                    fill: true,
                },
            },
            onClick: async () => {
                const onPlayAgain = this.scene.registry.get('onPlayAgain')
                if (onPlayAgain) {
                    await onPlayAgain()
                }
            },
        })
        this.add([
            this.createBackground(width, height),
            this.createLabel(width, height),
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
