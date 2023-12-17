import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ITypeQuery } from './interfaces';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from './Docs.module.scss';
import { useAppSelector } from '@/store';
import { docsApi } from '@/api/docsApi';

const Docs = () => {
  const { t } = useLanguage();

  const { url } = useAppSelector((state) => state.address);
  const [queryTypes, setQueryTypes] = useState<ITypeQuery[]>([]);

  const { data: docs, isError: isDocsError } = docsApi.useGetDocsQuery(url);
  const [fetchType, { isError: isTypeError }] = docsApi.useLazyGetTypeQuery();

  const getCurType = async (type: string) => {
    const data = await fetchType({ url, type });
    if (data.data) {
      const newType = data.data.data.__type;
      setQueryTypes([...queryTypes, newType]);
    }
  };

  const getPrevType = () => {
    const newQueryTypes = queryTypes.slice(0, -1);
    setQueryTypes(newQueryTypes);
  };

  const lastType = queryTypes[queryTypes.length - 1];
  const prevType = queryTypes[queryTypes.length - 2];

  return (
    <Box className={styles.docs}>
      {!!queryTypes.length && (
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={getPrevType}
          sx={{ mb: '10px' }}
        >
          {prevType ? prevType.name : 'Docs'}
        </Button>
      )}
      <Typography variant="h4" mb="30px" fontWeight={500}>
        {!queryTypes.length ? 'Docs' : lastType?.name}
      </Typography>

      {isDocsError || isTypeError ? (
        <Typography>{t('docs.error')}</Typography>
      ) : !queryTypes.length ? (
        <>
          <Typography mb="30px">{t('docs.description')}</Typography>
          <Typography mb="15px" fontSize={18} fontWeight={500}>
            {t('docs.allSchema')}
          </Typography>
          {docs &&
            docs.map((type, i) => (
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
          <Typography>{lastType?.description}</Typography>
          {!!lastType?.fields?.length && (
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
