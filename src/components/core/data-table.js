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
  onDeselectAll,
  onDeselectOne,
  onSelectOne,
  onSelectAll,
  rows,
  selectable,
  selected,
  uniqueRowId,

  isPagination,
  totalRecords,
  rowsPerPage,
  onRowsPerPageChange,
  onPageChange,
  paginationList = [5, 10, 25, 50, 100, 200],
  rowsPerPageOptions = 5,

  ...props
}) {
  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  return (
    <TableContainer>
      <Table {...props}>
        <TableHead sx={{ ...(hideHead && { visibility: 'collapse', '--TableCell-borderWidth': 0 }) }}>
          <TableRow>
            {selectable ? (
              <TableCell padding="checkbox" sx={{ width: '40px', minWidth: '40px', maxWidth: '40px' }}>
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (selectedAll) {
                      onDeselectAll?.(event);
                    } else {
                      onSelectAll?.(event);
                    }
                  }}
                />
              </TableCell>
            ) : null}
            {columns.map((column) => (
              <TableCell
                key={column.name}
                sx={{
                  width: column.width,
                  minWidth: column.width,
                  maxWidth: column.width,
                  ...(column.align && { textAlign: column.align }),
                }}
              >
                {column.hideName ? null : column.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => {
            const rowId = row.id ? row.id : uniqueRowId?.(row);
            const rowSelected = rowId ? selected?.has(rowId) : false;

            return (
              <TableRow
                hover={hover}
                key={rowId ?? index}
                selected={rowSelected}
                {...(onClick && {
                  onClick: (event) => {
                    onClick(event, row);
                  },
                })}
                sx={{ ...(onClick && { cursor: 'pointer' }) }}
              >
                {selectable ? (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={rowId ? rowSelected : false}
                      onChange={(event) => {
                        if (rowSelected) {
                          onDeselectOne?.(event, row);
                        } else {
                          onSelectOne?.(event, row);
                        }
                      }}
                      onClick={(event) => {
                        if (onClick) {
                          event.stopPropagation();
                        }
                      }}
                    />
                  </TableCell>
                ) : null}
                {columns.map((column) => (
                  <TableCell key={column.name} sx={{ ...(column.align && { textAlign: column.align }) }}>
                    {column.formatter ? column.formatter(row, index) : column.field ? row[column.field] : null}
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
          paginationList={paginationList}
          totalRecords={totalRecords}
          onRowsPerPageChange={onRowsPerPageChange}
          onPageChange={onPageChange}
        />
      )}

    </TableContainer>
  );
}
