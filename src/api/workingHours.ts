import { queryOptions } from '@tanstack/react-query'
import { apiClient } from '../lib/apiClient'
import type { WorkingHours } from '../types/workingHours'

export const workingHoursQuery = queryOptions({
  queryKey: ['working-hours'],
  queryFn: () => apiClient.get<WorkingHours[]>('/working-hours'),
})
