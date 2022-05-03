export function makeOnceCallable(callback: () => any = () => {}): () => void {
    let wasCalled: boolean = false
    return () => {
        if (wasCalled) return
        callback()
        wasCalled = true
    }
}
