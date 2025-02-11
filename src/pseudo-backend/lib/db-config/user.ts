export default {
  table: 'user',
  index: [
    { name: 'idIdx', prop: 'id', opt: { unique: true } },
    { name: 'accountNameIdx', prop: 'accountName', opt: { unique: true } },
    { name: 'createdAtIdx', prop: 'createdAt' },
    { name: 'updatedAtidx', prop: 'updatedAt' },
  ],
};
