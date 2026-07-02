import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import DashboardCards from "../Components/Dashboard/DashboardCards";
import AttendanceCard from "../Components/Dashboard/AttendanceCard";
import RecentStudents from "../Components/Dashboard/RecentStudents";
import NoticeBoard from "../Components/Dashboard/NoticeBoard";
import UpcomingEvents from "../Components/Dashboard/UpcomingEvents";
import QuickActions from "../Components/Dashboard/QuickActions";
import RecentActivity from "../Components/Dashboard/RecentActivity";

export default function DashboardPage() {
  return (
    <Box>
      {/* Page Title */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 3,
        }}
      >
        Dashboard
      </Typography>

      {/* Summary Cards */}
      <DashboardCards />

      {/* Attendance + Recent Students */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          mt: 3,
        }}
      >
        <Box sx={{ flex: "1 1 500px" }}>
          <AttendanceCard />
        </Box>

        <Box sx={{ flex: "1 1 500px" }}>
          <RecentStudents />
        </Box>
      </Box>

      {/* Notice Board + Upcoming Events */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          mt: 3,
        }}
      >
        <Box sx={{ flex: "1 1 500px" }}>
          <NoticeBoard />
        </Box>

        <Box sx={{ flex: "1 1 500px" }}>
          <UpcomingEvents />
        </Box>
      </Box>

      {/* Quick Actions + Recent Activity */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          mt: 3,
        }}
      >
        <Box sx={{ flex: "1 1 500px" }}>
          <QuickActions />
        </Box>

        <Box sx={{ flex: "1 1 500px" }}>
          <RecentActivity />
        </Box>
      </Box>

      {/* Quick Statistics */}
      <Box sx={{ mt: 3 }}>
        <Card
          elevation={2}
          sx={{
            borderRadius: 3,
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
              Quick Statistics
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Typography>👨‍🎓 Boys : 640</Typography>

              <Typography>👩‍🎓 Girls : 610</Typography>

              <Typography>👨‍🏫 Staff : 112</Typography>

              <Typography>🏫 Classes : 24</Typography>
            </Box>

          </CardContent>
        </Card>
      </Box>

    </Box>
  );
}