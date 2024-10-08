import type { SurveyModel } from '@/domain/models/survey'

export interface AddSurvey {
  add: (data: AddSurvey.Params) => Promise<void>
}

export namespace AddSurvey{
  export type Params = Omit<SurveyModel, 'id'>
}
