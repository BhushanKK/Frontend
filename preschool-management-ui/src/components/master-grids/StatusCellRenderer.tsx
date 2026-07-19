import { Chip } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { CustomCellRendererProps } from "ag-grid-react";

export default function StatusCellRenderer(
    props: CustomCellRendererProps<boolean>
) {
    const { t, i18n } = useTranslation();

    console.log("Language:", i18n.language);
    console.log("Active =", t("active"));
    console.log("Inactive =", t("inactive"));

    return (
        <Chip
            label={props.value ? t("active") : t("inactive")}
            color={props.value ? "success" : "error"}
            size="small"
        />
    );
}