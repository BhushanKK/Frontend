import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Typography,
} from "@mui/material";

import {
  Event,
  EmojiEvents,
  School,
  Celebration,
} from "@mui/icons-material";

interface EventItem {
  id: number;
  title: string;
  date: string;
  daysLeft: number;
  icon: React.ReactNode;
  color: string;
}

const events: EventItem[] = [
  {
    id: 1,
    title: "Unit Test Begins",
    date: "10 Jul 2026",
    daysLeft: 8,
    icon: <School />,
    color: "#1976d2",
  },
  {
    id: 2,
    title: "Sports Day",
    date: "15 Jul 2026",
    daysLeft: 13,
    icon: <EmojiEvents />,
    color: "#ed6c02",
  },
  {
    id: 3,
    title: "Independence Day Practice",
    date: "25 Jul 2026",
    daysLeft: 23,
    icon: <Celebration />,
    color: "#2e7d32",
  },
  {
    id: 4,
    title: "Science Exhibition",
    date: "02 Aug 2026",
    daysLeft: 31,
    icon: <Event />,
    color: "#9c27b0",
  },
];

export default function UpcomingEvents() {
  return (
    <Card
      elevation={2}
      sx={{
        borderRadius: 3,
        height: "100%",
      }}
    >
      <CardContent>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 2,
          }}
        >
          Upcoming Events
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {events.map((event, index) => (
          <Box
            key={event.id}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: index === events.length - 1 ? 0 : 2,
            }}
          >
            <Avatar
              sx={{
                bgcolor: event.color,
                width: 46,
                height: 46,
                mr: 2,
              }}
            >
              {event.icon}
            </Avatar>

            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                {event.title}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                {event.date}
              </Typography>
            </Box>

            <Chip
              label={`${event.daysLeft} Days`}
              color="primary"
              size="small"
            />
          </Box>
        ))}

      </CardContent>
    </Card>
  );
}