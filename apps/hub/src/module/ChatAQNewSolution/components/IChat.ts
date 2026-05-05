
export interface MessageContent {
    sender: 'user' | 'bot';
    content: string;
    timestamp: number;
}

export interface ChatSession {
    session_id: string;
    message: MessageContent[];
    timestamp: number;
}
