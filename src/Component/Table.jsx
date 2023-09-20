// import { Tooltip } from '@mui/material';
// import { Box } from '@mui/system';
// import React from 'react';

// const Table = () => {
//     return (
//         <Box>
//               <MaterialReactTable
//   displayColumnDefOptions={{
//     'mrt-row-actions': {
//       muiTableHeadCellProps: {
//         align: 'center',
//       },
//       size: 100,
//     },
//   }}
//   columns={columns}
//   data={data}
//   // editingMode="modal"
//   enableEditing
//   enableRowSelection
//   positionToolbarAlertBanner="bottom"

//   renderRowActions={({ row, table }) => (
//     <Box sx={{ display: 'flex', gap: '1rem' }}>
//       <Tooltip arrow placement="left" title="Edit">
//         <IconButton onClick={() => handleUpdate(row)}>
//           <Edit />
//         </IconButton>

//       </Tooltip>
//       <Tooltip arrow placement="right" title="Delete">
//         <IconButton color="error" onClick={() => handleDeleteRow(row)}>
//           <Delete />
//         </IconButton>
//       </Tooltip>
//     </Box>
//   )}
//   renderTopToolbarCustomActions={({ row, table }) => (
//     <>
//       <Box
//         sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
//       >
//         <Button
//           color="primary"
//           onClick={handleExportData}
//           startIcon={<FileDownloadIcon />}
//           variant="contained"
//         >
//           Export All Data
//         </Button>
//         <Button
//           disabled={table.getPrePaginationRowModel().rows.length === 0}
//           onClick={() =>
//             handleExportRows(table.getPrePaginationRowModel().rows)
//           }
//           startIcon={<FileDownloadIcon />}
//           variant="contained"
//         >
//           Export All Rows
//         </Button>
//         <Button
//           disabled={table.getRowModel().rows.length === 0}
//           onClick={() => handleExportRows(table.getRowModel().rows)}
//           startIcon={<FileDownloadIcon />}
//           variant="contained"
//         >
//           Export Page Rows
//         </Button>
//         <Button
//           disabled={
//             !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
//           }
//           onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
//           startIcon={<FileDownloadIcon />}
//           variant="contained"
//         >
//           Export Selected Rows
//         </Button>
//       </Box>
//     </>
//   )}
// />
//         </Box>
//     );
// };

// export default Table;


// data.map((data) => {
//     // Split the date string into day, month, and year
//     // 13/03/2023 -----> DD/MM/YYYY
//     const [day, month, year] = data.date.split("/");
  
//     // Create a new Date object in the desired format (MM-DD-YYYY)
//     const date = new Date(`${month}-${day}-${year}`);
//       // 03-13-2023 ------> MM-DD-YYYY
  
//     data.date = new Date(date).toISOString();
//   });