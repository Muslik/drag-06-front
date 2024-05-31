import { Add, Close } from '@mui/icons-material';
import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  useTheme,
  IconButton,
  Checkbox,
  FormControlLabel,
  CircularProgress,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useForm } from 'effector-forms';
import { useUnit } from 'effector-react';
import { FormEvent } from 'react';

import { createEventFx } from '@drag/entities/event';

import { $isDialogOpen, newEventForm, dialogOpened, dialogClosed } from '../../model';

export const CreateEventForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { submit, fields, errorText } = useForm(newEventForm);
  const [isDialogOpen, dialogOpenedFn, dialogClosedFn, isEventCreating] = useUnit([
    $isDialogOpen,
    dialogOpened,
    dialogClosed,
    createEventFx.pending,
  ]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    submit();
  };

  return (
    <>
      <Button variant="outlined" startIcon={<Add />} color="info" onClick={dialogOpenedFn}>
        Добавить
      </Button>
      <Dialog
        open={isDialogOpen}
        onClose={dialogClosedFn}
        fullScreen={isMobile}
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle>
          Добавить новое событие
          <IconButton
            aria-label="close"
            onClick={dialogClosedFn}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers={true}>
          <Box
            component="form"
            id="create-event-form"
            sx={{ padding: '16px 0', display: 'flex', gap: '32px', flexDirection: 'column' }}
            onSubmit={handleSubmit}
            noValidate={true}
          >
            <TextField
              error={fields.name.hasError()}
              label="Название события"
              variant="outlined"
              fullWidth={true}
              required={true}
              value={fields.name.value}
              onChange={(event) => fields.name.onChange(event.target.value)}
              helperText={errorText('name')}
              disabled={isEventCreating}
            />
            <DateTimePicker
              label="Дата события"
              slotProps={{ textField: { required: true } }}
              value={dayjs(fields.eventDate.value)}
              disablePast={true}
              onChange={(value) => {
                fields.eventDate.onChange(value ? dayjs(value).toISOString() : '');
              }}
              disabled={isEventCreating}
            />
            <TextField
              error={fields.description.hasError()}
              label="Описание события"
              variant="outlined"
              fullWidth={true}
              multiline={true}
              rows={3}
              value={fields.description.value}
              helperText={errorText('description')}
              onChange={(event) => fields.description.onChange(event.target.value)}
              disabled={isEventCreating}
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Начать регистрацию"
              value={fields.shouldStartRegistration.value}
              onChange={(_, checked) => fields.shouldStartRegistration.onChange(checked)}
              disabled={isEventCreating}
            />
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px 24px' }}
        >
          <Button
            form="create-event-form"
            type="submit"
            sx={{ marginLeft: 'auto' }}
            variant="outlined"
            color="primary"
            disabled={isEventCreating}
            endIcon={isEventCreating ? <CircularProgress size="20px" color="info" /> : <Add />}
          >
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
