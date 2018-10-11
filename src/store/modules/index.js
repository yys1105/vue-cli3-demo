import * as user from "./user";
import * as account from "./account";
import * as member from "./member"
import * as product from "./product"
import * as order from './order'
import * as reports from './reports'

export default {
    ...user,
    ...account,
    ...member,
    ...product,
    ...order,
    ...reports
};