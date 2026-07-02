import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

import {
  PersonAdd,
  Payments,
  EventAvailable,
  Campaign,
  School,
} from "@mui/icons-material";

interface Activity {
  id: number;
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  color: string;
}

const activities: Activity[] = [
  {
    id: 1,
    title: "New Student Admitted",
    description: "Rahul Sharma admitted to Class X-A",
    time: "10 mins ago",
    icon: <PersonAdd fontSize="small" />,
    color: "#1976d2",
  },
  {
    id: 2,
    title: "Fee Collected",
    description: "₹25,000 collected from Class IX",
    time: "30 mins ago",
    icon: <Payments fontSize="small" />,
    color: "#2e7d32",
  },
  {
    id: 3,
    title: "Attendance Submitted",
    description: "Attendance updated for Class VIII",
    time: "1 hour ago",
    icon: <EventAvailable fontSize="small" />,
    color: "#ed6c02",
  },
  {
    id: 4,
    title: "Notice Published",
    description: "Exam timetable has been published",
    time: "3 hours ago",
    icon: <Campaign fontSize="small" />,
    color: "#9c27b0",
  },
  {
    id: 5,
    title: "Teacher Assigned",
    description: "Mathematics teacher assigned to Class VII",
    time: "Today",
    icon: <School fontSize="small" />,
    color: "#d32f2f",
  },
];

export default function RecentActivity() {
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
          Recent Activity
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {activities.map((activity, index) => (
          <Box
            key={activity.id}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              mb: index === activities.length - 1 ? 0 : 2,
            }}
          >
            <Avatar
              sx={{
                bgcolor: activity.color,
                width: 40,
                height: 40,
                mr: 2,
              }}
            >
              {activity.icon}
            </Avatar>

            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                {activity.title}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {activity.description}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 0.5, display: "block" }}
              >
                {activity.time}
              </Typography>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}