"use client"

import { frame, motion, useSpring } from "motion/react"
import { useEffect, type ReactNode, } from "react"

const spring = { damping: 30, stiffness: 150, restDelta: 0.1 }

export default function FakeCursorWithTail({ children }: { children: ReactNode }) {
    const mouse = useMousePosition()

    // Cursor
    const x1 = useSpring(mouse.x, spring)
    const y1 = useSpring(mouse.y, spring)

    // Tail 1
    const x2 = useSpring(x1, spring)
    const y2 = useSpring(y1, spring)

    // Tail 2
    const x3 = useSpring(x2, spring)
    const y3 = useSpring(y2, spring)

    // Tail 3
    const x4 = useSpring(x3, spring)
    const y4 = useSpring(y3, spring)

    return (
        <>
            {/* <motion.div style={{ ...ball, cursor:"none", x: x4, y: y4, backgroundColor: "#fff", width: 5, height: 5 }} /> */}
            <motion.div style={{ ...ball, cursor: "none", x: x3, y: y3, backgroundColor: "#fff", width: 5, height: 5 }} />
            <motion.div style={{ ...ball, cursor: "none", x: x2, y: y2, backgroundColor: "#fff", width: 15, height: 15 }} />
            <motion.div style={{ ...ball, cursor: "none", x: x1, y: y1, backgroundColor: "#fff", width: 20, height: 20 }} />
            {children}
        </>
    )
}

function useMousePosition() {
    const x = useSpring(0, spring)
    const y = useSpring(0, spring)

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            frame.read(() => {
                x.set(e.clientX)
                y.set(e.clientY)
            })
        }
        window.addEventListener("pointermove", handleMove)
        return () => window.removeEventListener("pointermove", handleMove)
    }, [])

    return { x, y }
}

const ball = {
    position: "fixed" as const,
    borderRadius: "50%",
    pointerEvents: "none" as const,
    zIndex: 9999,
}
