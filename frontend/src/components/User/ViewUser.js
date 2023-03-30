import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import {
  Typography,
  TableContainer,
  TableRow,
  TableCell,
  Table,
  TableBody,
} from '@material-ui/core'
import http from '../../services/httpService'

const ViewUser = (props) => {
  const id = props.match.params.id

  const [user, setUser] = useState()
  const [spanColor, setSpanColor] = useState('')
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

  const useStyles = makeStyles((theme) => ({
    table: {
      minWidth: 50,
    },
    formHeader: {
      fontWeight: 'bold',
      fontSize: '1.5rem',
      padding: '10px',
      color: theme.palette.primary.main,
    },
  }))

  const classes = useStyles()
  useEffect(() => {
    http.get(`/users/${id}`).then((response) => {
      setUser(response.data)
      user?.status == 'active'
        ? setSpanColor('green')
        : user?.status == 'leave'
        ? setSpanColor('orange')
        : setSpanColor('red')
    })
  }, [])

  return (
    <div className={'View-container'}>
      {
        <div style={{ paddingTop: '4px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TableContainer>
                <Table
                  className={classes.table}
                  aria-label='customized table'
                >
                  <TableBody>
                    <div className={classes.formHeader}>
                      Personal Info
                    </div>
                    <StyledTableRow>
                      <StyledTableCell>
                        First Name
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        {user?.fName}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell>
                        Last Name
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        {user?.lName}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell>Username</StyledTableCell>
                      <StyledTableCell align='right'>
                        {user?.username}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell>Email</StyledTableCell>
                      <StyledTableCell align='right'>
                        {user?.email}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell>
                        Phone Number
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        {user?.phoneNumber}
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                  <TableBody>
                    <div className={classes.formHeader}>
                      Job Description
                    </div>
                    <StyledTableRow>
                      <StyledTableCell>
                        Contract Type
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        {user?.contractType}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell>
                        Designation
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        {user?.designation}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell>Salary</StyledTableCell>
                      <StyledTableCell align='right'>
                        {user?.salary}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell>
                        Joined At
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        {user?.createdDate &&
                          new Intl.DateTimeFormat().format(
                            new Date(user?.createdDate)
                          )}
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                  <TableBody>
                    <div className={classes.formHeader}>
                      Work Status
                    </div>
                    <StyledTableRow>
                      <StyledTableCell>Status</StyledTableCell>
                      <StyledTableCell align='right'>
                        <span style={{ color: spanColor }}>
                          {user?.status}
                        </span>
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell>
                        Allowed Working Hours
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        NA
                        {/* {user?.workingHourAllowed} */}
                      </StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <StyledTableCell>
                        Over Work Hours
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        NA
                        {/* {user?.overWorkHour} */}
                      </StyledTableCell>
                    </StyledTableRow>{' '}
                    <StyledTableRow>
                      <StyledTableCell>
                        Total Work Hours
                      </StyledTableCell>
                      <StyledTableCell align='right'>
                        NA
                        {/* {user?.totalHourWorked} */}
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} md={6}>
              <img
                style={{
                  borderRadius: '20px',
                  height: '300px',
                  width: '100%',
                }}
                src={user?.image}
              />
            </Grid>
          </Grid>
        </div>
      }
      <div style={{ paddingTop: '40px' }}>
        <div className={classes.formHeader}>Address</div>
        <Typography component='h2'>
          {`House Number ${user?.address?.house}, Street Number ${user?.address?.street}, State ${user?.address?.state}, City ${user?.address?.city}`}
        </Typography>
      </div>
    </div>
  )
}

export default ViewUser
