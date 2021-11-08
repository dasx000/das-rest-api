module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      writer: String,
      title: String,
      img: String,
      content: String,
      category: String,
    },
    { timestamps: true }
  );

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  // menentukan nama tabel/collection
  const Articles = mongoose.model('articles', schema);
  return Articles;
};
