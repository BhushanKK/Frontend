import type { ColDef } from "ag-grid-community";
import type { Section } from "../types/section";
import type { TFunction } from "i18next";
import StatusCellRenderer from "../../../components/master-grids/StatusCellRenderer";

export const getSectionColumns = (t: TFunction) : ColDef<Section>[] => [
    {
        headerName: t("common:ID"),
        field: "sectionId",
        width: 100,
    },
    {
        headerName: t("masters:section"),
        field: "sectionName",
        flex: 1,
    },
    {
        headerName: t("common:status"),
        field: "isActive",
        flex: 1,
        cellRenderer: StatusCellRenderer,
    }
];