const customers = [
  {
    customer_id: 1,
    name: "Rook Welson",
  },
  {
    customer_id: 7,
    name: "James Bond",
  },
  {
    customer_id: 21,
    name: "Melvin Khan",
  },
  {
    customer_id: 301,
    name: "Roboute Guilliman",
  },
];

const transaction = [
  {
    transaction_id: 1,
    customer_id: 7,
    amount: 120,
    date: "08/01/2022",
  },
  {
    transaction_id: 2,
    customer_id: 301,
    amount: 115,
    date: "08/15/2022",
  },
  {
    transaction_id: 3,
    customer_id: 21,
    amount: 120,
    date: "08/21/2022",
  },
  {
    transaction_id: 4,
    customer_id: 1,
    amount: 322,
    date: "08/26/2022",
  },
  {
    transaction_id: 5,
    customer_id: 6,
    amount: 1016,
    date: "09/01/2022",
  },
  {
    transaction_id: 6,
    customer_id: 301,
    amount: 181,
    date: "09/02/2022",
  },
  {
    transaction_id: 7,
    customer_id: 7,
    amount: 13,
    date: "09/18/2022",
  },
  {
    transaction_id: 8,
    customer_id: 301,
    amount: 1097,
    date: "10/05/2022",
  },
  {
    transaction_id: 9,
    customer_id: 210,
    amount: 97,
    date: "11/05/2022",
  },
  {
    transaction_id: 10,
    customer_id: 1,
    amount: 1049,
    date: "10/25/2022",
  },
  {
    transaction_id: 11,
    customer_id: 1,
    amount: 583,
    date: "10/27/2022",
  },
];

export const getTransaction = () => {
  return transaction;
};

export const getCustomers = () => {
  return customers;
};

export const getRewards = () => {};
export const getCustomerRewards = (id) => {};

export const getCustomerName = (id) => {};
