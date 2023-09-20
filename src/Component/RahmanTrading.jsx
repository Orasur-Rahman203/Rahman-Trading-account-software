import React, { useEffect, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { Box, Button, Tooltip, IconButton, TextField, Grid, } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { ExportToCsv } from 'export-to-csv'; //or use your library of choice here
import { useState } from 'react';
import { db } from "../firebase";
import { uid } from "uid";
// import { useEffect, useState } from 'react';
import { onValue, update } from "firebase/database";
import { set, ref, get, query, orderByChild, startAt, endAt } from "firebase/database";
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


const Example = () => {
  //real time firebase Firebase part
  const [todo, setTodo] = useState("");
  const [todo1, setTodo1] = useState(0);
  const [todo2, setTodo2] = useState("");
  const [todo3, setTodo3] = useState("");
  const [todo4, setTodo4] = useState(0);
  const [todo5, setTodo5] = useState("");
  const [todo7, setTodo7] = useState('');
  const [data, setData] = useState([]);
  const [remark, setRemark] = useState('');
  const [total, setTotal] = useState(0);
  const [previous, setPrevious] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUuid, setTempUuid] = useState("");
  // const [tableValue, setTableValue]=useState(false);
  const [starting, setStarting] = useState('');
  const [ending, setEnding] = useState('');
  const [starting2, setStarting2] = useState('');
  const [ending2, setEnding2] = useState('');
  // const [totalBalance, setTotalBalance]=useState(0);
  const [open, setOpen] = useState(false);


  const handleTodoChange = (e) => {
    setTodo(e.target.value);
  };
  const handleTodoChange1 = (e) => {
    setTodo1(e.target.value);
  };
  const handleTodoChange2 = (e) => {
    setTodo2(e.target.value);
  };
  const handleTodoChange3 = (e) => {
    setTodo3(e.target.value);
  };
  const handleTodoChange4 = (e) => {
    setTodo4(e.target.value);
  };
  const handleTodoChange5 = (e) => {
    setTodo5(e.target.value);
  };
  const handleTodoChange7 = (e) => {
    setTodo7(e.target.value);
  };
  const handleRemarkChange = (e) => {
    setRemark(e.target.value);
  };


  const si = data.length + 1;
  let Balance = parseInt(todo1) - parseInt(todo4);


  const previousBalance = () => {

    if (typeof (previous) == "string" || typeof (Balance) == "string") {
      if (typeof (Balance) == "string") {
        const withOutFirstAndLastEle = Balance.slice(1, -1);
        Balance = parseInt(withOutFirstAndLastEle);
        // console.log('Balance --', Balance);
        // console.log('previous balance', previous);
      }
      let pre = previous;
      if (typeof (previous) == "string") {
        const withoutFirstAndLast = previous.slice(1, -1);
        pre = parseInt(withoutFirstAndLast);
      }
      // const withoutFirstAndLast = previous.slice(1, -1);
      // const pre=parseInt(withoutFirstAndLast);
      let totalNum = total;
      if (typeof (total) == 'string') {
        const totalFromState = total.slice(1, -1);
        // console.log(totalFromState);
        totalNum = parseInt(totalFromState);
      }

      console.log('Pre--Before Total sum', pre, Balance, totalNum);
      // console.log(totalTal);
      const Total = totalNum + Balance + pre;
      // console.log('Previous balance nagetive', Total);
      // if(Total < 0){
      //   let result = Total.toString().replaceAll("-","(").concat(")");
      //   // console.log(typeof(result));
      //  const Total=result;
      //   set(ref(db, 'total_balance'), {
      //     Total
      //   });
      // }else{
      set(ref(db, 'total_balance'), {
        Total
      });
      // }
    }
    else {
      // console.log('Pre--else section', previous, Balance, total);

      let Total = total + Balance - previous;
      // console.log('Previous balance positive');
      // if(Total < 0){
      //   let result = Total.toString().replaceAll("-","(").concat(")");
      //   // console.log(typeof(result));
      //   Total=result;
      //   set(ref(db, 'total_balance'), {
      //     Total
      //   });
      // }else{
      set(ref(db, 'total_balance'), {
        Total
      });
      // }
    }
  }
  // console.log(JSON.stringify(data));
  // const previousBalance=()=>{
  //   let Total=total+Balance-previous;
  //   set(ref(db, 'total_balance'), {
  //     Total
  //   });
  // }


  const totalBalance = () => {
    // console.log(total, Balance);
    let Total;
    Total = total + Balance;
    set(ref(db, 'total_balance'), {
      Total
    });
  }


  //read section
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setData([]);
      const datas = snapshot.val();
      if (datas !== null) {
        Object.values(datas.users).map((todo) => {
          setData((oldArray) => [...oldArray, todo]);
        });
      }
      setTotal(datas.total_balance.Total);
    })
  }, [total])



  const writeToDatabase = () => {
    const date = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "2-digit",
      year: "numeric"
    });
    // console.log('new Date() ----', new Date());
    // console.log('date---', date);
    totalBalance();
    if (Balance < 0) {
      let result = Balance.toString().replaceAll("-", "(").concat(")");
      // console.log(typeof(result));
      Balance = result;
    }
    const uuid = uid();
    set(ref(db, `users/ +${uuid}`), {
      si,
      uuid,
      date,
      todo,
      todo1,
      todo2,
      todo3,
      todo4,
      todo5,
      remark,
      Balance,
      todo7,
      approve: false
    });
    setTodo("")
    setTodo1(0)
    setTodo2("")
    setTodo3("")
    setTodo4(0)
    setTodo5("")
    setTodo7("")
    setRemark("")
  };


  const handleApproved = (row) => {

    update(ref(db, `users/ +${row.original.uuid}`), {
      approve: true
    });
  }


  //update section here
  const handleUpdate = (row) => {
    setIsEdit(true);
    setTempUuid(row.original.uuid);
    setTodo(row.original.todo);
    setTodo1(row.original.todo1);
    setTodo2(row.original.todo2);
    setTodo3(row.original.todo3);
    setTodo4(row.original.todo4);
    setTodo5(row.original.todo5);
    setTodo7(row.original.todo7);
    setRemark(row.original.remark);
    setPrevious(row.original.Balance);
    // setBalance(row.original.Balance);
  };


  const updateToDatabase = () => {
    previousBalance();
    if (Balance < 0) {
      let result = Balance.toString().replaceAll("-", "(").concat(")");
      // console.log(typeof(result));
      Balance = result;
    }
    update(ref(db, `users/ +${tempUuid}`), {
      todo,
      todo1,
      todo2,
      todo3,
      todo4,
      todo5,
      todo7,
      remark,
      Balance,
      uuid: tempUuid,
    });
    setTodo("");
    setTodo1(0);
    setTodo2("");
    setTodo3("");
    setTodo4(0);
    setTodo5("");
    setTodo7("");
    setRemark("");
    setIsEdit(false)
  }

  const column = [
    { title: "SI", field: "si", },
    { title: "Date", field: "date", },
    { title: "Credit Particular", field: "todo" },
    { title: "Credit Amount", field: 'todo1', type: "numeric" },
    { title: "Depositer", field: 'todo2' },
    { title: "Credit notes", field: 'todo7' },
    { title: "Debit Particular", field: 'todo3' },
    { title: "Debit Amount", field: 'todo4', type: "numeric" },
    { title: "Receiver", field: 'todo5' },
    { title: "Debit notes", field: 'remark' },
    { title: "Balance of Day", field: 'Balance' },
  ]

  // const column2 = [
  //   { title: "Credit Total", field: 'c_total', type: "numeric"},
  //   { title: "Debit Total", field: 'd_total', type: "numeric"}
  // ]
  //Query operation from here
  // const handleReportClick = () => {
  //   var userInfo = [];

  //   const que = query(ref(db, "users"), orderByChild("si"), startAt(parseInt(starting2)), endAt(parseInt(ending2)));
  //   get(que)
  //     .then((snapshot) => {
  //       snapshot.forEach(childSnapshot => {
  //         userInfo.push(childSnapshot.val());
  //       })
  //       PdfFileGenate(userInfo);
  //       // console.log(userInfo);
  //     })
  //     .catch((error) => {
  //       console.error("Error retrieving data:", error);
  //     })
  //   setStarting2('');
  //   setEnding2('');
  // }

  const handleReportClick=()=>{
    // console.log(starting);
    // console.log(ending);
  var filteredData=[];
  const [day, month, year] =starting.split("/");
  const startDate = new Date(`${month}-${day}-${year}`);
  const [day2, month2, year2] = ending.split("/");
  const endDate = new Date(`${month2}-${day2}-${year2}`);
  
  
  filteredData = data.filter((item) => {
  const [day, month, year] = item.date.split("/");
  const itemDate = new Date(`${month}-${day}-${year}`);
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  
  return itemDate >= startDateObj && itemDate <= endDateObj;
  });
  PdfFileGenate(filteredData);
  setStarting2('');
  setEnding2('');
  }


  //pdf section 
  const PdfFileGenate = (userInfo) => {
    userInfo.sort(function(a, b) {
      // return a.si-b.si;
      var keyA = a.si
       var keyB = b.si
      // Compare the 2 dates
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    })
    let c_total=0;
    let d_total=0;
    let total_Balance=0;
    userInfo.map((c)=> { 
      c_total=c_total+(parseInt(c.todo1))
      d_total=d_total+(parseInt(c.todo4))
      // total_Balance=total_Balance+(parseInt(c.Balance))
    })
    total_Balance=c_total - d_total;
    // console.log("result-----", total_Balance);

    if(total_Balance < 0){
      let result = total_Balance.toString().replaceAll("-", "(").concat(")");
      // console.log("result-----", result);
      total_Balance=result;
    }

    userInfo.push({"todo1":c_total, "todo4":d_total, "Balance":total_Balance})

    // const date = new Date().toString().slice(3, 16);
    const doc = new jsPDF('landscape')
    doc.text("Rahman trading account information", 20, 10)
    doc.autoTable({
      theme: "grid",
      columns: column.map(col => ({ ...col, dataKey: col.field })),
      body: userInfo,
      horizontalPageBreak: false,
      // body: studentData
    })
    // doc.autoTable({
    //   // theme: "grid",
    //   columns: column2.map(col => ({ ...col, dataKey: col.field })),
    //   body: totalArray,
    //   horizontalPageBreak: false,
    //   // body: studentData
    // })
    doc.save('Rahman trading')
  }

  const handleApprovedAll = (row) => {
    row.map(item => {
      console.log('item', item.original.approve);
      update(ref(db, `users/ +${item.original.uuid}`), {
        approve: true,
      });
    })
  }



  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const columnAll = useMemo(
    () => [
      {
        accessorFn: (row) => row.si,
        id: "si",
        header: 'SI',
        sortDescFirst: true,
        size: 20,
      },
      {
        accessorFn: (row) => row.date,
        id: "date",
        header: 'Date',
        size: 80,
      },
      {
        accessorFn: (row) => row.todo,
        id: "CreditParticular",
        header: 'Credit Particular',
        size: 100,
      },
      {
        accessorFn: (row) => row.todo1,
        id: "CreditAmount",
        header: 'Credit Amount',
        size: 100,
      },
      {
        accessorFn: (row) => row.todo2,
        id: "depositer",
        header: 'Depositer',
        size: 100,
      },
      {
        accessorFn: (row) => row.todo7,
        id: "notes",
        header: 'Credit Notes',
        size: 100,
      },
      {
        accessorFn: (row) => row.todo3,
        id: "debitParticular",
        header: 'Debit Particular',
        size: 100,
      },
      {
        accessorFn: (row) => row.todo4,
        id: "Debitamount",
        header: 'Debit Amount',
        size: 100,
      },
      {
        accessorFn: (row) => row.todo5,
        id: "reciever",
        header: 'Reciever',
        size: 100,
      },
      {
        accessorFn: (row) => (row.remark),
        id: "remark",
        header: 'Debit notes',
        size: 100,
      },
      {
        accessorFn: (row) => row.Balance,
        id: "balanceOfDay",
        header: 'Balance Of Day',
        size: 100,
      },
      {
        accessorFn: (row) => row.approve ? 'Approve' : 'Not Approve',
        id: "approve",
        header: 'Approve',
        size: 100,
      },
    ],
    []
  );


  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => row.si,
        id: "si",
        header: 'SI',
        sortDescFirst: true,
        size: 20,
      },
      {
        accessorFn: (row) => row.date,
        id: "date",
        header: 'Date',
        size: 80,
      },
      {
        accessorFn: (row) => row.todo,
        id: "CreditParticular",
        header: 'Credit Particular',
        size: 100,
      },
      {
        accessorFn: (row) => row.todo1,
        id: "CreditAmount",
        header: 'Credit Amount',
        size: 100,
      },
      {
        accessorFn: (row) => row.todo2,
        id: "depositer",
        header: 'Depositer',
        size: 100,
      },
      {
        accessorFn: (row) => row.todo7,
        id: "notes",
        header: 'Credit Notes',
        size: 100,
      },
      {
        accessorFn: (row) => row.todo3,
        id: "debitParticular",
        header: 'Debit Particular',
        size: 100,
      },
      {
        accessorFn: (row) => row.todo4,
        id: "Debitamount",
        header: 'Debit Amount',
        size: 100,
      },
      {
        accessorFn: (row) => row.todo5,
        id: "reciever",
        header: 'Reciever',
        size: 100,
      },
      {
        accessorFn: (row) => (row.remark),
        id: "remark",
        header: 'Debit notes',
        size: 100,
      },
      {
        accessorFn: (row) => row.Balance,
        id: "balanceOfDay",
        header: 'Balance Of Day',
        size: 100,
      },

      // {
      //   accessorFn: (row) =>( row.todo8),
      //   id: "totalBalance",
      //   header: 'Total Balance',
      //   size: 100,
      // },
    ],
    []
  );

  const csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.header),
  };

  const csvExporter = new ExportToCsv(csvOptions);


  const handleExportRows = (rows) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };

  const handleExportData = () => {
    csvExporter.generateCsv(data);
  };


  let TOTAL = total;
  // console.log(total);
  if (TOTAL < 0) {
    let TotalTalBalance = TOTAL.toString().replaceAll("-", "(").concat(")");
    TOTAL = TotalTalBalance;
    // console.log(TOTAL);
  }

  const dataRT = [];
  {
    data.map(da => {
      if (da.approve == false) {
        // console.log('approved info', da.si);
        dataRT.push(da);
        // console.log(dataRT.length);
      }
    })
  }


  return (
    <Box marginTop={4} padding={2}>
      <Typography variant='h2' color={'primary.dark'}>RAHMAN TRADING</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={7} marginTop={2}>
          <form>
            <Box
              display={'flex'}
              flexDirection={'column'}
              padding={4}
              borderRadius={3}
              boxShadow={'5px 5px 10px #ccc'}
              sx={{
                ":hover": {
                  boxShadow: '10px 10px 20px #ccc'
                }
              }}>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <h4 style={{ margin: 0 }}>CREDIT</h4>
                    <TextField margin='normal' label="Credit Particular" name='CreditParticular' type={'text'} value={todo} onChange={handleTodoChange} />
                    <TextField margin='normal' label="Credit Amount" name='CreditAmount' type={'number'} variant='outlined' value={todo1} onChange={handleTodoChange1} />
                    <TextField margin='normal' label="Depositer" name='depositer' type={'text'} variant='outlined' value={todo2} onChange={handleTodoChange2} />
                    <TextField margin='normal' label="Credit Notes" name='notes' type={'text'} variant='outlined' value={todo7} onChange={handleTodoChange7} />
                  </Box></Grid>
                <Grid item xs={12} sm={6}>
                  <Box>
                    <h4 style={{ margin: 0 }}>DEBIT</h4>
                    <TextField margin='normal' label="Debit Particular" name='debitParticular' type={'text'} variant='outlined' value={todo3} onChange={handleTodoChange3} />
                    <TextField margin='normal' label="Debit Amount" name='debitAmount' type={'number'} variant='outlined' value={todo4} onChange={handleTodoChange4} />
                    <TextField s margin='normal' label="Receiver" name='Receiver' type={'text'} variant='outlined' value={todo5} onChange={handleTodoChange5} />
                    <TextField margin='normal' label="Debit Notes" name='remark' type={'text'} value={remark} variant='outlined' onChange={handleRemarkChange} />
                  </Box></Grid>
              </Grid>
              {
                isEdit ?
                  <>
                    <Button sx={{ mx: 8, bgcolor: 'primary.dark', color: 'white' }} variant='contained' onClick={updateToDatabase}>Update Now</Button>
                    <Button variant="contained" sx={{ color: 'red', marginTop: 1, mx: 8 }} onClick={() => {
                      setIsEdit(false);
                      setTodo("");
                      setTodo1(0);
                      setTodo2("");
                      setTodo3("");
                      setTodo4(0);
                      setTodo5("");
                      setTodo7("");
                      setRemark("");
                      // setBalance("");
                    }}
                    >X</Button>
                  </>
                  :
                  <Button
                    sx={{ mx: 8, bgcolor: 'primary.dark', color: 'white', margin: 2 }}
                    variant="contained"
                    onClick={writeToDatabase}
                    disabled={(!todo) && (!todo3)}
                  >
                    Submit
                  </Button>
              }
            </Box>

          </form>
        </Grid>

        <Grid item xs={12} sm={5}>
          <form>
            <Box
              display={'flex'}
              // flexDirection={'column'}
              // alignItems="center"
              justifyContent={'center'}
              margin={2}
              // maxWidth={400}
              padding={3}
              borderRadius={3}
              boxShadow={'5px 5px 10px #ccc'}
              sx={{
                ":hover": {
                  boxShadow: '10px 10px 20px #ccc'
                }
              }}
            >
              <Grid container>
                <Grid item xs={12} md={6} >
                  <Box>
                    <h3 style={{ marginTop: 24 }}>Total Balance : {TOTAL} TK</h3>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} >
                  <Box>
                    <Button sx={{ margin: 2, bgcolor: "#23699A", fontSize: 16, color: 'white' }} variant="contained" onClick={handleOpen}>SEE ALL DATA</Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </form>
          <form>
            <Box
              display={'flex'}
              flexDirection={'column'}
              alignItems="center"
              justifyContent={'center'}
              margin={2}
              marginTop={2}
              // maxWidth={400}
              padding={2}
              borderRadius={3}
              boxShadow={'5px 5px 10px #ccc'}
              sx={{
                ":hover": {
                  boxShadow: '10px 10px 20px #ccc'
                }
              }}
            ><h4 style={{ margin: 2 }}>Search</h4>
              <Grid container sx={{
                display:'flex',
                  flexDirection:{sm:'column', md:"row"},
                  justifyContent:'center',
                  alignItems:'center'
                  }}>
                <Grid item sm={12} md={6}>
                  <Box>

                    <Typography sx={{ padding: 0 }}>From</Typography>
                    {/* //TODO */}
                    <TextField 
                    // margin='2'
                      type='date'
                      placeholder='Serial Number(si)' 
                      name='start'
                      value={starting2}
                      // value={starting}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      // inputProps={{
                      //   format: 'DD/MM/YYYY',
                      // }}

                      onChange={(e) => {
                        let date = e.target.value
                        // console.log("date picker ----", date);
                        let updatedDate = new Date(date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "2-digit",
                          year: "numeric"
                        });
                        // console.log("date ----updatedDate ----", date, updatedDate);
                        setStarting2(date)
                        setStarting(updatedDate)
                      }} />
                  </Box>
                </Grid>
                <Grid item sm={12} md={6}>
                  <Box>
                    <Typography sx={{ padding: 0 }}>To</Typography>
                    <TextField 
                    // margin='2'
                    placeholder='Serial Number(si)'
                      type='date'
                      name='end' value={ending2}
                      variant='outlined'
                      onChange={(e) => {
                        let date = e.target.value
                        // console.log("date picker ----", date);
                        let updatedDate = new Date(date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "2-digit",
                          year: "numeric"
                        });
                        // console.log("date ----updatedDate ----",date, updatedDate);
                        setEnding2(date)
                        setEnding(updatedDate)
                      }} />
                  </Box>
                </Grid>
              </Grid>

              <Button sx={{ marginTop: 3, bgcolor: 'primary.dark', color: 'white' }} variant="contained" onClick={handleReportClick}
              disabled={!starting2 || !ending2 }
              >STATEMENT</Button>
            </Box>
          </form>
        </Grid>
        {/* if(tableValue)
  console.log('tableValue'); */}


        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: '70%'}}>
            <MaterialReactTable
              displayColumnDefOptions={{
                'mrt-row-actions': {
                  muiTableHeadCellProps: {
                    align: 'center',
                  },
                  size: 100,
                },
              }}
              columns={columnAll}
              data={data}
              initialState={{ density: 'compact',
              sorting: [
                {
                  id: 'si',
                  desc: true,
                }] }}
              // defaultSortBy={{ field: 'si', order: 'desc' }}
              // defaultSortOrder="ase"
              enableRowSelection={false}
              // enableEditing
              positionToolbarAlertBanner="bottom"

            />
          </Box>
        </Modal>
