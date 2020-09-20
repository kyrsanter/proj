export type SignUpFormValuesTypes = {
    isClient: boolean
    isMaster: boolean
    name: string
    password: string
    phone: string
    repassword: string
    passwordNotCompared?: string
    allCheckboxesAreFalse?: boolean
    email: string
}

export type SignInFormValuesTypes = {
    password: string
    phone: string
}
