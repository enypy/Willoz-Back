declare module 'http' {
    interface IncomingMessage {
        rawBody?: Buffer | string;
        originalUrl: string;
    }
}