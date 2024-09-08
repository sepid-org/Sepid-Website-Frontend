import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { useGetFSMStateQuery } from 'apps/website-display/redux/features/fsm/FSMStateSlice';
import { useGetPaperQuery } from 'apps/website-display/redux/features/paper/PaperSlice';
import { useGetWidgetPositionsByPaperQuery, useSaveWidgetPositionsMutation } from 'apps/website-display/redux/features/widget/WidgetPositionSlice';
import { WidgetPositionType, WidgetType } from 'commons/types/widgets/widget';
import Widget, { WidgetModes } from 'commons/components/organisms/Widget';
import FSMNextStateButton from 'commons/components/atoms/FSMNextStateButton';
import FSMBackStateButton from 'commons/components/atoms/FSMBackStateButton';

const BoardFSMState = ({ fsmStateId }) => {
  const { data: fsmState } = useGetFSMStateQuery({ fsmStateId });
  const { data: paper } = useGetPaperQuery({ paperId: fsmStateId }, { skip: !fsmStateId });
  const [widgetsWithPositions, setWidgetsWithPositions] = useState<(WidgetType & WidgetPositionType)[]>([]);
  const { data: widgetPositions } = useGetWidgetPositionsByPaperQuery({ paperId: fsmStateId });
  const [savePositions] = useSaveWidgetPositionsMutation();

  useEffect(() => {
    if (!paper || !widgetPositions) return;
    const widgets = paper.widgets;
    const mergeWidgetsAndPositions = () => {
      return widgets.map(widget => {
        const position = widgetPositions.find(pos => pos.widget === widget.id) || {
          x: Math.random() * 400,
          y: Math.random() * 400,
          width: 200,
          height: 200
        };
        return {
          ...widget,
          ...position
        };
      });
    };

    const merged = mergeWidgetsAndPositions();
    setWidgetsWithPositions(merged);
  }, [paper, widgetPositions]);


  const [scale, setScale] = useState(1);
  const boardRef = useRef(null);
  const containerRef = useRef(null);



  useEffect(() => {
    const handleResize = () => {
      if (boardRef.current && containerRef.current) {
        const boardHeight = Math.max(...widgetsWithPositions.map(comp => comp.y + comp.height), 900);
        const windowHeight = window.innerHeight;

        const newScale = windowHeight / boardHeight;

        setScale(newScale);
        boardRef.current.style.transform = `scale(${newScale})`;
        boardRef.current.style.transformOrigin = 'top left';
        boardRef.current.style.height = `${boardHeight}px`;

        // Set the container width to accommodate the scaled board width
        const boardWidth = Math.max(...widgetsWithPositions.map(comp => comp.x + comp.width));
        containerRef.current.style.width = `${boardWidth * newScale}px`;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [widgetsWithPositions]);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <div ref={containerRef} style={{ height: '100%', overflowX: 'auto', overflowY: 'hidden' }}>
        <div ref={boardRef} style={{ position: 'relative', transformOrigin: 'top left' }}>
          {widgetsWithPositions.map((widget) => (
            <div
              key={widget.id}
              style={{
                position: 'absolute',
                left: widget.x,
                top: widget.y,
                width: widget.width,
                height: widget.height,
              }}
            >
              <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <Widget coveredWithPaper={false} widget={widget} paperId={fsmStateId} mode={WidgetModes.View} />
              </div>
            </div>
          ))}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 400,
              width: 200,
              height: 100,
            }}
          >
            <FSMNextStateButton outwardEdges={fsmState.outward_edges} />
          </div>
          <div
            style={{
              position: 'absolute',
              left: 300,
              top: 100,
              width: 200,
              height: 100,
            }}
          >
            <FSMBackStateButton playerId='' inwardEdges={fsmState.inward_edges} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardFSMState;