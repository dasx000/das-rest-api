$(document).ready(function () {
  // DataTable
  $('#data-table1').DataTable();

  $('#students-table').DataTable({
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

// date
window.setTimeout('waktu()', 1000);
function waktu() {
  var waktu = new Date();
  setTimeout('waktu()', 1000);
  // date
  arrbulan = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  jam = waktu.getHours();
  menit = waktu.getMinutes();
  det = waktu.getSeconds();
  if (menit < 10) {
    menit = '0' + menit;
  }
  if (det < 10) {
    det = '0' + det;
  }
  result = jam + ':' + menit + ':' + det;
  // document.getElementById('detik').innerHTML = result;
  document.querySelector('.zzz').innerHTML = result;
}
