'use client';

import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import PropTypes from "prop-types";

function noop() {
  return undefined;
}

export function CustomPagination({ rowsPerPageOptions,  paginationList, totalRecords, onRowsPerPageChange, onPageChange }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions);
  // const currentPageItems =
  //   !totalRecords && rowsPerPage > 0
  //     ? items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  //     : items;


  const handlePageChange = (
    event,
    newPage,
  ) => {
    if (onPageChange) {
      onPageChange(newPage + 1);
    }
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event,
  ) => {
    const rowsPerPage = parseInt(event.target.value, 10);
    if (onRowsPerPageChange) {
      onRowsPerPageChange(
        1,
        rowsPerPage === -1 ? totalRecords : rowsPerPage,
      );
    }
    setRowsPerPage(rowsPerPage);
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={totalRecords}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      rowsPerPageOptions={paginationList}
    />
  );
}


CustomPagination.prototype = {
  pageNo: PropTypes.number,
  limit: PropTypes.number,
};
