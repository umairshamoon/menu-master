import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, TextField } from '@material-ui/core'
import { Formik } from 'formik'
import http from '../../services/httpService'

import SnackbarPop from '../SharedComponents/SnackbarPop/SnackbarPop'
import * as Yup from 'yup'

const useStyles = makeStyles((theme) => ({
  form: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px #ccc',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '90%',
      margin: '0 auto',
    },
  },
  formHeader: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    padding: '10px',

    color: theme.palette.primary.main,
  },
  textField: {
    width: '100%',
    margin: '10px 0',
  },
  datePicker: {
    width: '100%',
    margin: '10px 0',
    '& .MuiInputBase-root': {
      borderColor: theme.palette.secondary.main,
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: theme.palette.secondary.dark,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.secondary.main,
      },
    },
  },
}))

function EditUser(props) {
  const classes = useStyles()
  const id = props.match.params.id

  const [selectedFiles, setSelectedFile] = useState([])
  const [error, setError] = useState(false)
  const [renderSnack, setRenderSnack] = useState()
  const [helperText, setHelperText] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [user, setUser] = useState()

  function onKeyDown(keyEvent) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault()
    }
  }
  useEffect(() => {
    http.get(`/users/${id}`).then((response) => {
      setUser(response.data)
      setIsFetching(true)
    })
  }, [renderSnack])
  useEffect(() => {
    setSelectedFile(user?.images)
  }, [user])
  const validationSchema = Yup.object().shape({
    fName: Yup.string().required('First name is required'),
    lName: Yup.string().required('Second name is required'),
    email: Yup.string().email().required('email is required'),
    username: Yup.string().required('username is required'),
    house: Yup.number()
      .required('House number is required')
      .positive('House number should be positive'),
    street: Yup.number()
      .required('House number is required')
      .positive('Street number should be positive'),
    postalCode: Yup.number()
      .required('Postal Code is required')
      .positive('Postal Code should be positive'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    contractType: Yup.string().required(
      'Contract Type is required'
    ),
    designation: Yup.string().required(
      'Designation is required'
    ),
    salary: Yup.number()
      .required('Salary is required')
      .positive('Enter valid salary'),
    // images: Yup.array()
    //   .of(Yup.string())
    //   .required('Images are required'),
  })
  return (
    <>
      {isFetching ? (
        <div className='ingredient-container'>
          <Formik
            initialValues={{
              fName: user?.fName,
              lName: user?.lName,
              email: user?.email,
              username: user?.username,
              contractType: user?.contractType,
              designation: user?.designation,
              salary: user?.salary,
              house: user?.address?.house,
              street: user?.address?.street,
              postalCode: user?.address?.postalCode,
              state: user?.address?.state,
              city: user?.address?.city,
              // image: null
            }}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              // values.images = selectedFiles

              http
                .put(`/users/${id}`, values)
                .then((response) => {
                  setRenderSnack(
                    <SnackbarPop
                      isOpen={true}
                      message={response.data}
                      target={'/workersList'}
                      severity={'success'}
                    />
                  )
                })
                .catch((error) => {
                  setRenderSnack(
                    <SnackbarPop
                      isOpen={true}
                      message={JSON.stringify(
                        error?.response?.data?.message
                      )}
                      severity={'error'}
                    />
                  )
                })
            }}
          >
            {({
              handleChange,
              handleSubmit,
              setFieldValue,
              handleBlur,
              touched,
              values,
              errors,
            }) => {
              return (
                <form
                  className={classes.form}
                  noValidate
                  autoComplete='off'
                  onKeyDown={onKeyDown}
                  onSubmit={handleSubmit}
                >
                  <div className={classes.formHeader}>
                    Edit User
                  </div>

                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        required={true}
                        helperText={
                          touched.fName ? errors.fName : ''
                        }
                        error={touched.fName && errors.fName}
                        onBlur={handleBlur}
                        name='fName'
                        id='fName'
                        label='First Name'
                        type='text'
                        onChange={handleChange}
                        defaultValue={user.fName}
                        className={classes.textField}
                        variant='outlined'
                      />
                      <TextField
                        required={true}
                        helperText={
                          touched.lName ? errors.lName : ''
                        }
                        error={touched.lName && errors.lName}
                        onBlur={handleBlur}
                        name='lName'
                        id='lName'
                        label='Last Name'
                        type='text'
                        defaultValue={user.lName}
                        onChange={handleChange}
                        className={classes.textField}
                        variant='outlined'
                      />
                      <TextField
                        required={true}
                        helperText={
                          touched.email ? errors.email : ''
                        }
                        error={touched.email && errors.email}
                        onBlur={handleBlur}
                        name='email'
                        id='email'
                        label='Email'
                        type='text'
                        defaultValue={user.email}
                        onChange={handleChange}
                        className={classes.textField}
                        variant='outlined'
                      />
                      <TextField
                        required={true}
                        helperText={
                          touched.username ? errors.username : ''
                        }
                        error={
                          touched.username && errors.username
                        }
                        onBlur={handleBlur}
                        name='username'
                        id='username'
                        label='Username'
                        type='text'
                        defaultValue={user.username}
                        onChange={handleChange}
                        className={classes.textField}
                        variant='outlined'
                      />
                      <TextField
                        required={true}
                        helperText={
                          touched.house ? errors.house : ''
                        }
                        error={touched.house && errors.house}
                        onBlur={handleBlur}
                        name='house'
                        id='house'
                        label='House'
                        type='text'
                        defaultValue={user?.address?.house}
                        onChange={handleChange}
                        className={classes.textField}
                        variant='outlined'
                      />
                      <TextField
                        required={true}
                        helperText={
                          touched.description
                            ? errors.description
                            : ''
                        }
                        error={touched.street && errors.street}
                        onBlur={handleBlur}
                        name='street'
                        id='street'
                        label='Street'
                        type='text'
                        defaultValue={user?.address?.street}
                        onChange={handleChange}
                        className={classes.textField}
                        variant='outlined'
                      />
                      <TextField
                        required={true}
                        helperText={
                          touched.postalCode
                            ? errors.postalCode
                            : ''
                        }
                        error={
                          touched.postalCode && errors.postalCode
                        }
                        onBlur={handleBlur}
                        name='postalCode'
                        id='postalCode'
                        label='Postal Code'
                        type='text'
                        defaultValue={user?.address?.postalCode}
                        onChange={handleChange}
                        className={classes.textField}
                        variant='outlined'
                      />
                      <TextField
                        required={true}
                        helperText={
                          touched.state ? errors.state : ''
                        }
                        error={touched.state && errors.state}
                        onBlur={handleBlur}
                        name='state'
                        id='state'
                        label='State'
                        type='text'
                        defaultValue={user?.address?.state}
                        onChange={handleChange}
                        className={classes.textField}
                        variant='outlined'
                      />
                      <TextField
                        required={true}
                        helperText={
                          touched.postalCode
                            ? errors.postalCode
                            : ''
                        }
                        error={touched.city && errors.city}
                        onBlur={handleBlur}
                        name='city'
                        id='city'
                        label='City'
                        type='text'
                        defaultValue={user?.address?.city}
                        onChange={handleChange}
                        className={classes.textField}
                        variant='outlined'
                      />

                      <TextField
                        required={true}
                        helperText={
                          touched.contractType
                            ? errors.contractType
                            : ''
                        }
                        error={
                          touched.contractType &&
                          errors.contractType
                        }
                        onBlur={handleBlur}
                        name='contractType'
                        id='contractType'
                        label='Contract Type'
                        type='text'
                        defaultValue={user?.contractType}
                        onChange={handleChange}
                        className={classes.textField}
                        variant='outlined'
                      />
                      <TextField
                        required={true}
                        helperText={
                          touched.designation
                            ? errors.designation
                            : ''
                        }
                        error={
                          touched.designation &&
                          errors.designation
                        }
                        onBlur={handleBlur}
                        name='designation'
                        id='designation'
                        label='Designation'
                        type='text'
                        defaultValue={user?.designation}
                        onChange={handleChange}
                        className={classes.textField}
                        variant='outlined'
                      />

                      <TextField
                        required={true}
                        helperText={
                          touched.salary ? errors.salary : ''
                        }
                        error={touched.salary && errors.salary}
                        onBlur={handleBlur}
                        name='salary'
                        id='salary'
                        label='Salary ex:10'
                        type='text'
                        defaultValue={user?.salary}
                        onChange={handleChange}
                        className={classes.textField}
                        variant='outlined'
                      />

                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        style={{ marginTop: '5px' }}
                      >
                        {/* <Grid>
                          {selectedFiles &&
                            selectedFiles.map((item, index) => {
                              return (
                                <div key={index}>
                                  <img
                                    src={item.url}
                                    style={{
                                      border: '1px solid grey',
                                      borderRadius: '10px',
                                      width: '150px',
                                      height: '100px',
                                      marginLeft: '10px',
                                    }}
                                    key={index}
                                  />

                                  <DeleteForeverIcon
                                    style={{
                                      position: 'absolute',
                                      marginLeft: '-30px',
                                      marginTop: '5px',
                                      color: 'red',
                                      cursor: 'pointer',
                                    }}
                                    onClick={() =>
                                      deleteImage(index)
                                    }
                                  />
                                </div>
                              )
                            })}
                          {!(selectedFiles.length > 0) && (
                            <Button
                              component='label'
                              className={'upload-file-box'}
                              style={{
                                border: '1px solid grey',
                                borderRadius: '10px',
                                width: '150px',
                                height: '100px',
                                marginLeft: '10px',
                                marginBottom: '10px',
                              }}
                            >
                              <div
                                style={{ textAlign: 'center' }}
                              >
                                <AddRounded
                                  style={{
                                    background: 'blue',
                                    color: 'white',
                                    height: '40px',
                                    width: '40px',
                                    borderRadius: '50%',
                                  }}
                                />
                                <br />
                                Add Picture
                              </div>
                              <input
                                type='file'
                                hidden
                                multiple
                                onChange={handleCapture}
                              />
                            </Button>
                          )}
                        </Grid> */}
                      </Grid>
                    </Grid>
                  </Grid>

                  <div style={{ paddingTop: '10px' }}>
                    <Button
                      variant='contained'
                      color='primary'
                      type='submit'
                      data-testid='Publish-btn'
                      style={{
                        marginLeft: '25%',
                        width: '200px',
                        height: '50px',
                      }}
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              )
            }}
          </Formik>
        </div>
      ) : (
        ''
      )}
      {renderSnack}
    </>
  )
}
export default EditUser
