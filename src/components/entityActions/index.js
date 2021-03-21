const companyRead = require('../../screens/Companies/containers/Read').default;
const companyCreate = require('../../screens/Companies/containers/Create').default;
const companyUpdate = require('../../screens/Companies/containers/Update').default;
const brandCreate = require('../../screens/Brands/containers/Create').default;
const brandUpdate = require('../../screens/Brands/containers/Update').default;
const productCreate = require('../../screens/Products/containers/Create').default;
const productUpdate = require('../../screens/Products/containers/Update').default;
const ecomCreate = require('../../screens/Ecoms/containers/Create').default;
const ecomUpdate = require('../../screens/Ecoms/containers/Update').default;
const trailCreate = require('../../screens/Trails/containers/Create').default;
const trailUpdate = require('../../screens/Trails/containers/Update').default;
const userCreate = require('../../screens/Users/containers/Create').default;
const userUpdate = require('../../screens/Users/containers/Update').default;
const userRead = require('../../screens/Users/containers/Read').default;

let CRUDActions = {
    companyRead,
    companyCreate,
    companyUpdate,
    brandCreate,
    brandUpdate,
    productCreate,
    productUpdate,
    ecomCreate,
    ecomUpdate,
    trailCreate,
    trailUpdate,
    userCreate,
    userUpdate,
    userRead
};

export default CRUDActions;
