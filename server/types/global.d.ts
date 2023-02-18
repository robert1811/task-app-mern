declare global{
    namespace NodeJS{
        interface ProcessEnv{
            URI: string,
            SECRET: string
        }
    }
}

export {}