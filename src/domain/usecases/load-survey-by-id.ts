import type { SurveyModel } from '@/domain/models/survey'

export interface LoadSurveyById {
  loadbyId: () => Promise<SurveyModel>
}
