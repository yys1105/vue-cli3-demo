import Store from "../utils";

const providerFgross = new Store("/b2b/provider/fgross", {}, null)
const fgrossGross = new Store("/b2b/provider/fgross/gross", {}, null)
const providerSpuList = new Store("/b2b/provider/spu/list", {}, null)
const providerFacilitatorMaxmember = new Store("/b2b/provider/facilitator/maxmember", {}, null)
const providerSpuType = new Store("/b2b/provider/spu/type", {}, null)
const providerSpuMember = new Store("/b2b/provider/spu/member", {}, null)
const providerDenySpu = new Store("/b2b/provider/deny/spu", {}, null)

const productCategory = new Store("/b2b/product/category", {}, null)


export {
    providerFgross,
    fgrossGross,
    providerSpuList,
    providerFacilitatorMaxmember,
    providerSpuType,
    providerSpuMember,
    providerDenySpu,
    productCategory
}