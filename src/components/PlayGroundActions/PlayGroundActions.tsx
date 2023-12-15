import { Dispatch, FC, JSX, SetStateAction, useId } from 'react';
import { Button, Container, TextField } from '@mui/material';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Grid from '@mui/material/Grid';

interface IPlayGroundActionsProps {
  handleSubmit: () => void;
  handlePrettify: () => void;
  urlAddress: string;
  setUrlAddress: Dispatch<SetStateAction<string>>;
}

const PlayGroundActions: FC<IPlayGroundActionsProps> = ({
  handleSubmit,
  handlePrettify,
  urlAddress,
  setUrlAddress,
}): JSX.Element => {
  const inputId = useId();
  return (
    <Container maxWidth={'xl'}>
      <Grid container spacing={1.5}>
        <Grid item xs={6} md={1}>
          <Button variant="text" onClick={handlePrettify}>
            <DisplaySettingsIcon />
          </Button>
        </Grid>
        <Grid item xs={6} md={1}>
          <Button variant="text" onClick={handleSubmit} color="success">
            <PlayCircleOutlineIcon />
          </Button>
        </Grid>
        <Grid item xs={12} md={10}>
          <TextField
            required
            id={inputId}
            label="URL GraphQL"
            fullWidth
            value={urlAddress}
            onChange={(e) => setUrlAddress(e.target.value)}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
export default PlayGroundActions;
