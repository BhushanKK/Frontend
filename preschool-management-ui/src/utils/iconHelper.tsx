import * as MuiIcons from "@mui/icons-material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutlined";

export const getIcon = (iconName?: string) => {
    if (!iconName) {
        return <HelpOutlineIcon fontSize="small" />;
    }

    const Icon =
        MuiIcons[iconName as keyof typeof MuiIcons];

    return Icon
        ? <Icon fontSize="small" />
        : <HelpOutlineIcon fontSize="small" />;
};