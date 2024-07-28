import { WidgetModes } from "components/organisms/Widget";
import { WidgetType } from "./widget";
import { AnswerType } from "types/models";

export type QuestionWidgetType = WidgetType & {
  onAnswerSubmit: any;
  onAnswerChange: any;
  id: number;
  text: string;
  mode: WidgetModes;
  submittedAnswer: AnswerType;
  is_required: boolean;
  be_corrected: boolean;
}