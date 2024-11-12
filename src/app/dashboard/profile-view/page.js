"use client"
import { Box, Button, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useFormik } from "formik";
import React from "react";
import * as Yup from 'yup';
import { getProfileData } from "./actions";
import { defaultProfile } from "./types";


const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});


export default function Page() {

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
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true)
            await login(values.email, values.password, (error) => {
                setError(error)
            })
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
        <React.Fragment>
            <Box
                sx={{
                    maxWidth: 'var(--Content-maxWidth)',
                    m: 'var(--Content-margin)',
                    p: 'var(--Content-padding)',
                    width: 'var(--Content-width)',
                }}
            >
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid size={4}>
                            <FormControl fullWidth error={Boolean(errors.first_name)}>
                                <InputLabel>First Name</InputLabel>
                                <OutlinedInput
                                    name="first_name"
                                    value={values.first_name}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={4}>
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
                        <Grid size={4}>
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
                        <Grid size={4}>
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
                        <Grid size={4}>
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
                </form>
            </Box>
        </React.Fragment>
    )
}