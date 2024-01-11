import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { authService } from '../../../app/services/authService'
import { SignupParams } from '../../../app/services/authService/signup'
import toast from 'react-hot-toast'

const schema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().min(1, 'E-mail é obrigatório').email('Informe um e-mail válido'),
  password: z.string().min(8, 'Senha deve conter pelo menos 8 digítos')
})

type FormData = z.infer<typeof schema>

export function useRegisterController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (data: SignupParams) => {
      return authService.signup(data)
    }
  })

  const handleSubmit = hookFormHandleSubmit(async (data) => {
     try {
      await mutateAsync(data)
     } catch {
      toast.error('Ocorreu um erro ao criar a sua conta!')
     }
  })

  return { handleSubmit, register, errors, isPending }
}
