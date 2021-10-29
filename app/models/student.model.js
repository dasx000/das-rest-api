module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      no: Number,
      nama: String,
      npm: String,
      prodi: String,
      Tahun_masuk: String,
      status: String,
      semester: String,
      ipk: String,
      sks_lulus: String,
    },
    { timestamps: true }
  );

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  // menentukan nama tabel/collection
  const Student = mongoose.model('students', schema);
  return Student;
};
