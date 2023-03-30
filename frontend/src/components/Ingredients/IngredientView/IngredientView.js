import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { Typography, TableContainer, TableRow, TableCell, Table, TableBody } from '@material-ui/core'
import http from '../../../services/httpService'

const IngredientView = (props) => {
  const id = props.match.params.id

  const [viewIngredient, setViewIngredient] = useState()
  let temp = 1
  viewIngredient && viewIngredient.units.map((u) => (temp = u.quantity * temp))
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
    header: {
      fontWeight: 'bold',
      fontSize: '1rem',
      padding: '10px',
      color: theme.palette.primary.main,
    },
  }))

  const classes = useStyles()
  useEffect(() => {
    http.get(`/inventory/${id}`).then((response) => {
      setViewIngredient(response.data)
    })
  }, [])

  return (
    <div className={'View-container'}>
      {viewIngredient?.itemName && (
        <>
          {' '}
          <div style={{ paddingTop: '40px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <img
                  style={{
                    borderRadius: '20px',
                    height: '300px',
                    width: '100%',
                  }}
                  src={viewIngredient?.images[0]?.url}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <div
                  style={{
                    display: 'flex',
                    paddingRight: '30px',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    className={classes.header}
                    variant='h10'
                    component='h5'
                    style={{
                      display: 'flex',
                      marginRight: '30px',
                    }}
                  >
                    Batch ID:
                  </Typography>
                  <Typography variant='h11'>{viewIngredient?.id}</Typography>
                </div>

                <TableContainer>
                  <Table className={classes.table} aria-label='customized table'>
                    <TableBody>
                      <StyledTableRow>
                        <StyledTableCell>Item Name</StyledTableCell>
                        <StyledTableCell align='right'>{viewIngredient?.itemName}</StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell>Quantity</StyledTableCell>
                        <StyledTableCell align='right'>{`${temp} ${viewIngredient?.units[viewIngredient?.units.length - 1].unit}`}</StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell>Added By</StyledTableCell>
                        <StyledTableCell align='right'>{viewIngredient?.addedBy?.username}</StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell>Added At</StyledTableCell>
                        <StyledTableCell align='right'>
                          {new Intl.DateTimeFormat('en-US').format(new Date(viewIngredient?.createdDate))}
                        </StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell>Last Updated By</StyledTableCell>
                        <StyledTableCell align='right'>{viewIngredient?.lastUpdatedBy?.username}</StyledTableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell>Last Updated At</StyledTableCell>
                        <StyledTableCell align='right'>
                          {new Intl.DateTimeFormat('en-US').format(new Date(viewIngredient?.lastUpdatedAt))}
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </div>
          <div style={{ paddingTop: '40px' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <div
                  style={{
                    display: 'flex',
                    paddingRight: '30px',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    className={classes.header}
                    variant='h7'
                    component='h3'
                    style={{
                      display: 'flex',
                      marginRight: '30px',
                    }}
                  >
                    Status
                  </Typography>
                </div>

                <TableContainer>
                  <Table className={classes.table} aria-label='customized table'>
                    <StyledTableCell>Unit</StyledTableCell>
                    <StyledTableCell>Quantity</StyledTableCell>
                    <StyledTableCell>Expire Date</StyledTableCell>
                    <StyledTableCell>Expire Date After open</StyledTableCell>
                    <StyledTableCell>Is Opened</StyledTableCell>
                    <TableBody>
                      {viewIngredient.units.map((u) => {
                        return (
                          <StyledTableRow>
                            <StyledTableCell>{u.unit}</StyledTableCell>
                            <StyledTableCell>{u.quantity}</StyledTableCell>
                            <StyledTableCell>{u.expireDate ? new Intl.DateTimeFormat('en-US').format(new Date(u.expireDate)) : 'NA'}</StyledTableCell>
                            <StyledTableCell>{u.days ? u.days : 'NA'}</StyledTableCell>
                            <StyledTableCell>
                              {u.isOpened ? <span style={{ color: 'red' }}>YES</span> : <span style={{ color: 'green' }}>NO</span>}
                            </StyledTableCell>
                          </StyledTableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </div>
        </>
      )}
      <div style={{ paddingTop: '40px' }}>
        <Typography
          className={classes.header}
          // variant='h8'
          // component='h2'
        >
          Description
        </Typography>
        <Typography component='h2'>{viewIngredient?.description}</Typography>
      </div>
    </div>
  )
}

export default IngredientView
