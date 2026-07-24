import { useEffect, useState } from "react";
import { Typography, Stack } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function LiveClock() {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <Stack 
            direction="row"
            sx={{spacing:2,
            alignItems:"center"}}
        >
            <Stack
                direction="row"
                sx={{spacing:0.5,
                alignItems:"center"}}
            >
                <CalendarTodayIcon
                    fontSize="small"
                    color="primary"
                />

                <Typography
                    variant="body2"
                    sx={{fontWeight:500}}
                >
                    {now.toLocaleDateString("en-IN", {
                        weekday: "short",
                        day: "2-digit",
                        month: "short",
                        year: "2-digit",
                    })}
                </Typography>
            </Stack>

            <Stack
                direction="row"
                sx={{spacing:0.5,
                alignItems:"center"}}
            >
                <AccessTimeIcon
                    fontSize="small"
                    color="primary"
                />

                <Typography
                    variant="body2"
                    sx={{fontWeight:600}}
                >
                    {now.toLocaleTimeString("en-IN")}
                </Typography>
            </Stack>
        </Stack>
    );
}