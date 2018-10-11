import Store from "../utils";

const order = new Store("/b2b/provider/order", {}, null)
const evaluate = new Store("/b2b/provider/evaluate", {}, null)
const logistics = new Store("/b2b/provider/logistics", {}, null)
const orderConfirm = new Store("/b2b/provider/order/confirm", {}, null)
// POST /provider/order/confirm/{docNum}

export {
    order,
    evaluate,
    logistics,
    orderConfirm
}