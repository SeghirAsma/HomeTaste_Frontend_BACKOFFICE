import React from "react";
import {
  Grid, Card, CardContent, Typography, Select, MenuItem, Box
} from "@mui/material";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

export default function DashboardStats({ period, setPeriod, chartData, ApprovedAccountsCount, ArchivedAccountsCount,
  pendingAccountsCount, stats,}) 
{
  return (
    <Grid container spacing={3}>

      {/* --- Courbe --- */}
      <Grid item xs={12} md={6}>
        <Card
          sx={{  borderRadius: 3, boxShadow: 3,
            background: "linear-gradient(135deg, #8E2DE2 0%, #200751ff 100%)",
            color: "#fff",
            height: "100%",
          }}
        >
          <CardContent>
            <Box display="flex" justifyContent="space-between"   alignItems="center" mb={2}   >
              <Typography variant="h6" fontWeight="bold">
                Évolution des comptes créés
              </Typography>

              <Select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                size="small"
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "#fff",
                  borderRadius: 2,
                  "& .MuiSvgIcon-root": { color: "#fff" },
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  minWidth: 120,
                }}
              >
                <MenuItem value="1 W">1 week</MenuItem>
                <MenuItem value="1 M">1 month</MenuItem>
                <MenuItem value="3 M">3 month</MenuItem>
                 <MenuItem value="1 Y">1 year</MenuItem>
              </Select>
            </Box>

            <Box sx={{ width: "100%", height: 45 }}>
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255,255,255,0.15)",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#80D8FF"
                    strokeWidth={2.5}
                    dot={{ r: 3, stroke: "#80D8FF", fill: "#fff" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Comptes créés */}
      <Grid item xs={12} md={6}>
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
            color: "#fff",
            height: "100%",
          }}
        >
          <CardContent>
            <Typography variant="subtitle2" fontWeight="bold" sx={{ opacity: 0.9 }}>
              Comptes créés ({period})
            </Typography>
            <Typography variant="h3" fontWeight="bold">
              {/* {sellerCount} */} {stats[period]}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Comptes approuvés */}
      <Grid item xs={12} md={4}>
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
            color: "#fff",
            height: "100%",
          }}
        >
          <CardContent>
            <Typography variant="subtitle2" fontWeight="bold" sx={{ opacity: 0.9 }}>
              Comptes approuvés
            </Typography>
            <Typography variant="h3" fontWeight="bold">
              {ApprovedAccountsCount}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Comptes rejetés */}
      <Grid item xs={12} md={4}>
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            background: "linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)",
            color: "#fff",
            height: "100%",
          }}
        >
          <CardContent>
            <Typography variant="subtitle2" fontWeight="bold" sx={{ opacity: 0.9 }}>
              Comptes non approuvés
            </Typography>
            <Typography variant="h3" fontWeight="bold">
              {ArchivedAccountsCount}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Comptes en cours */}
      <Grid item xs={12} md={4}>
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            background: "linear-gradient(135deg, #F7971E 0%, #FFD200 100%)",
            color: "#fff",
            height: "100%",
          }}
        >
          <CardContent>
            <Typography variant="subtitle2" fontWeight="bold" sx={{ opacity: 0.9 }}>
              Comptes en cours
            </Typography>
            <Typography variant="h3" fontWeight="bold">
              {pendingAccountsCount}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  );
}
