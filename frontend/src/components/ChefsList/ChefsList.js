import React, { useEffect, useState } from 'react'
import http from '../../services/httpService'
import Typography from '@material-ui/core/Typography'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import { Button, Menu, MenuItem } from '@material-ui/core'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  title: {
    paddingBottom: '15px',
  },
})

const ChefsList = () => {
  const classes = useStyles()
  const history = useHistory()
  const [Chefs, setChefs] = useState()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [actionId, setActionId] = React.useState(null)
  const userType = JSON.parse(localStorage.getItem('user')).type
  useEffect(() => {
    http
      .post('/users/getChefs', { type: 'chef' })
      .then((response) => {
        const chefsData = response.data

        setChefs(chefsData)
      })
  }, [])

  const handleEdit = (event, id) => {
    history.push(`/edit/chef/${id}`)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleClick = (event, id) => {
    setActionId(id)
    setAnchorEl(event.currentTarget)
  }
  const handleDelete = (event, id) => {
    http.delete(`/users/${id}`).then((response) => {
      alert('User deleted')
      http
        .post('/users/getChefs', { type: 'chef' })
        .then((response) => {
          setChefs(response.data)
        })
    })
  }

  return (
    <>
      <Typography
        className={classes.title}
        variant='h6'
        id='tableTitle'
        component='div'
      >
        Chefs
      </Typography>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          aria-label='simple table'
        >
          <TableHead>
            <TableRow>
              <TableCell align='center'>Email</TableCell>
              <TableCell align='center'>User Name</TableCell>
              <TableCell align='center'>Type</TableCell>
              {userType === 'chef' ? (
                <TableCell align='center'>Actions</TableCell>
              ) : (
                ''
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {Chefs?.user.map((row) => (
              <TableRow key={row.id}>
                <TableCell align='center'>{row.email}</TableCell>
                <TableCell align='center'>
                  {row.username}
                </TableCell>
                <TableCell align='center'>{row.type}</TableCell>
                {userType === 'chef' ? (
                  <TableCell align='center'>
                    <Button
                      onClick={(event) =>
                        handleClick(event, row.id)
                      }
                    >
                      Actions
                    </Button>
                  </TableCell>
                ) : (
                  ''
                )}
              </TableRow>
            ))}
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={(event) => handleEdit(event, actionId)}
                style={{ cursor: 'pointer' }}
              >
                Edit
              </MenuItem>
              <MenuItem
                onClick={(event) =>
                  handleDelete(event, actionId)
                }
                style={{ cursor: 'pointer' }}
              >
                Delete
              </MenuItem>
            </Menu>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ChefsList
