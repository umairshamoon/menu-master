import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import './RecipeView.scss'
import {
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TableContainer,
  TableRow,
  TableCell,
  Table,
  TableBody,
} from '@material-ui/core'
import http from '../../services/httpService'
import RelatedRecipesCard from '../SharedComponents/RelatedRecipesCard/RelatedRecipesCard'

const RecipeView = (props) => {
  const id = props.match.params.id
  const [viewRecipe, setViewRecipe] = useState()
  const [allRecipes, setAllRecipes] = useState()
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell)

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow)

  const useStyles = makeStyles({
    table: {
      minWidth: 50,
    },
  })

  const classes = useStyles()
  useEffect(() => {
    http.get(`/recipes/${id}`).then((res) => {
      setViewRecipe(res.data)
    })
  }, [])

  useEffect(() => {
    http.get(`/recipes/`).then((res) => {
      const recipesData = res.data
      setAllRecipes(recipesData)
    })
  }, [])

  const loggedInUserName = JSON.parse(
    localStorage.getItem('user')
  ).username

  return (
    <div className={'View-container'}>
      <Typography variant='h5' component='h2'>
        Welcome back, {loggedInUserName}
      </Typography>
      <div style={{ paddingTop: '40px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <img
              style={{
                borderRadius: '20px',
                height: '300px',
                width: '100%',
              }}
              src={viewRecipe?.images[0]?.url}
            />
            <div style={{ paddingTop: '10px' }}>
              <Typography variant='h8' component='h2'>
                {viewRecipe?.recipeName}
              </Typography>
              <Typography
                component='h2'
                style={{ paddingTop: '20px' }}
              >
                {viewRecipe?.recipeDescription}
              </Typography>
              <Typography
                variant='h10'
                component='h2'
                style={{ paddingTop: '40px' }}
              >
                Ingredients
              </Typography>
              <div style={{ paddingTop: '20px' }}>
                <Grid container spacing={3}>
                  {viewRecipe?.ingredients.map((item, index) => {
                    return (
                      <div key={index}>
                        <Grid item md={6}>
                          <Grid container>
                            <Grid md={6} spacing={3}>
                              <Typography
                                style={{ fontWeight: 'bold' }}
                                component='h2'
                              >
                                {item?.ingredient?.itemName}
                              </Typography>
                            </Grid>
                            <Grid item md={6} spacing={3}>
                              <Typography
                                component='h2'
                                style={{ marginLeft: '5rem' }}
                              >
                                {item?.quantity}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Divider />
                      </div>
                    )
                  })}
                </Grid>
              </div>
              <Typography
                component='h2'
                variant='h10'
                style={{ paddingTop: '40px' }}
              >
                How to make
              </Typography>
              <List
                component='nav'
                aria-label='main mailbox folders'
              >
                {viewRecipe?.recipeSteps.map((item, index) => {
                  return (
                    <>
                      <ListItem>
                        <ListItemIcon>{index + 1}</ListItemIcon>
                        <ListItemText primary={`${item.step}`} />
                      </ListItem>
                    </>
                  )
                })}
              </List>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <TableContainer>
              <Table
                className={classes.table}
                aria-label='customized table'
              >
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell>Recipe By</StyledTableCell>
                    <StyledTableCell align='right'>
                      {viewRecipe?.userName}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell>
                      Recipe Servings
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      {viewRecipe?.recipeServings}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell>Prep Time</StyledTableCell>
                    <StyledTableCell align='right'>
                      {viewRecipe?.prepTime}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell>Cook Time</StyledTableCell>
                    <StyledTableCell align='right'>
                      {viewRecipe?.cookTime}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell>
                      Total Cook Time
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      {viewRecipe?.totalCookTime}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell>
                      Difficulty Level
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      {viewRecipe?.difficultyLevel}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <div style={{ paddingTop: '40px' }}>
              <Typography variant={'h5'}>
                Related Recipes
              </Typography>
              {allRecipes?.map((item, index) => {
                if (index < 5)
                  return (
                    <RelatedRecipesCard
                      image={item?.images[0]?.url}
                      title={item?.recipeName}
                      by={item?.userName}
                    />
                  )
              })}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default RecipeView
