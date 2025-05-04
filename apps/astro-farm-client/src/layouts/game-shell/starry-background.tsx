import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { Engine } from '@tsparticles/engine'
import { loadSlim } from '@tsparticles/slim'

export const StarryBackground = () => {
    const [init, setInit] = useState(false)

    useEffect(() => {
        const initEngine = async () => {
            await initParticlesEngine(async (engine: Engine) => {
                await loadSlim(engine)
            })
            setInit(true)
        }

        initEngine()
    }, [])

    if (!init) {
        return null
    }

    return (
        <Particles
            id='tsparticles-stars'
            options={{
                background: {
                    color: {
                        value: 'transparent',
                    },
                },
                particles: {
                    number: {
                        value: 100,
                    },
                    color: {
                        value: ['#ffffff', '#fff073'],
                    },
                    opacity: {
                        value: { min: 0.3, max: 0.8 },
                        animation: {
                            enable: true,
                            speed: 0.3,
                            sync: false,
                        },
                    },
                    size: {
                        value: { min: 1, max: 2 },
                    },
                    move: {
                        enable: true,
                        speed: 0.05,
                        direction: 'none',
                        random: true,
                        straight: false,
                        outModes: 'out',
                    },
                },
                fullScreen: {
                    enable: true,
                    zIndex: 0,
                },
                detectRetina: true,
            }}
        />
    )
}
