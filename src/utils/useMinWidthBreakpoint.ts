import { useEffect, useMemo, useState } from 'react'

export function useMinWidthBreakpoint(breakpoint: string) {
    const mediaQuery = useMemo(() => `screen and (min-width: ${breakpoint})`, [breakpoint])

    const [matches, setMatches] = useState(window.matchMedia(mediaQuery).matches)

    useEffect(() => {
        const query = window.matchMedia(mediaQuery)

        const cb = (e: MediaQueryListEvent) => {
            setMatches(e.matches)
        }

        try {
            query.addEventListener('change', cb)
        } catch (e) {
            //safari
            try {
                query.addListener(cb)
            } catch (e2) {
                console.error(e2)
            }
        }

        return () => {
            try {
                query.removeEventListener('change', cb)
            } catch (e) {
                //safari
                try {
                    query.removeListener(cb)
                } catch (e2) {
                    console.error(e2)
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return matches
}
