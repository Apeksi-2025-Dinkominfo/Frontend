"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Container,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import dayjs from 'dayjs';

interface MonthlyData {
  month: string;
  year: string;
  registrations: number;
}

interface Participant {
  jumlah_rombongan: number;
  created_at: string;
}

const Dashboard = () => {
  const [walikotaCount, setWalikotaCount] = useState(0);
  const [optdCount, setOptdCount] = useState(0);
  const [totalRombongan, setTotalRombongan] = useState(0);
  const [loading, setLoading] = useState(true);
  const [walikotaMonthlyData, setWalikotaMonthlyData] = useState<MonthlyData[]>([]);
  const [optdMonthlyData, setOptdMonthlyData] = useState<MonthlyData[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>(dayjs().format('YYYY'));
  const [availableYears, setAvailableYears] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const walikotaResponse = await axios.get('http://localhost:5000/peserta');
        const walikotaData = walikotaResponse.data;
        const walikotaCount = walikotaData.length;
        const walikotaRombongan = walikotaData.reduce(
          (sum: number, item: Participant) => sum + (item.jumlah_rombongan || 0),
          0
        );

        const optdResponse = await axios.get('http://localhost:5000/optd');
        const optdData = optdResponse.data;
        const optdCount = optdData.length;
        const optdRombongan = optdData.reduce(
          (sum: number, item: Participant) => sum + (item.jumlah_rombongan || 0),
          0
        );

        setWalikotaCount(walikotaCount);
        setOptdCount(optdCount);
        setTotalRombongan(walikotaRombongan + optdRombongan);

        const registrationsByMonthWalikota: Record<string, number> = {};
        const registrationsByMonthOptd: Record<string, number> = {};
        const years: Set<string> = new Set();

        walikotaData.forEach((item: Participant) => {
          const month = dayjs(item.created_at).format('MMMM');
          const year = dayjs(item.created_at).format('YYYY');
          const key = `${month}-${year}`;
          years.add(year);
          registrationsByMonthWalikota[key] = (registrationsByMonthWalikota[key] || 0) + 1;
        });

        optdData.forEach((item: Participant) => {
          const month = dayjs(item.created_at).format('MMMM');
          const year = dayjs(item.created_at).format('YYYY');
          const key = `${month}-${year}`;
          years.add(year);
          registrationsByMonthOptd[key] = (registrationsByMonthOptd[key] || 0) + 1;
        });

        setAvailableYears(Array.from(years));

        const monthlyRegistrationDataWalikota = Object.entries(
          registrationsByMonthWalikota
        ).map(([key, registrations]) => {
          const [month, year] = key.split('-');
          return { month, year, registrations };
        });

        const monthlyRegistrationDataOptd = Object.entries(
          registrationsByMonthOptd
        ).map(([key, registrations]) => {
          const [month, year] = key.split('-');
          return { month, year, registrations };
        });

        setWalikotaMonthlyData(monthlyRegistrationDataWalikota);
        setOptdMonthlyData(monthlyRegistrationDataOptd);
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleYearChange = (event: SelectChangeEvent<string>) => {
    setSelectedYear(event.target.value as string);
  };

  const filterDataByYear = (data: MonthlyData[]) =>
    data.filter((entry) => entry.year === selectedYear);

  return (
    <Container  >
      <Typography variant="h4" align="center" gutterBottom>
        Dashboard
      </Typography>

      {loading ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: '200px' }}
          marginTop={20}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="textSecondary">
                    Total Walikota yang Terdaftar
                  </Typography>
                  <Typography variant="h4">{walikotaCount}</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="textSecondary">
                    Total Pejabat yang Terdaftar
                  </Typography>
                  <Typography variant="h4">{optdCount}</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="textSecondary">
                    Total Rombongan
                  </Typography>
                  <Typography variant="h4">{totalRombongan}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <div style={{ 
  display: 'flex', 
  alignItems: 'right', 
  justifyContent: 'right', 
  margin: '20px 0', 
  padding: '10px', 
  borderRadius: '8px', 
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', 
  backgroundColor: '#f9f9f9', 
  maxWidth: '200px',
}}>
  <Select
    value={selectedYear}
    onChange={handleYearChange}
    variant="outlined"
    style={{ width: '100%', fontWeight: 'bold', backgroundColor: '#fff', borderRadius: '4px' }}
  >
    {availableYears.map((year) => (
      <MenuItem key={year} value={year}>
        {year}
      </MenuItem>
    ))}
  </Select>
</div>


          {/* Monthly Registration Chart for Walikota */}
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            style={{ marginTop: '20px' }}
          >
            Monthly Registrations (Walikota)
          </Typography>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={8}>
              <BarChart
                xAxis={[{ dataKey: 'month', scaleType: 'band' }]}
                series={[
                  { dataKey: 'registrations', label: 'Registrations', color: '#1976d2' },
                ]}
                width={600}
                height={300}
                dataset={filterDataByYear(walikotaMonthlyData) as Record<string, any>[]}
              />
            </Grid>
          </Grid>

          {/* Monthly Registration Chart for OPTD */}
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            style={{ marginTop: '20px' }}
          >
            Monthly Registrations (OPTD)
          </Typography>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={8}>
              <BarChart
                xAxis={[{ dataKey: 'month', scaleType: 'band' }]}
                series={[
                  { dataKey: 'registrations', label: 'Registrations', color: '#ff9800' },
                ]}
                width={600}
                height={300}
                dataset={filterDataByYear(optdMonthlyData) as Record<string, any>[]}
              />
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
