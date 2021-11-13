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

// sweetalert
const btn = document.querySelector('#confirm-delete-user');
btn.addEventListener('click', () => {
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
      Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
    } else {
      return false;
    }
  });
});
