'use client';

import { Divider, TableContainer } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { CustomPagination } from './custom-pagination';

export function DataTable({
  columns,
  hideHead,
  hover,
  onClick,
  rows,
  selectable,
  selected,
  uniqueRowId,
  selectionMode,

  isPagination,
  pageNo,
  totalRecords,
  rowsPerPage,
  paginationList = [5, 10, 25, 50, 100, 200],
  rowsPerPageOptions = 5,
  onRowsPerPageChange,
  onPageChange,
  onSelection,

  ...props
}) {

  const handleRowSelection = (rowId, row, isSelected) => {
    if (selectionMode === "single") {
      const newSelected = isSelected ? new Set() : new Set([rowId]);
      onSelection?.(Array.from(newSelected).map((id) => rows.find((r) => r.id === id)));
    } else if (selectionMode === "multiple") {
      const newSelected = new Set(selected);
      if (isSelected) {
        newSelected.delete(rowId);
      } else {
        newSelected.add(rowId);
      }
      onSelection?.(Array.from(newSelected).map((id) => rows.find((r) => r.id === id)));
    }
  };

  const handleSelectAll = (event) => {
    const newSelected = event.target.checked ? new Set(rows.map((row) => row.id)) : new Set();
    onSelection?.(Array.from(newSelected).map((id) => rows.find((r) => r.id === id)));
  };

  const selectedSome = selected.size > 0 && selected.size < rows.length;
  const selectedAll = rows.length > 0 && selected.size === rows.length;

  return (
    <TableContainer>
      <Table {...props}>
        <TableHead sx={{ ...(hideHead && { visibility: 'collapse', '--TableCell-borderWidth': 0 }) }}>
          <TableRow>
            {selectionMode !== "none" && (
              <TableCell padding="checkbox" sx={{ width: "40px" }}>
                {selectionMode === "multiple" && (
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={handleSelectAll}
                  />
                )}
              </TableCell>
            )}
            {columns.map((column) => (
              <TableCell key={column.name} sx={{ width: column.width, textAlign: column.align }}>
                {column.hideName ? null : column.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            const rowId = row.id ? row.id : uniqueRowId?.(row);
            const isSelected = selected.has(rowId);

            return (
              <TableRow
                key={rowId ?? index}
                hover={hover}
                selected={isSelected}
                onClick={
                  onClick
                    ? (event) => onClick(event, row)
                    : undefined
                }
                sx={{ cursor: onClick ? "pointer" : "default" }}
              >
                {selectionMode !== "none" && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => handleRowSelection(rowId, row, isSelected)}
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell key={column.name}>
                    {column.formatter ? column.formatter(row, index) : row[column.field]}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Divider />
      {isPagination && (
        <CustomPagination
          rowsPerPageOptions={rowsPerPageOptions}
          pageNo={pageNo}
          paginationList={paginationList}
          totalRecords={totalRecords}
          onRowsPerPageChange={onRowsPerPageChange}
          onPageChange={onPageChange}
        />
      )}

    </TableContainer>
  );
}
