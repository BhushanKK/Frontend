import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import {
  School,
  People,
  Class,
  CurrencyRupee,
} from "@mui/icons-material";

import type { ReactNode } from "react";

interface DashboardCard {
  title: string;
  value: string;
  color: string;
  icon: ReactNode;
}

const cards: DashboardCard[] = [
  {
    title: "Students",
    value: "1,250",
    color: "#1976d2",
    icon: <School />,
  },
  {
    title: "Teachers",
    value: "86",
    color: "#2e7d32",
    icon: <People />,
  },
  {
    title: "Classes",
    value: "24",
    color: "#ed6c02",
    icon: <Class />,
  },
  {
    title: "Revenue",
    value: "₹18.4L",
    color: "#9c27b0",
    icon: <CurrencyRupee />,
  },
];

export default function DashboardCards() {
  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid
          key={card.title}
          size={{
            xs: 12,
            sm: 6,
            md: 6,
            lg: 3,
          }}
        >
          <Card
            elevation={2}
            sx={{
              borderRadius: 3,
              height: "100%",
              transition: "0.25s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 6,
              },
            }}
          >
            <CardContent
              sx={{
                p: 2.5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "text.secondary",
                    }}
                  >
                    {card.title}
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      mt: 1,
                      fontWeight: 700,
                    }}
                  >
                    {card.value}
                  </Typography>
                </Box>

                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    bgcolor: card.color,
                  }}
                >
                  {card.icon}
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}