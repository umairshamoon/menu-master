import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, TextField, FormGroup } from '@material-ui/core'
import { Formik } from 'formik'
import http from '../../../services/httpService'
import { AddRounded } from '@material-ui/icons'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import SnackbarPop from '../../SharedComponents/SnackbarPop/SnackbarPop'
import * as Yup from 'yup'

const useStyles = makeStyles((theme) => ({
  form: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px #ccc',
    width: '100%',
  },
  formHeader: {
    fontWeight: 'bold',
    fontSize: '1rem',
    padding: '10px',
    color: theme.palette.primary.main,
  },
  textField: {
    width: '100%',
    margin: '10px 0',
  },
  datePicker: {
    width: '50%',
    margin: '10px 10px',
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

function EditIngredient(props) {
  const id = props.match.params.id
  const classes = useStyles()
  const [selectedFiles, setSelectedFile] = React.useState([])
  const [renderSnack, setRenderSnack] = useState()
  const [ingredient, setIngredient] = useState()
  const [isFetching, setIsFetching] = useState(false)
  const [imgFlag, setImgFlag] = useState(false)

  useEffect(() => {
    http.get(`/inventory/${id}`).then((response) => {
      setIngredient(response.data)
      setIsFetching(true)
    })
  }, [renderSnack])

  useEffect(() => {
    setSelectedFile(ingredient?.images)
  }, [ingredient])

  const fileToBase64 = async (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (e) => reject(e)
    })

  const handleCapture = (event) => {
    const files = event.target.files
    for (let x = 0; x < files.length; x++) {
      fileToBase64(files[x]).then((res) => {
        setSelectedFile((prevState) => [...prevState, { url: res }])
      })
    }
    setImgFlag(false)
  }
  const deleteImage = (value) => {
    const newArray = selectedFiles.filter((selectedFile, index) => index !== value)
    setSelectedFile(newArray)
  }
  function onKeyDown(keyEvent) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault()
    }
  }
  const validationSchema = Yup.object().shape({
    itemName: Yup.string().required('Item name is required'),

    description: Yup.string().required('Description is required'),

    images: Yup.array().of(Yup.string()).required('Images are required'),
  })
  return (
    <>
      {isFetching ? (
        <Formik
          initialValues={{
            itemName: ingredient.itemName,
            units: ingredient.units,
            description: ingredient.description,
            images: [],
          }}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            values.images = selectedFiles
            if (values.images.length < 1) return setImgFlag(true)
            setImgFlag(false)
            http
              .put(`/inventory/${id}`, values)
              .then((response) => {
                setRenderSnack(<SnackbarPop isOpen={true} message={response.data} target={'/ingredients'} severity={'success'} />)
              })
              .catch((error) => {
                setRenderSnack(<SnackbarPop isOpen={true} message={JSON.stringify(error.response.data.message)} severity={'error'} />)
              })
          }}
        >
          {({ handleChange, handleSubmit, setFieldValue, handleBlur, touched, values, errors }) => {
            const { units } = values
            const handleValueChange = (value, index, name) => {
              let previousValues = [...units]
              previousValues[index][name] = value
              setFieldValue('units', previousValues)
            }

            return (
              <form className={classes.form} noValidate autoComplete='off' onKeyDown={onKeyDown} onSubmit={handleSubmit}>
                <div className={classes.formHeader}>Ingredient</div>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      required={true}
                      helperText={touched.itemName ? errors.itemName : ''}
                      error={touched.itemName && errors.itemName}
                      onBlur={handleBlur}
                      name='itemName'
                      id='itemName'
                      label='Item Name ex:bread'
                      type='text'
                      onChange={handleChange}
                      className={classes.textField}
                      variant='outlined'
                      defaultValue={ingredient.itemName}
                    />
                    <div className={classes.formHeader}>Units</div>

                    {ingredient.units && ingredient.units.length
                      ? ingredient.units.map((row, index) => {
                          return (
                            <FormGroup>
                              <TextField
                                required={true}
                                onBlur={handleBlur}
                                value={row.unit}
                                name='unit'
                                id={index}
                                label='Unit ex:kg'
                                type='text'
                                onChange={(e) => handleValueChange(e.target.value, index, 'unit')}
                                className={classes.textField}
                                variant='outlined'
                              />
                              <TextField
                                required={true}
                                onBlur={handleBlur}
                                value={row.quantity}
                                name='quantity'
                                id={index}
                                label='Quantity ex:10'
                                type='text'
                                onChange={(e) => handleValueChange(e.target.value, index, 'quantity')}
                                className={classes.textField}
                                variant='outlined'
                              />
                              {row.expireDate && (
                                <TextField
                                  required={true}
                                  onBlur={handleBlur}
                                  defaultValue={row.expireDate}
                                  value={row.expireDate}
                                  name=''
                                  id={index}
                                  type='date'
                                  onChange={(e) => handleValueChange(e.target.value, index, 'expireDate')}
                                  className={classes.textField}
                                  variant='outlined'
                                />
                              )}

                              {row.days && (
                                <TextField
                                  onBlur={handleBlur}
                                  value={row.days}
                                  name='days'
                                  id={index}
                                  label='Days'
                                  type='text'
                                  onChange={(e) => handleValueChange(e.target.value, index, 'days')}
                                  className={classes.textField}
                                  variant='outlined'
                                />
                              )}
                            </FormGroup>
                          )
                        })
                      : null}
                    <TextField
                      helperText={touched.description ? errors.description : ''}
                      error={touched.description && errors.description}
                      onBlur={handleBlur}
                      name='description'
                      id='description'
                      label='Description'
                      type='textArea'
                      multiline
                      onChange={handleChange}
                      className={classes.textField}
                      variant='outlined'
                      defaultValue={ingredient.description}
                    />

                    <Grid item xs={12} sm={12} md={6} style={{ marginTop: '5px' }}>
                      <Grid>
                        {selectedFiles &&
                          selectedFiles.map((item, index) => {
                            return (
                              <>
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
                                  onClick={() => deleteImage(index)}
                                />
                              </>
                            )
                          })}
                        {selectedFiles.length == 0 && (
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
                            <div style={{ textAlign: 'center' }}>
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
                            <input type='file' hidden multiple onChange={handleCapture} />
                          </Button>
                        )}
                        {imgFlag && (
                          <div
                            style={{
                              color: 'red',
                              margin: '5px 0 0 30px',
                            }}
                          >
                            upload image
                          </div>
                        )}
                      </Grid>
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
                    Publish
                  </Button>
                </div>
              </form>
            )
          }}
        </Formik>
      ) : (
        ''
      )}
      {renderSnack}
    </>
  )
}
export default EditIngredient
