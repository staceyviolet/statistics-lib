function* uniqueIdGenerator(): Generator<number, number, number> {
    let i = 0
    while (true) {
        yield i++
    }
}

const idGenerator = uniqueIdGenerator()

export const generateUniqueId = () => idGenerator.next().value
