import { Stack, TextField, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";

interface MasterToolbarProps {
    title: string;
    onSearch?: (value: string) => void;
    onAdd?: () => void;
    onExport?: () => void;
    addButtonText?: string;
    showExport?: boolean;
    showAdd?: boolean;
}

export default function MasterToolbar({
    title,
    onSearch,
    onAdd,
    onExport,
    addButtonText = "Add",
    showExport = true,
    showAdd = true,
}: MasterToolbarProps) {

    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        onSearch?.(debouncedSearch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch]);

    return (
        <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{
                justifyContent: "space-between",
                alignItems: {
                    xs: "stretch",
                    md: "center",
                },
                mb: 2,
            }}
        >
            <Typography
                variant="h5"
                sx={{ fontWeight: 700 }}
            >
                {title}
            </Typography>

            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
            >
                <TextField
                    value={search}
                    size="small"
                    placeholder={t("search")}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{
                        width: {
                            xs: "100%",
                            sm: 200,
                            md: 250,
                        },
                        "& .MuiInputBase-root": {
                            height: 36,
                            fontSize: 14,
                        },
                        "& input": {
                            padding: "10px 12px",
                        },
                    }}
                />

                {showExport && (
                    <Button
                        size="small"
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                        onClick={onExport}
                    >
                        {t("export")}
                    </Button>
                )}

                {showAdd && onAdd && (
                    <Button
                        size="small"
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={onAdd}
                    >
                        {addButtonText}
                    </Button>
                )}
            </Stack>
        </Stack>
    );
}