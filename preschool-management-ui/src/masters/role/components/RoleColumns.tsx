import type {
    ColDef,
} from "ag-grid-community";
import type { Role } from "../types/role";
import StatusCellRenderer from "../../../components/master-grids/StatusCellRenderer";
import { t, type TFunction } from "i18next";
import i18n from "../../../i18n";

export const getRoleColumns = (t: TFunction): ColDef<Role>[] => [
    {
        headerName: t("ID"),
        field: "roleId",
        width: 100,
    },
    {
        headerName: i18n.t("masters:role"),
        field: "roleName",
        flex: 1,
    },
    {
        headerName: t("status"),
        field: "isActive",
        flex: 1,
        cellRenderer: StatusCellRenderer,
    }
];