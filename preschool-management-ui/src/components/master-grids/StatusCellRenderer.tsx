import { Chip } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { CustomCellRendererProps } from "ag-grid-react";

export default function StatusCellRenderer(
    props: CustomCellRendererProps<boolean>
) {
    const { t } = useTranslation();
    return (
        <Chip
            label={props.value ? t("active") : t("inactive")}
            color={props.value ? "success" : "error"}
            size="small"
        />
    );
}