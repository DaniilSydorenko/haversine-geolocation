export const isNodeJs = (): boolean => {
    const runtime = globalThis as typeof globalThis & {
        process?: unknown;
    };

    return typeof window === 'undefined' && runtime.process !== undefined;
};
