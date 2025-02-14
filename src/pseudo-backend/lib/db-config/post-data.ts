export default {
  table: 'post-data',
  index: [
    { name: 'idIdx', prop: 'id', opt: { unique: true } },
    { name: 'userIdIdx', prop: 'userId' },
    { name: 'createdAtIdx', prop: 'createdAt' },
    { name: 'updatedAtidx', prop: 'updatedAt' },
  ],
};