</Grid>


      <Box>
      <MaterialReactTable
          displayColumnDefOptions={{
            'mrt-row-actions': {
              muiTableHeadCellProps: {
                align: 'center',
              },
              size: 100,
            },
          }}
          columns={columns}
          data={dataRT}
          initialState={{ density: 'compact',
          sorting: [
            {
              id: 'si',
              desc: true,
            }] }}
          // defaultSortBy={{ field: 'si', order: 'desc' }}
          // defaultSortOrder="ase"
          enableRowSelection={false}
          enableEditing
          positionToolbarAlertBanner="bottom"

          renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => handleUpdate(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Button variant='contained' sx={{ bgcolor: 'primary.dark', color: 'white' }} onClick={() => { handleApproved(row) }}>Approved</Button>
            </Box>
          )}
          renderTopToolbarCustomActions={({ row, table }) => (
            <>
              <Box
                sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
              >
                <Button
                  disabled={table.getPrePaginationRowModel().rows.length === 0}
                  sx={{ bgcolor: 'primary.dark', color: 'white' }}
                  onClick={() => handleApprovedAll(table.getPrePaginationRowModel().rows)}
                  variant="contained">
                  APPROVED ALL
                </Button>
              </Box>
            </>
          )}
        />
      </Box>

      
    </Box>
  );
};

export default Example;
