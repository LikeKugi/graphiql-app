import { FC, JSX, useId } from 'react';
import { Button, Container, TextField } from '@mui/material';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Grid from '@mui/material/Grid';
import { IPlayGroundActionsProps } from './PlayGroundActions.types';
import DescriptionIcon from '@mui/icons-material/Description';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectIsDocsShown, setIsDocsShown } from '@/store/reducers/docsSlice';
import { useLanguage } from '@/contexts/LanguageContext';

const PlayGroundActions: FC<IPlayGroundActionsProps> = ({
  handleSubmit,
  handlePrettify,
  urlAddress,
  setUrlAddress,
}): JSX.Element => {
  const inputId = useId();
  const isDocsShown = useAppSelector(selectIsDocsShown);
  const dispatch = useAppDispatch();
  const { t } = useLanguage();

  const random = Math.random();
  if (random > 0.5) throw new Error('hello');

  const onDocsClick = () => {
    dispatch(setIsDocsShown(!isDocsShown));
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
            required
            id={inputId}
            label={t('playground.actions.url')}
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
