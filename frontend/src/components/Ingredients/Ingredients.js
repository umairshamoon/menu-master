import React, { useEffect, useState } from 'react'
import { alpha, makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import {
  Delete,
  Edit,
  RemoveRedEyeOutlined,
} from '@mui/icons-material'
import { tokens } from '../Themes'
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import http from '../../services/httpService'
import { useHistory } from 'react-router-dom'
import { Box } from '@mui/material'
import { Button, useTheme } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    padding: '10px',
    color: theme.palette.primary.main,
  },
}))
const Ingredients = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const history = useHistory()
  const classes = useStyles()
  const [inventory, setInventory] = useState([])

  const userType = JSON.parse(localStorage.getItem('user')).type
  useEffect(() => {
    http.get('/inventory/').then((response) => {
      setInventory(response.data)
    })
  }, [])

  const handleEdit = (event, id) => {
    history.push(`/editIngredient${id}`)
  }
  const handleView = (event, id) => {
    history.push(`/ingredientView${id}`)
  }
  const handleDelete = (event, id) => {
    http.delete(`/inventory/${id}`).then((response) => {
      alert('Item deleted')
      http.get('/inventory/').then((response) => {
        setInventory(response.data)
      })
    })
  }
  const columns = [
    {
      field: 'itemName',
      headerName: 'Item',
      flex: 1,
      cellClassName: 'name-column--cell',
      headerAlign: 'center',
      align: 'left',
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      flex: 1,
      headerAlign: 'center',
      align: 'left',
      renderCell: (p) => (
        <div>
          {`${p.row.units[0].quantity} ${p.row.units[0].unit}`}
        </div>
      ),
    },
    {
      field: 'addedBy',
      headerName: 'Added By',
      flex: 1,
      headerAlign: 'center',
      align: 'left',
      renderCell: (p) => {
        return <div>{p?.value?.username}</div>
      },
    },
    {
      field: 'label',
      headerName: 'Label',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (p) =>
        p.row.units[0].quantity == 0 ? (
          <span style={{ color: 'red' }}>Empty</span>
        ) : p.row.units[0].quantity < 8 ? (
          <span style={{ color: 'orange' }}>Low</span>
        ) : (
          <span style={{ color: 'green' }}>High</span>
        ),
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
          <Button onClick={(e) => handleEdit(e, p.id)}>
            <Edit color='warning' />
          </Button>
          <Button onClick={(e) => handleDelete(e, p.id)}>
            <Delete color='error' />
          </Button>
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
        Inventory
      </Typography>
      <div style={{ padding: '2px', marginBottom: '1.5rem' }}>
        <Button
          variant='contained'
          color='primary'
          data-testid='Add-btn'
          onClick={() => {
            history.push('/addIngredient')
          }}
        >
          + Add Item
        </Button>
      </div>
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
        {inventory.length > 0 && (
          <DataGrid
            rows={inventory}
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
        )}
      </Box>
    </>
  )
}

export default Ingredients
