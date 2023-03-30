import React, { useEffect, useState } from 'react';
import './EditChed.scss';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import MuiPhoneNumber from 'material-ui-phone-number';
import { Formik } from 'formik';
import http from '../../services/httpService';

const EditChef = (props) => {
  const id = props.match.params.id;
  const type = props.match.params.type;
  const [phoneNumber, setPhoneNumber] = useState();
  const [editUser, setEditUser] = useState();
  const [isFetching, setIsFetching] = React.useState(true);
  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(3),
        width: '25ch',
        display: 'block',
      },
    },
  }));
  const classes = useStyles();

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e);
  };

  useEffect(() => {
    http.get(`/users/${id}`).then((response) => {
      setEditUser(response.data);
      setIsFetching(false);
    });
  }, []);

  return (
    <>
      {!isFetching ? (
        <Formik
          initialValues={{}}
          onSubmit={(values, { setSubmitting }) => {
            let data = {
              email: values.email,
              password: values.password,
              phoneNumber: phoneNumber,
              username: values.userName,
              type: type,
            };
            http.put(`/users/${id}`, data).then((response) => {
              alert('User updated');
            });
          }}
        >
          {({ handleChange, handleSubmit }) => (
            <form
              className={classes.root}
              noValidate
              autoComplete='off'
              onSubmit={handleSubmit}
            >
              <div>
                <TextField
                  required
                  name='userName'
                  id='userName'
                  label='Username'
                  type='text'
                  defaultValue={editUser.username}
                  onChange={handleChange}
                />
                <TextField
                  required
                  name='email'
                  id='email'
                  label='Email ID'
                  type='email'
                  defaultValue={editUser.email}
                  onChange={handleChange}
                />
                <TextField
                  required
                  name='password'
                  id='password'
                  label='Create New Password'
                  type='password'
                  onChange={handleChange}
                />
                <MuiPhoneNumber
                  name='phoneNumber'
                  label='Phone Number (Optional)'
                  defaultCountry={'us'}
                  defaultValue={editUser.phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </div>
              <Button
                variant='contained'
                color='primary'
                type='submit'
              >
                Update
              </Button>
            </form>
          )}
        </Formik>
      ) : (
        ''
      )}
    </>
  );
};

export default EditChef;
