'use client';

import { DynamicLogo } from '@/components/core/logo';
import useAuth from '@/hooks/useAuth';
import { paths } from '@/paths';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import RouterLink from 'next/link';
import * as React from 'react';
import * as Yup from 'yup';
const oAuthProviders = [
  { id: 'google', name: 'Google', logo: '/assets/logo-google.svg' },
];
const defaultValues = { email: '', password: '' };
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export function LoginForm() {
  const { login } = useAuth()

  const [showPassword, setShowPassword] = React.useState();
  const [isPending, setIsPending] = React.useState(false);

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    setValues,
    setFieldValue,
    isValid,
    resetForm,
  } = useFormik({
    initialValues: defaultValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values, "values....")
      await login(values.email, values.password, (error) => {
        setError(error)
      })

      closeDialog?.();
    }
  })

  return (
    <Stack spacing={4}>
      <div>
        <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-block', fontSize: 0 }}>
          <DynamicLogo colorDark="light" colorLight="dark" height={32} width={122} />
        </Box>
      </div>
      <Stack spacing={1}>
        <Typography variant="h5">Sign in</Typography>
        <Typography color="text.secondary" variant="body2">
          Don&apos;t have an account?{' '}
          <Link component={RouterLink} href={paths.auth.custom.signUp} variant="subtitle2">
            Sign up
          </Link>
        </Typography>
      </Stack>
      <Stack spacing={3}>
        <Stack spacing={2}>
          {oAuthProviders.map((provider) => (
            <Button
              color="secondary"
              disabled={isPending}
              endIcon={<Box alt="" component="img" height={24} src={provider.logo} width={24} />}
              key={provider.id}
              onClick={() => {
                onAuth(provider.id).catch(() => {
                });
              }}
              variant="outlined"
            >
              Continue with {provider.name}
            </Button>
          ))}
        </Stack>
        <Divider>or</Divider>
        <Stack spacing={2}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  endAdornment={
                    showPassword ? (
                      <VisibilityIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={() => {
                          setShowPassword(false);
                        }}
                      />
                    ) : (
                      <VisibilityOffIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={() => {
                          setShowPassword(true);
                        }}
                      />
                    )
                  }
                />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
              {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
              <Button disabled={isPending} type="submit" variant="contained">
                Sign in
              </Button>
            </Stack>
          </form>
          <div>
            <Link component={RouterLink} href={paths.auth.custom.resetPassword} variant="subtitle2">
              Forgot password?
            </Link>
          </div>
        </Stack>
      </Stack>
      <Alert color="warning">
        Use{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          sofia@devias.io
        </Typography>{' '}
        with password{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          Secret1
        </Typography>
      </Alert>
    </Stack>
  );
}
