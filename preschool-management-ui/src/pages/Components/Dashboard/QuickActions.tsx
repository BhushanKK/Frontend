import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import {
  PersonAdd,
  School,
  Payments,
  EventAvailable,
  Campaign,
  Quiz,
} from "@mui/icons-material";

const actions = [
  {
    title: "Add Student",
    icon: <PersonAdd />,
    color: "#1976d2",
  },
  {
    title: "Add Teacher",
    icon: <School />,
    color: "#2e7d32",
  },
  {
    title: "Collect Fee",
    icon: <Payments />,
    color: "#ed6c02",
  },
  {
    title: "Attendance",
    icon: <EventAvailable />,
    color: "#9c27b0",
  },
  {
    title: "Notice",
    icon: <Campaign />,
    color: "#d32f2f",
  },
  {
    title: "Exams",
    icon: <Quiz />,
    color: "#0288d1",
  },
];

export default function QuickActions() {
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
            mb: 3,
          }}
        >
          Quick Actions
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
            },
            gap: 2,
          }}
        >
          {actions.map((item) => (
            <Button
              key={item.title}
              fullWidth
              startIcon={item.icon}
              variant="outlined"
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                borderRadius: 2,
                py: 1.4,
                fontWeight: 600,
                color: item.color,
                borderColor: item.color,
                "&:hover": {
                  backgroundColor: `${item.color}10`,
                  borderColor: item.color,
                },
              }}
            >
              {item.title}
            </Button>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}