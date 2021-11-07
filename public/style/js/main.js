$(document).ready(function () {
  // DataTable
  $('#data-table1').DataTable();

  $('#example').DataTable({
    ajax: '/api/students',
    columns: [
      { data: 'nama' },
      { data: 'npm' },
      { data: 'prodi' },
      { data: 'Tahun_masuk' },
      { data: 'status' },
      { data: 'semester' },
      { data: 'ipk' },
      { data: 'sks_lulus' },
    ],
  });
});
