import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { MainView } from "../components/ViewWrapper/containers";
import { PasswordRecovery } from "../screens/Auth/PasswordRecovery/containers/screen/reducer";
import { Notification } from "../components/common/Notification/reducer";
import { CompaniesPage } from "../screens/Companies/containers/reducer";
import { Companies } from "./common/companies/reducer";
import { Brands } from "./common/brands/reducer";
import { Products } from "./common/products/reducer";
import { Certificates } from "./common/certificates/reducer";
import { User } from "./common/user/reducer";
import { Validation } from "./common/validation/reducer";
import { RolesAndPermissions } from "../screens/RolesAndPermissions/containers";
import { BrandsPage } from "../screens/Brands/containers/reducer";
import { ProductsPage } from "../screens/Products/containers/reducer";
import { SideNavigation } from "../components/layout/SideNavigation/containers";
import { DrawerReducer } from "../components/common/drawer/container/reducer";
import { TrailsPage } from "../screens/Trails/containers/reducer";
import { EcomsPage } from "../screens/Ecoms/containers/reducer";
import { Ecoms } from "./common/ecoms/reducer";
import { Trails } from "./common/trails/reducer";
import { Stockists } from "./common/stockists/reducer";
import { MaterialsPage } from "../screens/Materials/containers/reducer";
import { ManufacturersPage } from "../screens/Manufacturers/containers/reducer";
import { Campaigns } from "./common/campaigns/reducer";
import { Users } from "./common/users/reducer";
import { UsersPage } from "../screens/Users/containers/reducer";
import { Invite } from "../screens/Onboarding/UserAccount/containers/screen/OwnerAccount";
import { Batches, BatchesPage } from "./common/batches/reducer";
import { StockistsPage } from "../components/pageWidgets/Files/Stockist/containers/reducer";
import { Dashboard } from "../screens/Dashboard2/containers/screen/reducer";
import { Categories } from "../screens/Categories/reducer";
import { FactQuizes, FactQuiz } from "./common/factQuizes/reducer";
import { News, NewsPage } from "./common/news/reducer";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    Dashboard,
    User,
    Invite,
    Companies,
    Brands,
    Products,
    Certificates,
    Ecoms,
    Trails,
    Stockists,
    Users,
    Notification,
    Validation,
    MainView,
    SideNavigation,
    PasswordRecovery,
    CompaniesPage,
    BrandsPage,
    ProductsPage,
    MaterialsPage,
    ManufacturersPage,
    TrailsPage,
    EcomsPage,
    UsersPage,
    RolesAndPermissions,
    StockistsPage,
    DrawerReducer,
    Batches,
    Campaigns,
    BatchesPage,
    Categories,
    FactQuizes,
    FactQuiz,
    News,
    NewsPage,
  });
