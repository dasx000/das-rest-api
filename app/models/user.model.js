module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      userName: String,
      fullName: String,
      email: String,
      password: String,
      role: Number,
      apikey: String,
      img: String,
    },
    { timestamps: true }
  );

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  // menentukan nama tabel/collection
  const Users = mongoose.model('users', schema);
  return Users;
};
