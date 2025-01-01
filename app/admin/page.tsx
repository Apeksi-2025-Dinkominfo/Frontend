'use client';
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
  jabatan: string;
}

interface PositionCount {
  position: string;
  count: number;
}

const Dashboard = () => {
  const [walikotaCount, setWalikotaCount] = useState(0);
  const [wakilWalikotaCount, setWakilWalikotaCount] = useState(0);
  const [SekdaCount, setSekdaCount] = useState(0);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [totalRombongan, setTotalRombongan] = useState(0);
  const [loading, setLoading] = useState(true);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [positionCounts, setPositionCounts] = useState<PositionCount[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>(dayjs().format('YYYY'));
  const [availableYears, setAvailableYears] = useState<string[]>([]);
  const [funRunCount, setFunRunCount] = useState(0);
  const [tanamPohonCount, setTanamPohonCount] = useState(0);
  const [ladiesProgramCount, setLadiesProgramCount] = useState(0);
  const [karnavalCount, setKarnavalCount] = useState(0);
  const [youthCityChangerCount, setYouthCityChangerCount] = useState(0);
  const [indonesiaCityExpoCount, setIndonesiaCityExpoCount] = useState(0);

  const positions = [
    'Asisten',
    'Staf Ahli',
    'Kepala Dinas/Badan',
    'Lainnya'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const pesertaResponse = await axios.get('http://localhost:5000/peserta');
        const pesertaData = pesertaResponse.data;
        const optdResponse = await axios.get('http://localhost:5000/optd');
        const optdData = optdResponse.data;

        const allData = [...pesertaData, ...optdData];

        // Count total participants
        setTotalParticipants(allData.length);
        
        // Count positions
        const positionCountsData = positions.map(position => ({
          position,
          count: position === 'Lainnya' 
            ? allData.filter((p: Participant) => 
                !['Walikota', 'Wakil Walikota', 'Sekretaris Daerah', 'Asisten', 'Staf Ahli', 'Kepala Dinas/Badan'].includes(p.jabatan)
              ).length
            : allData.filter((p: Participant) => p.jabatan === position).length
        }));
        setPositionCounts(positionCountsData);

        // Set specific counts
        setWalikotaCount(allData.filter((p: Participant) => p.jabatan === 'Walikota').length);
        setWakilWalikotaCount(allData.filter((p: Participant) => p.jabatan === 'Wakil Walikota').length);
        setSekdaCount(allData.filter((p: Participant) => p.jabatan === 'Sekretaris Daerah').length);

        // Calculate total rombongan
        const totalRombongan = allData.reduce(
          (sum: number, item: Participant) => sum + (item.jumlah_rombongan || 0),
          0
        );
        setTotalRombongan(totalRombongan);

        // Count event participation
        setFunRunCount(optdData.filter((p: any) => p.EventParticipation?.includes('Fun Run')).length);
        setTanamPohonCount(optdData.filter((p: any) => p.EventParticipation?.includes('Tanam Pohon')).length);
        setLadiesProgramCount(optdData.filter((p: any) => p.EventParticipation?.includes('Ladies Program')).length);
        setKarnavalCount(optdData.filter((p: any) => p.EventParticipation?.includes('Karnaval')).length);
        setYouthCityChangerCount(optdData.filter((p: any) => p.EventParticipation?.includes('Youth City Changer')).length);
        setIndonesiaCityExpoCount(optdData.filter((p: any) => p.EventParticipation?.includes('Indonesia City Expo')).length);

        // Process monthly data
        const registrationsByMonth: Record<string, number> = {};
        const years: Set<string> = new Set();

        allData.forEach((item: Participant) => {
          const month = dayjs(item.created_at).format('MMMM');
          const year = dayjs(item.created_at).format('YYYY');
          const key = `${month}-${year}`;
          years.add(year);
          registrationsByMonth[key] = (registrationsByMonth[key] || 0) + 1;
        });

        setAvailableYears(Array.from(years));

        const monthlyRegistrationData = Object.entries(registrationsByMonth)
          .map(([key, registrations]) => {
            const [month, year] = key.split('-');
            return { month, year, registrations };
          });

        setMonthlyData(monthlyRegistrationData);
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
    <Container>
      {loading ? (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '200px' }}>
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardContent style={{ minHeight: '120px' }}>
                  <Typography variant="h6" color="textSecondary">
                    Total Walikota 
                  </Typography>
                  <Typography variant="h4">{walikotaCount}</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardContent style={{ minHeight: '120px' }}>
                  <Typography variant="h6" color="textSecondary">
                    Total Wakil Walikota
                  </Typography>
                  <Typography variant="h4">{wakilWalikotaCount}</Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Sekretaris Daerah card moved here */}
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardContent style={{ minHeight: '120px' }}>
                  <Typography variant="h6" color="textSecondary">
                    Sekretaris Daerah
                  </Typography>
                  <Typography variant="h4">{SekdaCount}</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardContent style={{ minHeight: '120px' }}>
                  <Typography variant="h6" color="textSecondary">
                    Total Rombongan
                  </Typography>
                  <Typography variant="h4">{totalRombongan}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3} marginTop={2} justifyContent="center">
            {positionCounts.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.position}>
                <Card>
                  <CardContent style={{ minHeight: '120px' }}>
                    <Typography variant="h6" color="textSecondary">
                      {item.position}
                    </Typography>
                    <Typography variant="h4">{item.count}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3} marginTop={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardContent style={{ minHeight: '120px' }}>
                  <Typography variant="h6" color="textSecondary">
                    Fun Run Participants
                  </Typography>
                  <Typography variant="h4">{funRunCount}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardContent style={{ minHeight: '120px' }}>
                  <Typography variant="h6" color="textSecondary">
                    Tanam Pohon 
                  </Typography>
                  <Typography variant="h4">{tanamPohonCount}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardContent style={{ minHeight: '120px' }}>
                  <Typography variant="h6" color="textSecondary">
                    Ladies Program 
                  </Typography>
                  <Typography variant="h4">{ladiesProgramCount}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardContent style={{ minHeight: '120px' }}>
                  <Typography variant="h6" color="textSecondary">
                    Karnaval 
                  </Typography>
                  <Typography variant="h4">{karnavalCount}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardContent style={{ minHeight: '120px' }}>
                  <Typography variant="h6" color="textSecondary">
                    Youth City Changer 
                  </Typography>
                  <Typography variant="h4">{youthCityChangerCount}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card>
                <CardContent style={{ minHeight: '120px' }}>
                  <Typography variant="h6" color="textSecondary">
                    Indonesia City Expo 
                  </Typography>
                  <Typography variant="h4">{indonesiaCityExpoCount}</Typography>
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
              style={{
                width: '100%',
                fontWeight: 'bold',
                backgroundColor: '#fff',
                borderRadius: '4px',
              }}
            >
              {availableYears.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </div>

          {/* Monthly Registration Chart */}
          <Typography variant="h5" align="center" gutterBottom style={{ marginTop: '20px' }}>
            Monthly Registrations
          </Typography>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={8}>
              <BarChart
                xAxis={[{ dataKey: 'month', scaleType: 'band' }]}
                series={[{ dataKey: 'registrations', label: 'Registrations', color: '#1976d2' }]}
                width={600}
                height={300}
                dataset={filterDataByYear(monthlyData) as Record<string, any>[]}
              />
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Dashboard;

