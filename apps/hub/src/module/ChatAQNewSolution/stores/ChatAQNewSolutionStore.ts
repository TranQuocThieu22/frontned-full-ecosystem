import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ChatSession, MessageContent } from "../components/IChat";

interface Store<T> {
    data: T;
    setData: (data: T) => void;
    resetData: () => void;
    setProperty: <K extends keyof T>(key: K, value: T[K]) => void;
}

function createGenericStore<T extends { timestamp: number }>(
    initialState: T,
    storageKey: string,
    expireAfterMs: number = 7 * 24 * 60 * 60 * 1000 // mặc định: 7 ngày
) {
    return create(
        persist<Store<T>>(
            (set, get) => {
                const now = Date.now();
                const existing = get()?.data;

                // Nếu dữ liệu cũ đã quá hạn → reset lại
                if (existing && now - existing.timestamp > expireAfterMs) {
                    set({ data: initialState });
                }

                return {
                    data: initialState,
                    setData: (data: T) => set({ data }),
                    resetData: () => set({ data: initialState }),
                    setProperty<K extends keyof T>(key: K, value: T[K]) {
                        set((state) => ({
                            data: { ...state.data, [key]: value },
                        }));
                    },
                };
            },
            {
                name: storageKey,
            }
        )
    );
}

const initialSession: ChatSession = {
    session_id: '',
    message: [{ sender: 'bot', content: 'Chào bạn👋! Bạn muốn tìm kiếm thông tin gì?', timestamp: Date.now() }],
    timestamp: Date.now(),
};

export const useChatBotStore = createGenericStore<ChatSession>(initialSession, 'local_message_chat_bot_aq_new_solution');

export function ChatBotStore_AddMessage(newMessage: MessageContent) {
    useChatBotStore.setState((state) => {
        const currentMessages = state.data.message ?? [];
        // Limit 50 items
        const updatedMessages =
            currentMessages.length >= 50
                ? [...currentMessages.slice(1), newMessage]
                : [...currentMessages, newMessage];

        return {
            data: {
                ...state.data,
                message: updatedMessages,
            },
        };
    });
}

export function ChatBotStore_GetOrCreateSessionId(): string {
    const store = useChatBotStore.getState();
    let sessionId = store.data.session_id;

    if (!sessionId) {
        sessionId = crypto.randomUUID();
        store.setProperty('session_id', sessionId);
    }

    return sessionId;
}

export function ChatBotStore_ResetSession() {
    useChatBotStore.getState().setData({
        ...initialSession,
        session_id: crypto.randomUUID(),
    });
}

export function ChatBotStore_ResetData() {
    useChatBotStore.getState().resetData();
}

export function ChatBotStore_JustClearMessage() {
    useChatBotStore.getState().setProperty("message", []);
}
