'use client';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import * as React from 'react';

import { useFormik } from 'formik';

import Grid from '@mui/material/Grid2';
import * as Yup from 'yup';
import ImageUploader from '../uploaders/ImageUploader';
import { defaultProfile } from './_lib/types';
import { getProfileData, updateProfileData } from './_lib/actions';



const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});


export function AccountDetails() {

  const [loading, setLoading] = React.useState(false);


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
    initialValues: defaultProfile,
    validate: (values) => {
      const errors = {};
     
      return errors;
    }, 
    onSubmit: async (values) => {
      console.log(values, "values on submit.....")
      setLoading(true)
      await updateProfileData(values)
      setLoading(false)
      closeDialog?.();
    }
  })
  async function fetchProfileData() {
    try {
      const response = await getProfileData();
      setValues(response);
    } catch (error) {
      console.error('Error fetching profile data:', error);
      return null;
    }
  }
  React.useEffect(() => {
    fetchProfileData();
  }, [])


  console.log(values, "values....")
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <UserIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="My profile"
      />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <ImageUploader value={values.avatar} onFileSelect={(file) => setFieldValue('profile_pic', file)} />

            </Stack>
            <Stack spacing={2}>

              <Grid container spacing={2}>
                <Grid size={6}>
                  <FormControl fullWidth error={Boolean(errors.first_name)}>
                    <InputLabel>First Name</InputLabel>
                    <OutlinedInput
                      name="first_name"
                      value={values.first_name}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid size={6}>
                  <FormControl fullWidth error={Boolean(errors.email)}>
                    <InputLabel>Last Name</InputLabel>
                    <OutlinedInput
                      type="last_name"
                      name="last_name"
                      value={values.last_name}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>

                <Grid size={12}>
                  <FormControl fullWidth error={Boolean(errors.email)}>
                    <InputLabel>Contact No.</InputLabel>
                    <OutlinedInput
                      type="contact_number"
                      name="contact_number"
                      value={values.contact_number}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>

                <Grid size={12}>
                  <FormControl fullWidth error={Boolean(errors.email)}>
                    <InputLabel>Email</InputLabel>
                    <OutlinedInput
                      type="email"
                      name="email"
                      value={values.email}
                      disabled
                    />
                  </FormControl>
                </Grid>

                <Grid size={12}>
                  <FormControl fullWidth error={Boolean(errors.email)}>
                    <InputLabel>Role</InputLabel>
                    <OutlinedInput
                      type="role"
                      name="role"
                      value={values.role}
                      disabled
                    />
                  </FormControl>
                </Grid>
                <Grid size={12} >
                  <Button type="submit" variant="contained">
                    Update
                  </Button>
                </Grid>

              </Grid>
            </Stack>
          </Stack>
        </form>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button color="secondary">Cancel</Button>
        <Button variant="contained">Save changes</Button>
      </CardActions>
    </Card>
  );
}
