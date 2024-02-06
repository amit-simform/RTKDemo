import { useRoute, type RouteProp } from '@react-navigation/core';
import { useFormik, type FormikProps } from 'formik';
import { useEffect, useRef } from 'react';
import { UserResponse } from '../../../models';
import { AuthActions, useAppDispatch } from '../../../redux';
import { SigninFormSchema } from '../../../utils';
import type { SigninFormValues, SigninHookReturnType, SigninRouteParamList } from './SigninTypes';
import type { APIDispatch } from '../../../configs';
/**
 * Hook that returns the ref to the sign in form and the function to submit the form.
 * @returns formik props
 */
export default function useSignin(): SigninHookReturnType {
  const dispatch = useAppDispatch();
  const refSigninDispatch = useRef<APIDispatch<UserResponse>>();
  const route = useRoute<RouteProp<SigninRouteParamList, 'Signin'>>();
  /* Creating a formik object that is used to submit the form. */
  const formik: FormikProps<SigninFormValues> = useFormik<SigninFormValues>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: SigninFormSchema,
    onSubmit: (values: SigninFormValues) => {
      refSigninDispatch.current = dispatch(
        AuthActions.signinRequest({
          data: { email: values.email, password: values.password, username: 'default' }
          // TODO: You can change content type like below
          // setting: {
          //   headers: { 'Content-Type': 'multipart/form-data', Accept: 'multipart/form-data' }
          // }
        })
      );
    }
  });

  useEffect(() => {
    formik?.setFieldValue('email', route.params?.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.email]);

  useEffect(() => {
    return () => {
      refSigninDispatch.current?.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return formik;
}
