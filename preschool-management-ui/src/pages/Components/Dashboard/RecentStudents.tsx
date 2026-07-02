import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

interface Student {
  id: number;
  name: string;
  className: string;
  rollNo: string;
  status: "Active" | "Inactive";
}

const students: Student[] = [
  {
    id: 1,
    name: "Rahul Sharma",
    className: "Class X-A",
    rollNo: "101",
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Patil",
    className: "Class IX-B",
    rollNo: "102",
    status: "Active",
  },
  {
    id: 3,
    name: "Aarav Verma",
    className: "Class VIII-A",
    rollNo: "103",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Sneha Joshi",
    className: "Class VII-C",
    rollNo: "104",
    status: "Active",
  },
];

export default function RecentStudents() {
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
          Recent Students
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <List disablePadding>
          {students.map((student) => (
            <ListItem
              key={student.id}
              divider
              sx={{
                px: 0,
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  {student.name.charAt(0)}
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    {student.name}
                  </Typography>
                }
                secondary={
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "text.secondary",
                    }}
                  >
                    {student.className} • Roll No: {student.rollNo}
                  </Typography>
                }
              />

              <Box>
                <Chip
                  label={student.status}
                  color={
                    student.status === "Active"
                      ? "success"
                      : "error"
                  }
                  size="small"
                />
              </Box>
            </ListItem>
          ))}
        </List>

      </CardContent>
    </Card>
  );
}