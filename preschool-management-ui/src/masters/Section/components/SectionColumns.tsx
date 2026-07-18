import type { ColDef, ICellRendererParams } from "ag-grid-community";
import { Chip } from "@mui/material";
import type { Section } from "../types/Section";

export const SectionColumns: ColDef<Section>[] = [
    {
        headerName: "ID",
        field: "sectionId",
        width: 100,
    },   
    {
        headerName: "Section",
        field: "sectionName",
        flex: 1,
    },
    {
        headerName: "Status",
        field: "isActive",
        flex: 1,
        cellRenderer: (
            params: ICellRendererParams<Section, boolean>
        ) => (
            <Chip
                label={params.value ? "Active" : "Inactive"}
                color={params.value ? "success" : "error"}
                size="small"
            />
        ),
    },
];