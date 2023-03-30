import React, { useEffect, useState } from 'react'
import { makeStyles, alpha } from '@material-ui/core/styles'
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import { useHistory } from 'react-router-dom'
import { tokens } from '../Themes'
import {
  Delete,
  Edit,
  RemoveRedEyeOutlined,
} from '@mui/icons-material'
import { Box } from '@mui/material'
import { Button, useTheme } from '@material-ui/core'
//
//
import Typography from '@material-ui/core/Typography'
import http from '../../services/httpService'

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    padding: '10px',
    color: theme.palette.primary.main,
  },
}))

const RecipesList = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const history = useHistory()
  const classes = useStyles()
  const [recipes, setRecipes] = useState([])
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [actionId, setActionId] = React.useState(null)
  const userType = JSON.parse(localStorage.getItem('user')).type
  useEffect(() => {
    http.get('/recipes/').then((res) => {
      setRecipes(res.data)
    })
  }, [])

  const handleEdit = (event, id) => {
    history.push(`/editRecipe${id}`)
  }
  const handleView = (event, id) => {
    history.push(`/recipeView${id}`)
  }
  const handleDelete = (event, id) => {
    http.delete(`/recipes/${id}`).then((res) => {
      alert('Recipe deleted')
      http.get('/recipes/').then((res) => {
        setRecipes(res.data)
        setAnchorEl(null)
      })
    })
  }
  const columns = [
    {
      field: 'recipeName',
      headerName: 'Recpie Name',
      flex: 1,
      cellClassName: 'name-column--cell',
      headerAlign: 'center',
      align: 'left',
    },
    {
      field: 'difficultyLevel',
      headerName: 'Difficulty Level',
      flex: 1,
      headerAlign: 'center',
      align: 'left',
    },

    {
      field: 'prepTime',
      headerName: 'Prep Time',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'totalCookTime',
      headerName: 'Total Cook Time',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },

    {
      field: 'recipeServings',
      headerName: 'Recipe Servings',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },

    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (p) => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <Button
            onClick={(e) => {
              handleView(e, p.id)
            }}
          >
            <RemoveRedEyeOutlined color='success' />
          </Button>
          {userType == 'chef' && (
            <>
              <Button onClick={(e) => handleEdit(e, p.id)}>
                <Edit color='warning' />
              </Button>
              <Button onClick={(e) => handleDelete(e, p.id)}>
                <Delete color='error' />
              </Button>
            </>
          )}
        </div>
      ),
    },
  ]

  return (
    <>
      <Typography
        className={classes.title}
        variant='h6'
        id='tableTitle'
        component='div'
      >
        Recipe
      </Typography>
      <Box
        m='4px 0 0 0'
        height='75vh'
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[400],
            color: 'white',
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: colors.blueAccent[400],
            color: 'white',
            fontWeight: 'bold',
          },
          [`& .${gridClasses.row}.even`]: {
            backgroundColor: theme.palette.grey[200],
            '&:hover, &.Mui-hovered': {
              backgroundColor: alpha(
                theme.palette.primary.main,
                0.4
              ),
              '@media (hover: none)': {
                backgroundColor: 'transparent',
              },
            },
            '&.Mui-selected': {
              backgroundColor: alpha(
                theme.palette.primary.main,
                0.4 + theme.palette.action.selectedOpacity
              ),
              '&:hover, &.Mui-hovered': {
                backgroundColor: alpha(
                  theme.palette.primary.main,
                  0.4 +
                    theme.palette.action.selectedOpacity +
                    theme.palette.action.hoverOpacity
                ),
                '@media (hover: none)': {
                  backgroundColor: alpha(
                    theme.palette.primary.main,
                    10 + theme.palette.action.selectedOpacity
                  ),
                },
              },
            },
          },
        }}
      >
        {recipes?.length > 0 ? (
          <DataGrid
            rows={recipes}
            columns={columns}
            showCellRightBorder={true}
            hideFooterSelectedRowCount
            getRowId={(row) => row.id}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0
                ? 'even'
                : 'odd'
            }
          />
        ) : (
          <Typography className={classes.title}>
            Please Add Some Recpies First
          </Typography>
        )}
      </Box>
    </>
  )
}

export default RecipesList
