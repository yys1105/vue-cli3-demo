import Store from "../utils";

const login = new Store("/b2b/user/login", {}, null)
const logout = new Store("/b2b/user/logout", {}, null)
const resetPw = new Store("/b2b/user/resetPw", {}, null)

export {
    login,
    logout,
    resetPw
}