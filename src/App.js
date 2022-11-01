import { useEffect, useState } from "react";
import "./App.css";
import { getCustomers, getTransaction } from "./data/data";

function App() {
  const [data, setData] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [startMonth, setStartMonth] = useState(0);
  const [totalReward, setTotalReward] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState("");
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    //load data and customers
    const data = new Promise((fetchData) => fetchData(getTransaction()));
    const customerData = new Promise((fetchData) => fetchData(getCustomers()));

    data.then((res) => {
      setData(res);
    });
    customerData.then((res) => {
      setCustomers(res);
    });
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      let month = new Date(data[0]["date"]);
      //set start month
      setStartMonth(month.getMonth() + 1);
    }
  }, [data]);

  const customerSelect = (id) => {
    setCurrentCustomer(id);
    let threeMonthTransaction = [
      {
        amounts: [],
        rewards: 0,
      },
      {
        amounts: [],
        rewards: 0,
      },
      {
        amounts: [],
        rewards: 0,
      },
    ];

    //select a customer
    if (id !== "All Customers") {
      //filter to get data that is related to the customer
      const customerData = data.filter((item) => +item.customer_id === +id);

      for (let i = 0; i < customerData.length; i++) {
        let date = new Date(customerData[i]["date"]);
        let month = date.getMonth() + 1;

        if (
          month === startMonth ||
          month === startMonth + 1 ||
          month === startMonth + 2
        ) {
          //put the purchases in each month
          switch (month) {
            case startMonth:
              threeMonthTransaction[0]["amounts"].push(
                customerData[i]["amount"]
              );
              break;

            case startMonth + 1:
              threeMonthTransaction[1]["amounts"].push(
                customerData[i]["amount"]
              );
              break;

            case startMonth + 2:
              threeMonthTransaction[2]["amounts"].push(
                customerData[i]["amount"]
              );
              break;

            default:
              break;
          }

          //loop through each month to calculate reward points
          for (let i = 0; i < threeMonthTransaction.length; i++) {
            let monthlyReward = 0;

            //loop through the amounts in each month and sum it up
            for (
              let j = 0;
              j < threeMonthTransaction[i]["amounts"].length;
              j++
            ) {
              let cost = threeMonthTransaction[i]["amounts"][j];
              let reward = calculateRewardPoints(cost);

              monthlyReward += reward;
            }
            threeMonthTransaction[i]["rewards"] = monthlyReward;
          }

          //set it to state
          setTotalReward([...threeMonthTransaction]);
          setTransactionHistory([...customerData]);
        }
      }
    } else {
      //All customers
      for (let i = 0; i < data.length; i++) {
        let date = new Date(data[i]["date"]);
        let month = date.getMonth() + 1;

        if (
          month === startMonth ||
          month === startMonth + 1 ||
          month === startMonth + 2
        ) {
          //put the purchases in each month
          switch (month) {
            case startMonth:
              threeMonthTransaction[0]["amounts"].push(data[i]["amount"]);
              break;

            case startMonth + 1:
              threeMonthTransaction[1]["amounts"].push(data[i]["amount"]);
              break;

            case startMonth + 2:
              threeMonthTransaction[2]["amounts"].push(data[i]["amount"]);
              break;

            default:
              break;
          }

          //loop through each month to calculate reward points
          for (let i = 0; i < threeMonthTransaction.length; i++) {
            let monthlyReward = 0;

            //loop through the amounts in each month and sum it up
            for (
              let j = 0;
              j < threeMonthTransaction[i]["amounts"].length;
              j++
            ) {
              let cost = threeMonthTransaction[i]["amounts"][j];
              let reward = calculateRewardPoints(cost);

              monthlyReward += reward;
            }
            threeMonthTransaction[i]["rewards"] = monthlyReward;
          }

          //set it to state
          setTotalReward([...threeMonthTransaction]);
        }
      }
    }
  };

  const calculateRewardPoints = (price) => {
    if (price >= 50 && price < 100) {
      return price - 50;
    } else if (price > 100) {
      return (price - 100) * 2 + 50;
    }
    return 0;
  };

  return (
    <div>
      <h1>Customer Rewards</h1>
      <div>
        <select
          onChange={(e) => customerSelect(e.target.value)}
          value={currentCustomer}
        >
          <option value="" disabled>
            Select Customer
          </option>
          <option value="All Customers">All Customers</option>
          {customers.map((customer, i) => {
            return (
              <option key={i} value={customer.customer_id}>
                {customer.name.toUpperCase()}
              </option>
            );
          })}
        </select>
      </div>
      {totalReward.length > 0 && (
        <div>
          <div>first month: {totalReward[0]["rewards"]}</div>
          <div>second month: {totalReward[1]["rewards"]}</div>
          <div>thrid month: {totalReward[2]["rewards"]}</div>
          <div>
            total Reward:{" "}
            {totalReward[0]["rewards"] +
              totalReward[1]["rewards"] +
              totalReward[2]["rewards"]}
          </div>
        </div>
      )}

      <h3>Transaction History</h3>
      {transactionHistory.length > 0 && (
        <div>
          {transactionHistory.map((item, i) => (
            <div key={i}>
              <span>date: {item.date} </span>
              <span>amount: {item.amount} </span>
              <span>reward: {calculateRewardPoints(item.amount)} </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
