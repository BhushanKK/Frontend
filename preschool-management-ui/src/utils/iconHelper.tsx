import {
    Dashboard,
    AccountTree,
    Person,
    Menu,
    CalendarMonth,
    CalendarToday,
    TempleHindu,
    Category,
    Groups,
    HelpOutlined,
} from "@mui/icons-material";

const iconMap = {
    Dashboard,
    AccountTree,
    Person,
    Menu,
    CalendarMonth,
    CalendarToday,
    TempleHindu,
    Category,
    Groups,
};

export const getIcon = (iconName?: string) => {
    const Icon =
        iconName && iconMap[iconName as keyof typeof iconMap]
            ? iconMap[iconName as keyof typeof iconMap]
            : HelpOutlined;

    return <Icon fontSize="small" />;
};