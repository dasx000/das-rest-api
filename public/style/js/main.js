// const $ = require('jquery');
// const dt = require('datatables.net')();

$(document).ready(function () {
  // DataTable
  $('#myTable').DataTable({
    ajax: '/api/students',
    columns: [{ result: 'no' }, { result: 'nama' }],
  });
});
