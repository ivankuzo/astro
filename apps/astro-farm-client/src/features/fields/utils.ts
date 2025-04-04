const GRID = {
    ORIGIN: {
        X: 36,
        Y: 0,
    },
    ISOMETRIC: {
        ANGLE: 40 * (Math.PI / 180),
        SPACING: 24,
    },
    FIELD: {
        WIDTH: 28,
    },
} as const

export const getFieldPosition = (col: number, row: number) => {
    const spacing = GRID.ISOMETRIC.SPACING
    const angle = GRID.ISOMETRIC.ANGLE

    const x = GRID.ORIGIN.X + Math.cos(angle) * spacing * col - Math.cos(angle) * spacing * row
    const y = GRID.ORIGIN.Y + Math.sin(angle) * spacing * col + Math.sin(angle) * spacing * row

    return {
        left: `${x}%`,
        top: `${y}%`,
        width: `${GRID.FIELD.WIDTH}%`,
    }
}
