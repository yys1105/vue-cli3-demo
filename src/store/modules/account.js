import Store from "../utils";

const accountInfo = new Store("/b2b/provider/account/info", {}, null)
const accountRetrieve = new Store("/b2b/provider/account/retrieve/apply",{},null)

export {
    accountInfo,
    accountRetrieve
}