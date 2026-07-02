import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Typography,
} from "@mui/material";

interface Notice {
  id: number;
  title: string;
  date: string;
  priority: "High" | "Medium" | "Low";
}

const notices: Notice[] = [
  {
    id: 1,
    title: "Unit Test starts from 10 July",
    date: "05 Jul 2026",
    priority: "High",
  },
  {
    id: 2,
    title: "Parents Meeting on Saturday",
    date: "06 Jul 2026",
    priority: "Medium",
  },
  {
    id: 3,
    title: "Library Books Submission",
    date: "08 Jul 2026",
    priority: "Low",
  },
  {
    id: 4,
    title: "Sports Day Registration",
    date: "12 Jul 2026",
    priority: "High",
  },
];

function getChipColor(priority: Notice["priority"]) {
  switch (priority) {
    case "High":
      return "error";
    case "Medium":
      return "warning";
    default:
      return "success";
  }
}

export default function NoticeBoard() {
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
          Notice Board
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {notices.map((notice, index) => (
          <Box
            key={notice.id}
            sx={{
              mb: index === notices.length - 1 ? 0 : 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  {notice.title}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  {notice.date}
                </Typography>
              </Box>

              <Chip
                size="small"
                label={notice.priority}
                color={getChipColor(notice.priority)}
              />
            </Box>

            {index !== notices.length - 1 && (
              <Divider sx={{ mt: 2 }} />
            )}
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}