import {
    Stack,
    TextField,
    Button,
    Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";

interface MasterToolbarProps {
    title: string;
    onSearch: (value: string) => void;
    onAdd?: () => void;
    onExport?: () => void;
    addButtonText?: string;
    showExport?: boolean;
}

export default function MasterToolbar({
    title,
    addButtonText = "Add",
    onSearch,
    onExport,
    onAdd,
    showExport = true,
}: MasterToolbarProps) {
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
                sx={{
                    fontWeight: 700,
                }}
            >
                {title}
            </Typography>

            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
            >
                <TextField
                    size="small"
                    placeholder="Search..."
                    onChange={(e) => onSearch(e.target.value)}
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
                    <Button size="small"
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                        onClick={onExport}
                    >
                        Export
                    </Button>
                )}

                {onAdd && (
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={onAdd}
                        size="small"
                    >
                        {addButtonText}
                    </Button>
                )}
            </Stack>

        </Stack>

    );

}