import {
  Box,
  Container,
  Table,
  Paper,
  TableCell,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useUnit } from 'effector-react';

import { $events } from '@drag/entities/event';
import { CreateEventForm } from '@drag/features/events/create-event';

export const EventsPage = () => {
  const events = useUnit($events);

  return (
    <Container maxWidth="xl" sx={{ padding: '32px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '72px',
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: { xs: '16px', sm: 0 } }}>
          Список событий
        </Typography>
        <CreateEventForm />
      </Box>
      {events.length === 0 && (
        <Typography textAlign="center" fontSize="24px" sx={{ color: 'text.secondary' }}>
          Пусто
        </Typography>
      )}
      {events.length > 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Название</TableCell>
                <TableCell>Дата начала</TableCell>
                <TableCell>Описание</TableCell>
                <TableCell>Статус</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map(({ id, name, eventDate, eventStatus, description }) => (
                <TableRow key={id}>
                  <TableCell component="th" scope="row">
                    {name}
                  </TableCell>
                  <TableCell>{eventDate}</TableCell>
                  <TableCell>{description}</TableCell>
                  <TableCell>{eventStatus}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* <Grid container={true} columns={{ xs: 4, sm: 8, md: 12 }} spacing={4}> */}
      {/*   {events.map(({ id, name, eventDate, eventStatus, description }) => ( */}
      {/*     <Grid key={id} xs={4} sm={4} md={4}> */}
      {/*       <Event */}
      {/*         name={name} */}
      {/*         date={new Date(eventDate)} */}
      {/*         status={eventStatus} */}
      {/*         description={description} */}
      {/*       /> */}
      {/*     </Grid> */}
      {/*   ))} */}
      {/* </Grid> */}
    </Container>
  );
};
