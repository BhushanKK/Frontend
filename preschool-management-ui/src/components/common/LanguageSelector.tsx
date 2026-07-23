import { FormControl, MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useLanguageStore } from "../../store/languageStore";

const languages = [
    {
        code: "en",
        name: "English",
    },
    {
        code: "mr",
        name: "मराठी",
    },
    {
        code: "hi",
        name: "हिन्दी",
    },
];

export default function LanguageSelector() {
    const language = useLanguageStore((state) => state.language);
    const setLanguage = useLanguageStore((state) => state.setLanguage);
    const handleChange = (event: SelectChangeEvent<string>) => {
    setLanguage(event.target.value);
    };

    return (
        <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select
                value={language}
                onChange={handleChange}
                startAdornment={
                    <LanguageIcon
                        fontSize="small"
                        sx={{ mr: 1 }}
                    />
                }
            >
                {languages.map((language) => (
                    <MenuItem
                        key={language.code}
                        value={language.code}
                    >
                        {language.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}