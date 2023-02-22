export interface User {
    Name: string,
    Email: string,
}

export interface Token {
    User?: User,
    Logins: [Date],
}

export const STORAGE = {
    TokenUser: "TokenUser",
    TokenLogins: "TokenLogins",
}