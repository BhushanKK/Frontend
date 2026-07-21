import type { ColDef } from "ag-grid-community";
import type { TFunction } from "i18next";
import type { Holiday } from "../types/Holiday";
import StatusCellRenderer from "../../../components/master-grids/StatusCellRenderer";
import { getHolidayTypes } from "../../../lookup/holidayTypes";
import { formatDate } from "../../../utils/dateFormatter";

export const getHolidayColumns = (
    t: TFunction,
    language: string
): ColDef<Holiday>[] => {
    const holidayTypes = getHolidayTypes(language);

    return [
        {
            headerName: t("common:ID"),
            field: "holidayId",
            width: 100,
        },
        {
            headerName: t("masters:holiday"),
            field: "holidayName",
            flex: 1.5,
        },
        {
            headerName: t("masters:holidayFromDate"),
            field: "holidayFromDate",
            flex: 1,
            valueFormatter: (params) => formatDate(params.value, language),
        },
        {
            headerName: t("masters:holidayToDate"),
            field: "holidayToDate",
            flex: 1,
            valueFormatter: (params) => formatDate(params.value, language),
        },
        {
            headerName: t("masters:holidayType"),
            field: "holidayType",
            flex: 1.5,
            valueFormatter: (params) => {
                const type = holidayTypes.find(
                    (x) => x.id === params.value
                );

                return type?.name ?? "";
            },
        },
        {
            headerName: t("masters:description"),
            field: "description",
            flex: 2,
        },
        {
            headerName: t("common:status"),
            field: "isActive",
            flex: 1,
            cellRenderer: StatusCellRenderer,
        },
    ];
};