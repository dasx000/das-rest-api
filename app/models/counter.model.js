module.exports = (mongoose) => {
  const schema = mongoose.Schema({
    count: {
      type: Number,
      required: true,
    },
    name: String,
  });

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  // menentukan nama tabel/collection
  const Counters = mongoose.model('counters', schema);
  return Counters;
};
