import { useEffect, useState } from 'react';
import { getDocs, getType } from './utils';
import { Box, Button, Typography } from '@mui/material';
import { ITypeQuery } from './interfaces';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from './Docs.module.scss';

const Docs = () => {
  const [docs, setDocs] = useState<ITypeQuery[]>([]);
  const [queryTypes, setQueryTypes] = useState<ITypeQuery[]>([]);
  const { t } = useLanguage();

  const getAllTypes = async () => {
    const typesList = await getDocs();
    setDocs(typesList);
  };

  const getCurType = async (name: string) => {
    const curType = await getType(name);
    setQueryTypes([...queryTypes, curType]);
  };

  const getPrevElem = () => {
    const newQueryTypes = queryTypes.slice(0, -1);
    setQueryTypes(newQueryTypes);
  };

  useEffect(() => {
    getAllTypes();
  }, []);

  const lastType = queryTypes[queryTypes.length - 1];
  const prevElem = queryTypes[queryTypes.length - 2];
  console.log(lastType);

  return (
    <Box className={styles.docs}>
      {!!queryTypes.length && (
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={getPrevElem}
          sx={{ mb: '10px' }}
        >
          {prevElem ? prevElem.name : 'Docs'}
        </Button>
      )}
      <Typography variant="h4" mb="30px" fontWeight={500}>
        {!queryTypes.length ? 'Docs' : lastType.name}
      </Typography>
      {!queryTypes.length ? (
        <>
          <Typography mb="30px">{t('docs.description')}</Typography>
          <Typography mb="15px" fontSize={18} fontWeight={500}>
            {t('docs.allSchema')}
          </Typography>
          {docs.map((type, i) => (
            <Typography
              className={styles.docs__text_type}
              key={i}
              mb="5px"
              onClick={() => getCurType(type.name)}
            >
              {type.name}
            </Typography>
          ))}
        </>
      ) : (
        <>
          <Typography>{lastType.description}</Typography>
          {!!lastType.fields?.length && (
            <>
              <Typography mb="15px" fontSize={18} fontWeight={500}>
                Fields
              </Typography>
              {lastType.fields.map((field, i) => (
                <Box key={i} mb="20px">
                  <Typography color="blue">
                    {`${field.name}: `}
                    <span
                      className={styles.docs__text_type}
                      onClick={() => getCurType(field.type.name)}
                    >
                      {field.type.name}
                    </span>
                  </Typography>
                  <Typography>{field.description}</Typography>
                </Box>
              ))}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default Docs;
