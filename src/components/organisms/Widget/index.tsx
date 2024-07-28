import { Box, Divider, IconButton, Paper, Stack, Typography, Tooltip } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Help as HelpIcon } from '@mui/icons-material';
import React, { FC, Fragment, useMemo, useState } from 'react';

import DeleteWidgetDialog from 'components/organisms/dialogs/DeleteWidgetDialog';
import EditHintsDialog from 'components/organisms/dialogs/EditHintsDialog';
import WidgetHint from 'components/molecules/WidgetHint';
import useWidgetFactory from './useWidgetFactory';
import CostDialog from '../dialogs/CostDialog';
import { AnswerType } from 'types/models';
import { WidgetType } from 'types/widgets/widget';
import { QuestionWidgetType } from 'types/widgets/QuestionWidget';

export enum WidgetModes {
  Create,
  View,
  Edit,
  Review,
  InForm,
};

export enum WidgetTypes {
  SmallAnswerProblem = 'SmallAnswerProblem',
  BigAnswerProblem = 'BigAnswerProblem',
  UploadFileProblem = 'UploadFileProblem',
  MultiChoiceProblem = 'MultiChoiceProblem',
  InviteeUsername = 'InviteeUsername',
  TextWidget = 'TextWidget',
  DetailBoxWidget = 'DetailBoxWidget',
  Image = 'Image',
  Video = 'Video',
  Iframe = 'Iframe',
}

type WidgetPropsType = {
  widget: WidgetType;
  mode?: WidgetModes;
  paperId: string;
  coveredWithPaper?: boolean;
  collectAnswer?: any;
  submittedAnswer?: AnswerType;
}

const Widget: FC<WidgetPropsType> = ({
  widget,
  mode = WidgetModes.View,
  paperId,
  coveredWithPaper = true,
  collectAnswer,
  submittedAnswer,
}) => {
  const [openDeleteWidgetDialog, setOpenDeleteWidgetDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openEditHintDialog, setEditHintDialog] = useState(false);
  const [showCostDialog, setShowCostDialog] = useState(false);
  const [answerBody, setAnswerBody] = useState({});

  const {
    onDelete,
    onMutate,
    onAnswerChange,
    onAnswerSubmit,
    WidgetComponent,
    EditWidgetDialog,
    skipFetch,
  } = useWidgetFactory({
    widgetId: widget.id.toString(),
    paperId,
    widgetType: widget.widget_type,
    mode,
    collectAnswer,
  });

  const beCorrected = (widget as QuestionWidgetType).be_corrected;
  const cost = widget.cost;
  const reward = widget.reward;

  const onSubmit = () => {
    onAnswerSubmit({ ...answerBody, onSuccess: () => setShowCostDialog(showCostDialog => !showCostDialog) });
  }

  let onAnswerSubmitWrapper;
  if (beCorrected && cost) {
    onAnswerSubmitWrapper = (body) => {
      setShowCostDialog(showCostDialog => !showCostDialog);
      setAnswerBody(body);
    }
  }

  const Cover = useMemo(() =>
    coveredWithPaper
      ? ({ children }) =>
        <Paper elevation={2} sx={{ padding: 1 }}>
          {children}
        </Paper>
      : ({ children }) => children
    , [coveredWithPaper])

  return (
    <Fragment>
      <Cover>
        <Stack sx={{ position: 'relative' }}>
          {mode === WidgetModes.Edit &&
            <Stack>
              <Stack direction='row' alignItems='center' justifyContent='space-between'>
                <Typography variant='h3' gutterBottom>
                  {widget.name}
                </Typography>
                <Box>
                  <Tooltip title='راهنمایی‌ها' arrow>
                    <IconButton size='small' onClick={() => setEditHintDialog(true)}>
                      <HelpIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='ویرایش ویجت' arrow>
                    <IconButton size='small' onClick={() => setOpenEditDialog(true)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='حذف ویجت' arrow>
                    <IconButton size='small' onClick={() => setOpenDeleteWidgetDialog(true)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Stack>
              <Box mb={2}>
                <Divider />
              </Box>
              <EditWidgetDialog
                {...widget}
                paperId={paperId}
                open={openEditDialog}
                handleClose={() => setOpenEditDialog(false)}
                onMutate={onMutate}
              />
              <DeleteWidgetDialog
                widgetId={widget.id}
                open={openDeleteWidgetDialog}
                handleClose={() => setOpenDeleteWidgetDialog(false)}
                onDelete={onDelete}
              />
              <EditHintsDialog
                paperId={paperId}
                hints={widget.hints}
                referenceId={widget.id}
                open={openEditHintDialog}
                handleClose={() => setEditHintDialog(false)}
              />
            </Stack>
          }
          {(mode === WidgetModes.View && widget?.hints?.length) ? <WidgetHint hints={widget.hints} /> : null}
        </Stack>
        <WidgetComponent submittedAnswer={submittedAnswer} {...widget} mode={mode} onAnswerSubmit={onAnswerSubmitWrapper || onAnswerSubmit} onAnswerChange={onAnswerChange} />
      </Cover>
      {cost &&
        <CostDialog cost={cost} callBackFunction={onSubmit} open={showCostDialog} handleClose={() => setShowCostDialog(showCostDialog => !showCostDialog)} />
      }
    </Fragment>
  );
};

export default Widget;
