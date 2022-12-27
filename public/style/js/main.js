$(document).ready(function () {
  // flash message

  let success_msg = $('#flash-data').data('sm');
  let error_msg = $('#flash-data').data('errormsg');
  let error = $('#flash-data').data('error');

  if (success_msg != '') {
    Swal.fire('Nice!', success_msg, 'success');
  }

  if (error_msg != '') {
    Swal.fire('Ups!', error_msg, 'warning');
  }

  if (error != '') {
    Swal.fire('Error!', error, 'error');
  }
  // DataTable
  $('#data-table1').DataTable();

  $('#students-table').DataTable({
    ajax: '/docs/students',
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

  // aler

  $('form#form-delete-data').on('submit', function (event) {
    event.preventDefault(); // Stop normal form submitting
    // Then include your code for showing the alert

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        document.querySelector('form#form-delete-data').submit();
        // Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
      }
    });
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
