import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { contactService, ContactSubmission } from '../services/contactService'

export const useContactSubmissions = () => {
  return useQuery({
    queryKey: ['contact-submissions'],
    queryFn: () => contactService.getAllSubmissions(),
    staleTime: 30 * 1000, // 30 секунд
    gcTime: 5 * 60 * 1000, // 5 минут
  })
}

export const useUpdateSubmissionStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ContactSubmission['status'] }) =>
      contactService.updateStatus(id, status!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-submissions'] })
    },
  })
}

export const useDeleteSubmission = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => contactService.deleteSubmission(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-submissions'] })
    },
  })
}





