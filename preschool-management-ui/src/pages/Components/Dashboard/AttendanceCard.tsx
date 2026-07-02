import {
  Box,
  Card,
  CardContent,
  LinearProgress,
  Typography,
  Divider,
} from "@mui/material";

const attendanceData = [
  {
    className: "Class X-A",
    attendance: 96,
    students: 42,
  },
  {
    className: "Class IX-B",
    attendance: 92,
    students: 38,
  },
  {
    className: "Class VIII-A",
    attendance: 89,
    students: 40,
  },
  {
    className: "Class VII-C",
    attendance: 94,
    students: 36,
  },
];

export default function AttendanceCard() {
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
          Today's Attendance
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {attendanceData.map((item) => (
          <Box
            key={item.className}
            sx={{
              mb: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 0.8,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                {item.className}
              </Typography>

              <Typography
                sx={{
                  color: "primary.main",
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                {item.attendance}%
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={item.attendance}
              sx={{
                height: 10,
                borderRadius: 10,
              }}
            />

            <Typography
              sx={{
                mt: 0.7,
                fontSize: 12,
                color: "text.secondary",
              }}
            >
              Total Students : {item.students}
            </Typography>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: 13,
              }}
            >
              Overall Attendance
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "success.main",
              }}
            >
              93%
            </Typography>
          </Box>

          <Box
            sx={{
              textAlign: "right",
            }}
          >
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: 13,
              }}
            >
              Present Students
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: "primary.main",
              }}
            >
              156
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}