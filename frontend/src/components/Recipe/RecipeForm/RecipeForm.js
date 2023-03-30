import React, { useEffect, useState } from 'react'
import './RecipeForm.scss'
import { makeStyles } from '@material-ui/core/styles'

import * as Yup from 'yup'
import { Button, Grid, FormGroup, MenuItem, InputAdornment, TextField } from '@material-ui/core'
import { Formik } from 'formik'
import http from '../../../services/httpService'
import { AddRounded } from '@material-ui/icons'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import SnackbarPop from '../../SharedComponents/SnackbarPop/SnackbarPop'

const RecipeForm = () => {
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
    formHead: {
      fontWeight: 'bold',
      fontSize: '1.5rem',
      padding: '10px',
      color: theme.palette.primary.main,
    },
    button: {
      width: '150px',
      color: '#fff',
    },
    textField: {
      width: '100%',
      margin: '10px 0',
    },
  }))

  const [items, setItems] = useState([])
  const classes = useStyles()
  const [imgFlag, setImgFlag] = useState(false)
  const [selectedFiles, setSelectedFile] = useState([])
  const [renderSnack, setRenderSnack] = useState()

  useEffect(() => {
    http.get('/inventory/').then((response) => {
      setItems(response.data)
    })
  }, [])
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
    recipeName: Yup.string().required('Recipe name is required'),
    recipeDescription: Yup.string().required(' Recipe Description is required'),
    difficultyLevel: Yup.string().required('Difficulty Level is Required'),
    recipeDescription: Yup.string().required('Recipe Descriptioin is Required'),
    recipeServings: Yup.string().required('Recipe Serving is Required'),
    prepTime: Yup.string().required('Preparation Time is Required'),
    cookTime: Yup.string().required('Cook Time is Required'),
    totalCookTime: Yup.string().required('Total Cook Time is Required'),
    ingredients: Yup.array()
      .of(
        Yup.object().shape({
          ingredient: Yup.string().required('Ingredient name is required'),
          quantity: Yup.string().required('Ingredient quantity is required'),
        })
      )
      .min(1, 'At least one ingredient is required'),
    recipeSteps: Yup.array().of(
      Yup.object().shape({
        step: Yup.string().required('Step is required'),
      })
    ),
  })
  return (
    <>
      <div className={'recipe-container'}>
        <Formik
          initialValues={{
            ingredients: [{ ingredient: '', quantity: '' }],
            recipeSteps: [{ step: '' }],
            images: [],
            recipeName: '',
            recipeDescription: '',
            recipeServings: '',
            prepTime: '',
            cookTime: '',
            totalCookTime: '',
            difficultyLevel: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            values.images = selectedFiles
            if (values.images.length < 1) return setImgFlag(true)
            setImgFlag(false)
            http
              .post('/recipes/add', values)
              .then((response) => {
                setRenderSnack(<SnackbarPop isOpen={true} message={response.data} target={'/recipesList'} severity={'success'} />)
              })
              .catch((error) => {
                setRenderSnack(<SnackbarPop isOpen={true} message={JSON.stringify(error.response.data.message)} severity={'error'} />)
              })
          }}
        >
          {({ handleChange, handleSubmit, setFieldValue, handleBlur, touched, values, errors }) => {
            const { ingredients } = values
            const { recipeSteps } = values
            const handleValueChange = (value, index, name) => {
              let previousValues = [...ingredients]
              previousValues[index][name] = value
              setFieldValue('ingredients', previousValues)
            }
            const handleRecipeStepsValueChange = (value, index, name) => {
              let previousValues = [...recipeSteps]
              previousValues[index][name] = value
              setFieldValue('recipeSteps', previousValues)
            }
            const handleAddRow = () => {
              setFieldValue('ingredients', [...ingredients, { ingredient: '', quantity: '' }])
            }
            const handleAddRecipeSteps = () => {
              setFieldValue('recipeSteps', [...recipeSteps, { step: '' }])
            }

            return (
              <form className={classes.root} noValidate autoComplete='off' onKeyDown={onKeyDown} onSubmit={handleSubmit}>
                <div className={classes.formHead}>Recipe Form</div>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      required={true}
                      helperText={touched.recipeName ? errors.recipeName : ''}
                      error={touched.recipeName && errors.recipeName}
                      onBlur={handleBlur}
                      name='recipeName'
                      id='recipeName'
                      label='Recpie Name'
                      type='text'
                      onChange={handleChange}
                      className={classes.textField}
                      variant='outlined'
                    />
                    <TextField
                      required={true}
                      helperText={touched.recipeDescription ? errors.recipeDescription : ''}
                      error={touched.recipeDescription && errors.recipeDescription}
                      onBlur={handleBlur}
                      name='recipeDescription'
                      id='recipeDescription'
                      label='Recpie Description'
                      type='textArea'
                      multiline
                      onChange={handleChange}
                      className={classes.textField}
                      variant='outlined'
                    />
                    <div className={classes.formHead}>Add Ingredients</div>
                    {ingredients && ingredients.length
                      ? ingredients.map((row, rowIndex) => {
                          return (
                            <FormGroup>
                              <Grid container spacing={5} key={rowIndex}>
                                <Grid item xs={12} sm={12} md={6}>
                                  <TextField
                                    required={true}
                                    error={touched.ingredients?.[rowIndex]?.ingredient && Boolean(errors.ingredients?.[rowIndex]?.ingredient)}
                                    helperText={touched.ingredients?.[rowIndex]?.ingredient && errors.ingredients?.[rowIndex]?.ingredient}
                                    name={`ingredients[${rowIndex}].ingredient`}
                                    label='Item'
                                    type='text'
                                    select
                                    onChange={(e) => handleValueChange(e.target.value, rowIndex, 'ingredient')}
                                    className={classes.textField}
                                    variant='outlined'
                                  >
                                    {items.map((i) => {
                                      return <MenuItem value={i.id}>{i.itemName}</MenuItem>
                                    })}
                                  </TextField>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                  <TextField
                                    required={true}
                                    error={touched.ingredients?.[rowIndex]?.quantity && Boolean(errors.ingredients?.[rowIndex]?.quantity)}
                                    helperText={touched.ingredients?.[rowIndex]?.quantity && errors.ingredients?.[rowIndex]?.quantity}
                                    onBlur={handleBlur}
                                    name='quantity'
                                    label='Quantity'
                                    type='text'
                                    className={classes.textField}
                                    variant='outlined'
                                    onChange={(e) => handleValueChange(e.target.value, rowIndex, 'quantity')}
                                  />
                                </Grid>
                              </Grid>
                            </FormGroup>
                          )
                        })
                      : null}
                    <Button variant='contained' color='primary' onClick={handleAddRow} className={classes.button}>
                      Add More +
                    </Button>
                    <div className='recipe-steps'>
                      <div className={classes.formHead}>How To Make</div>
                      {recipeSteps && recipeSteps.length
                        ? recipeSteps.map((steps, stepIndex) => {
                            return (
                              <FormGroup>
                                <TextField
                                  helperText={touched.recipeSteps && errors.recipeSteps && errors.recipeSteps[stepIndex]?.step}
                                  error={touched.recipeSteps && errors.recipeSteps && errors.recipeSteps[stepIndex]?.step}
                                  className={classes.textField}
                                  variant='outlined'
                                  id={stepIndex}
                                  type='text'
                                  placeholder={`Step ${stepIndex + 1}`}
                                  onChange={(e) => handleRecipeStepsValueChange(e.target.value, stepIndex, `step`)}
                                />
                              </FormGroup>
                            )
                          })
                        : null}
                      <Button id='add-ingredients' variant='contained' color='primary' onClick={handleAddRecipeSteps} className={classes.button}>
                        Add More +
                      </Button>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      helperText={touched.recipeServings ? errors.recipeServings : ''}
                      error={touched.recipeServings && errors.recipeServings}
                      name='recipeServings'
                      id='recipeServings'
                      className={classes.textField}
                      variant='outlined'
                      label='Recipe Servings'
                      type='text'
                      onChange={handleChange}
                    />
                    <TextField
                      helperText={touched.prepTime ? errors.prepTime : ''}
                      error={touched.prepTime && errors.prepTime}
                      name='prepTime'
                      id='prepTime'
                      type='text'
                      className={classes.textField}
                      variant='outlined'
                      InputProps={{
                        endAdornment: <InputAdornment position='end'>Preparation Time</InputAdornment>,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                      onChange={handleChange}
                    />
                    <TextField
                      helperText={touched.cookTime ? errors.cookTime : ''}
                      error={touched.cookTime && errors.cookTime}
                      name='cookTime'
                      id='cookTime'
                      className={classes.textField}
                      variant='outlined'
                      InputProps={{
                        endAdornment: <InputAdornment position='end'>Cook Time</InputAdornment>,
                      }}
                      type='text'
                      onChange={handleChange}
                    />
                    <TextField
                      helperText={touched.totalCookTime ? errors.totalCookTime : ''}
                      error={touched.totalCookTime && errors.totalCookTime}
                      name='totalCookTime'
                      id='totalCookTime'
                      className={classes.textField}
                      variant='outlined'
                      InputProps={{
                        endAdornment: <InputAdornment position='end'>Total Cook Time</InputAdornment>,
                      }}
                      type='text'
                      onChange={handleChange}
                    />
                    <TextField
                      helperText={touched.difficultyLevel ? errors.difficultyLevel : ''}
                      error={touched.difficultyLevel && errors.difficultyLevel}
                      className={classes.textField}
                      variant='outlined'
                      select
                      name='difficultyLevel'
                      id='difficultyLevel'
                      label='Difficulty Level'
                      type='text'
                      placeholder={'Difficulty Level'}
                      onChange={handleChange}
                    >
                      <MenuItem value={'easy'}>Easy</MenuItem>
                      <MenuItem value={'medium'}>Medium</MenuItem>
                      <MenuItem value={'hard'}>Hard</MenuItem>
                    </TextField>
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
                <div style={{ paddingTop: '10px' }}>
                  <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    data-testid='Publish-btn'
                    style={{
                      width: '200px',
                      height: '3rem',
                      margin: '10% 40% 0 40%',
                    }}
                  >
                    Publish
                  </Button>
                </div>
              </form>
            )
          }}
        </Formik>
        {renderSnack}
      </div>
    </>
  )
}

export default RecipeForm
