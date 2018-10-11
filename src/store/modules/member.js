import Store from "../utils";

const providerMember = new Store("/b2b/provider/member", {}, null)
const hyRegister = new Store("/b2b/provider/hy/register", {}, null)
const hyAudit = new Store("/b2b/provider/hy/audit",{},null)
// GET /provider/spu/list
const spuList = new Store("/b2b/provider/spu/list",{},null)

export {
    providerMember,
    hyRegister, hyAudit,
    spuList
}