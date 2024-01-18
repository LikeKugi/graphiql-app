import { FC, JSX, useId, useState } from 'react';
import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Grid from '@mui/material/Grid';
import { IPlayGroundActionsProps } from './PlayGroundActions.types';
import DescriptionIcon from '@mui/icons-material/Description';
import { useLanguage } from '@/contexts/LanguageContext';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const PlayGroundActions: FC<IPlayGroundActionsProps> = ({
  handleSubmit,
  handlePrettify,
  urlAddress,
  setUrlAddress,
  onDocsClick,
  saveUrlRequest,
}): JSX.Element => {
  const inputId = useId();
  const { t } = useLanguage();
  const [isDisabled, setIsDisabled] = useState(true);

  const editUrlBtnHandler = () => {
    if (!isDisabled) {
      saveUrlRequest();
    }
    setIsDisabled((prevState) => !prevState);
  };

  return (
    <Container maxWidth={'xl'}>
      <Grid container spacing={1.5}>
        <Grid item xs={4} md={1}>
          <Button variant="text" onClick={onDocsClick}>
            <DescriptionIcon />
          </Button>
        </Grid>
        <Grid item xs={4} md={1}>
          <Button variant="text" onClick={handlePrettify}>
            <DisplaySettingsIcon />
          </Button>
        </Grid>
        <Grid item xs={4} md={1}>
          <Button variant="text" onClick={handleSubmit} color="success">
            <PlayCircleOutlineIcon />
          </Button>
        </Grid>
        <Grid item xs={12} md={9}>
          <TextField
            disabled={isDisabled}
            required
            id={inputId}
            label={t('playground.actions.url')}
            fullWidth
            value={urlAddress}
            onChange={setUrlAddress}
            InputProps={{
              endAdornment: (
                <InputAdornment position={'end'}>
                  <IconButton onClick={editUrlBtnHandler}>
                    {isDisabled ? <EditIcon /> : <SaveIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
export default PlayGroundActions;
