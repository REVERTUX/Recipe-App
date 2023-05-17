import { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';

interface CreateNameModalProps {
  open: boolean;
  onChange: (value: boolean) => void;
  onSuccess: (value: string) => void;
  initialValue: string;
  label: string;
  title: string;
  description: string;
}

function CreateNameModal({
  onChange,
  onSuccess,
  open,
  initialValue,
  description,
  title,
  label,
}: CreateNameModalProps) {
  const [state, setState] = useState<string>('');

  useEffect(() => {
    setState(initialValue);
  }, [initialValue]);

  const handleClose = () => {
    onChange(false);
  };

  const handleSuccess = () => {
    onSuccess(state);
    onChange(false);
  };

  const onStateChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState(value);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
        <TextField
          autoFocus
          value={state}
          onChange={onStateChange}
          margin="dense"
          label={label}
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSuccess} disabled={state.trim().length < 3}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateNameModal;
