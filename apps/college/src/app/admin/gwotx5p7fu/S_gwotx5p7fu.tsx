import { create } from "zustand"

const useStore = create(() => ({
    count: 0,
    text: 'hello',
}))


export function useS_gwotx5p7fu() {
    const store = useStore()
    const inc = () => useStore.setState((state) => ({ count: state.count + 1 }))
    const setText = (text: string) => useStore.setState({ text })
    return {
        ...store,
        inc,
        setText
    }
}

