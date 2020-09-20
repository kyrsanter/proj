export type UserRegData = {
    name: string
    phone: string
    password: string
    isClient: boolean
    isMaster: boolean
    email: string
}

export type UserLoginData = {
    phone?: string
    password: string
    email?: string
}