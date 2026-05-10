// import type { SubmitHandler } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'

// export default function Home() {
//   const {
//     register,
//     handleSubmit,
//     setError,
//     formState: { errors, isSubmitting },
//   } = useForm<LoginPayload>({
//     resolver: zodResolver(LoginPayloadSchema),
//     mode: 'onBlur',
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   })

//   const onSubmit: SubmitHandler<LoginPayload> = async (data) => {
//     try {
//       await new Promise(resolve => setTimeout(resolve, 1000))

//       console.log(data)
//     }
//     catch {
//       setError('root.server', {
//         message: 'Invalid credentials',
//       })
//     }
//   }

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       noValidate
//     >
//       <input
//         {...register('email')}
//         type="email"
//         autoComplete="email"
//       />

//       {errors.email && (
//         <div>{errors.email.message}</div>
//       )}

//       <input
//         {...register('password')}
//         type="password"
//         autoComplete="current-password"
//       />

//       {errors.password && (
//         <div>{errors.password.message}</div>
//       )}

//       <button
//         type="submit"
//         disabled={isSubmitting}
//       >
//         {isSubmitting ? 'Logging in' : 'Login'}
//       </button>

//       {errors.root?.server && (
//         <div>{errors.root.server.message}</div>
//       )}
//     </form>
//   )
// }

export default function Login() {
  return <div>Hi</div>
}
