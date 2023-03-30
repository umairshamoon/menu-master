import React, { useEffect, useState } from 'react'
import http from '../../services/httpService'
import Typography from '@material-ui/core/Typography'
import {
  CheckCircleOutline,
  RemoveRedEyeOutlined,
  CancelOutlined,
} from '@mui/icons-material'
import { Box, Button, useTheme, alpha } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import { tokens } from '../Themes'

const useStyles = makeStyles((themes) => ({
  table: {
    minWidth: 650,
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    padding: '10px',
    color: themes.palette.primary.main,
  },

  headerCell: {
    fontWeight: 'bold',
    color: 'blue',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#def2ff',
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  },
}))

const Order = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const history = useHistory()
  const classes = useStyles()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  const userType = JSON.parse(localStorage.getItem('user')).type

  useEffect(() => {
    http.get('/order').then((response) => {
      setOrders(response.data)
    })
  }, [loading])

  const handleComplete = (event, id) => {
    http
      .put(`/order/${id}`, { status: 'complete' })
      .then((response) => {
        // alert('Order Completed')
        history.push('/orders')

        setLoading(!loading)
      })
  }
  const handleCancel = (event, id) => {
    http
      .put(`/order/${id}`, { status: 'cancelled' })
      .then((response) => {
        // alert('Order Cancelled')
        history.push('/orders')
        setLoading(!loading)
      })
  }
  const handleView = (event, id) => {
    history.push(`/viewOrder/${id}`)
  }

  const columns = [
    {
      field: 'id',
      headerName: 'Order Id',
      flex: 1,
      headerAlign: 'center',
      align: 'left',
      headerClass: classes.headerCell,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (p) => {
        p.formattedValue == 'pending' ? (
          <span style={{ color: 'red' }}>ok</span>
        ) : (
          <span style={{ color: 'green' }}>
            {p.formattedValue}
          </span>
        )
      },
    },

    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      headerAlign: 'center',
      align: 'right',
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
            <RemoveRedEyeOutlined
              color='success'
              style={{ margin: ' 0 0.5rem' }}
            />
            View
          </Button>
          <Button onClick={(e) => handleComplete(e, p.id)}>
            <CheckCircleOutline
              color='success'
              style={{ margin: ' 0 0.5rem' }}
            />
            mark complete
          </Button>
          <Button onClick={(e) => handleCancel(e, p.id)}>
            <CancelOutlined
              color='error'
              style={{ margin: ' 0 0.5rem' }}
            />
            cancle
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
        Orders
      </Typography>
      <div style={{ padding: '2px', marginBottom: '1.5rem' }}>
        <Button
          variant='contained'
          color='primary'
          data-testid='Add-btn'
          onClick={() => {
            history.push('/addOrder')
          }}
        >
          + Add Order
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
        {orders.length > 0 && (
          <DataGrid
            rows={orders}
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

export default Order
