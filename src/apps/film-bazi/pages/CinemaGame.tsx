import React, { FC, Fragment, useEffect, useRef, useState } from 'react';
import { Box, Container } from '@mui/material';
import AppBarComponent from '../components/organisms/Appbar';
import BoardPaper from 'commons/template/Paper/BoardPaper';
import { objectLogics } from '../utils/CinemaGameLogic';

type SeatsGamePropsType = {}

const CinemaGame: FC<SeatsGamePropsType> = ({ }) => {
  const paperId = '11';
  const appbarRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      let calculatedHeight = window.innerHeight;
      if (appbarRef.current) {
        calculatedHeight -= appbarRef.current.offsetHeight;
      }
      setContainerHeight(calculatedHeight);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Fragment>
      <Box ref={appbarRef}>
        <AppBarComponent />
      </Box>

      {containerHeight > 0 &&
        <BoardPaper
          objectLogics={objectLogics}
          containerHeight={containerHeight}
          paperId={paperId}
        />
      }

    </Fragment>
  );
};

export default CinemaGame;