import React from "react"
import {CardPacksResponseType} from "../../../api/api"
import {useSelector} from "react-redux"
import {AppRootStateType} from "../../../redux/store"
import {ButtonSmall} from "../../common/buttonSmall/ButtonSmall"
import TableRow from "@material-ui/core/TableRow"
import TableContainer from "@material-ui/core/TableContainer"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableHead from "@material-ui/core/TableHead"
import TableBody from "@material-ui/core/TableBody"
import {TableSortLabel} from "@material-ui/core"
import {StyledTableCell, StyledTableRow} from "./PacksListTableMUIStyles"
import s from "./PacksListTableMUI.module.scss"

export const PacksListTableMUI = React.memo(() => {

    const packsListState = useSelector<AppRootStateType, Array<CardPacksResponseType>>(state => state.packsListReducer)

    return (
        <TableContainer component={Paper}>
            <Table
                // className={classes.table}
                aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell sortDirection="desc" align="right"> <TableSortLabel>Cards</TableSortLabel>
                        </StyledTableCell>
                        <StyledTableCell align="right">Last&nbsp;updated</StyledTableCell>
                        <StyledTableCell align="right">Created&nbsp;by</StyledTableCell>
                        <StyledTableCell align="right">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {packsListState.map((pack) => (
                        <StyledTableRow key={pack._id}>
                            <StyledTableCell component="th" scope="row">{pack.name}</StyledTableCell>
                            <StyledTableCell align="right">{pack.cardsCount}</StyledTableCell>
                            <StyledTableCell align="right">{pack.updated.slice(0, 10)}</StyledTableCell>
                            <StyledTableCell align="right">{pack.user_name}</StyledTableCell>
                            <StyledTableCell align="right">
                                <ButtonSmall text={"delete"} style={{backgroundColor: "#F1453D", color: "#ffffff"}}/>
                                <ButtonSmall text={"edit"} style={{backgroundColor: "#D7D8EF", color: "#21268F"}}/>
                                <ButtonSmall text={"learn"} style={{backgroundColor: "#D7D8EF", color: "#21268F"}}/>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
})