import { CheckCircle, EditCalendar, HowToReg, Sync } from '@mui/icons-material';
import { Card, CardContent, Chip, CardMedia, Typography, Box, CardActionArea } from '@mui/material';

import { internalApi } from '@drag/shared/api';
import Car1Image from '@drag/shared/assets/car-1.jpg';
import { getShortMonthName } from '@drag/shared/lib/date';

type Props = {
  name: string;
  date: Date;
  status: internalApi.EventEntity['eventStatus'];
  description: string | null;
};

const STATUS_MAPPING = {
  registration: {
    label: 'Открыта регистрация',
    color: 'warning',
    icon: <HowToReg />,
  },
  finished: { label: 'Завершено', color: 'primary', icon: <CheckCircle /> },
  started: { label: 'В процессе', color: 'success', icon: <Sync /> },
  created: { label: 'Создано', color: 'secondary', icon: <EditCalendar /> },
} as const;

export const Event = ({ name, date, status, description }: Props) => {
  const { label, color, icon } = STATUS_MAPPING[status];

  return (
    <Card sx={{ position: 'relative', overflow: 'visible' }}>
      <CardActionArea>
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            image={Car1Image}
            alt="car-image"
            sx={{ filter: 'brightness(50%)', height: '200px' }}
          />
          <Typography
            variant="h5"
            color="text.primary"
            align="center"
            fontWeight="700"
            sx={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              textAlign: 'left',
              color: 'white',
            }}
          >
            {name}
          </Typography>
        </Box>
        <Chip
          icon={icon}
          color={color}
          label={label}
          sx={{
            color: 'white',
            position: 'absolute',
            left: '50%',
            top: '0',
            transform: 'translate(-50%,-50%)',
          }}
        />
        <CardContent sx={{ position: 'relative', paddingRight: '86px', minHeight: '80px' }}>
          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '70px',
              height: '100%',
              textAlign: 'center',
              backgroundColor: 'info.main',
              color: 'white',
            }}
          >
            <Typography fontSize="24px">{date.getDate()}</Typography>
            <Typography fontSize="18px">{getShortMonthName(date).toUpperCase()}</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
