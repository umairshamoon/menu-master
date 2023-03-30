import React, { useEffect, useState } from 'react'
import http from '../../services/httpService'
import Typography from '@material-ui/core/Typography'
import {
  Delete,
  Edit,
  RemoveRedEyeOutlined,
} from '@mui/icons-material'
import {
  Box,
  Button,
  useTheme,
  Avatar,
  alpha,
} from '@material-ui/core'
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

const WorkersList = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const history = useHistory()
  const classes = useStyles()
  const [Chefs, setChefs] = useState([])

  const userType = JSON.parse(localStorage.getItem('user')).type
  useEffect(() => {
    http.post('/users/getWorkers').then((response) => {
      setChefs(response.data)
    })
  }, [])

  const handleEdit = (event, id) => {
    history.push(`/userEdit/${id}`)
  }
  const handleView = (event, id) => {
    history.push(`/userView/${id}`)
  }

  const handleDelete = (event, id) => {
    http.delete(`/users/${id}`).then((response) => {
      alert('User deleted')
      http.post('/users/getWorkers').then((response) => {
        setChefs(response.data)
      })
    })
  }

  const columns = [
    {
      field: 'email',
      headerName: 'Email',
      flex: 1.5,
      cellClassName: 'name-column--cell',
      headerAlign: 'center',
      align: 'left',
      headerClass: classes.headerCell,

      renderCell: (p) => {
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Avatar src={p?.row?.image} />
            <span style={{ marginLeft: '5px' }}>
              {p.row.email}
            </span>
          </div>
        )
      },
    },

    {
      field: 'username',
      headerName: 'Username',
      flex: 1,
      headerAlign: 'center',
      align: 'left',
      headerClass: classes.headerCell,
    },
    {
      field: 'designation',
      headerName: 'Designation',
      flex: 1,
      headerAlign: 'center',
      align: 'left',
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
        Workers
      </Typography>
      <div style={{ padding: '2px', marginBottom: '1.5rem' }}>
        <Button
          variant='contained'
          color='primary'
          data-testid='Add-btn'
          onClick={() => {
            history.push('/user/form')
          }}
        >
          + Add User
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
        {Chefs?.user?.length > 0 && (
          <DataGrid
            rows={Chefs.user}
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

export default WorkersList
