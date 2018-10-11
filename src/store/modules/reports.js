import Store from "../utils";

const reports = new Store("/b2b/provider/report", {}, null)
const providerPrice = new Store("/b2b/provider/price", {}, null)
const spuMember = new Store("/b2b/provider/spu/member", {}, null)

export {
    reports,
    providerPrice,
    spuMember
}