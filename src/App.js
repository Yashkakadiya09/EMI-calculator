import { useState } from "react";

function App() {
  const [loanData, setLoanData] = useState({
    loanamount: "",
    loanintrest: "",
    loanmonth: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoanData({
      ...loanData,
      [name]: value,
    });
  };
  const [data, setData] = useState([]);
  const handleClick = (e) => {
    e.preventDefault();
    let array = [];
   

    for (let i = 0; i < loanData?.loanmonth; i++) {
      const interestPerMonth = loanData?.loanintrest / 12 / 100;
      let loanCalculateAmount = 0;
      if (i === 0) {
        loanCalculateAmount = loanData?.loanamount;
      } else {
        loanCalculateAmount = array[i - 1].LoanAmountForNext;
      }

      const emiValue =
        (loanData?.loanamount * interestPerMonth) /
        (1 - Math.pow(1 + interestPerMonth, -loanData?.loanmonth));

      const InterestValue = interestPerMonth * loanCalculateAmount;

      const PrincipalRepayment = emiValue - InterestValue;

      const LoanAmountForNext = loanCalculateAmount - PrincipalRepayment;

      // loanamount = LoanAmountForNext;
      array.push({
        LoanAmount: loanCalculateAmount,
        emi: emiValue,
        intrest: InterestValue,
        PrincipalRepayment: PrincipalRepayment,
        LoanAmountForNext: LoanAmountForNext,
      });

      // setData([
      //   ...data,
      //   {
      //     LoanAmount: loanData?.loanamount,
      //     emi: emiValue,
      //     intrest: InterestValue,
      //     PrincipalRepayment: PrincipalRepayment,
      //     LoanAmountForNext: LoanAmountForNext,
      //   },
      // ]);
    }
    setData(array);
  };

  return (
    <>
      <div
        style={{
          margin: "2vw 10vw",
          border: "1px solid #cff4fc",
          padding: "2vw 5vw",
          borderRadius: "10px",
          boxShadow: "2px 2px 10px black",
          backgroundColor: "#f2f2f2",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "2vw",
          }}
        >
          <h1>
            <i className="ri-calculator-line"></i>Loan
            <span
              style={{
                color: "red",
              }}
            >
              EMI
            </span>
            Calculation
            <i className="ri-calculator-line"></i>
          </h1>
        </div>
        <div>
          <form
            className="form"
            onSubmit={(e) => handleClick(e)}
            style={{
              width: "100%",
              marginTop: "2vw",
              display: "flex",
              gap: "2vw",

              justifyContent: "center",
            }}
          >
            <div className="box">
              <h5>Loan Amount(₹)</h5>
              <input
                style={{
                  width: "100%",
                }}
                pattern="[0-9]*"
                type="text"
                name="loanamount"
                placeholder="0"
                value={loanData.loanamount}
                onChange={(e) => {
                  if (e.target.validity.valid) {
                    handleChange(e);
                  }
                }}
              />
            </div>
            <div className="box">
              <h5>Loan Intrest(%)</h5>
              <input
                style={{
                  width: "100%",
                }}
                pattern="[0-9]*"
                type="text"
                name="loanintrest"
                placeholder="0"
                value={loanData.loanintrest}
                onChange={(e) => {
                  if (e.target.validity.valid) {
                    handleChange(e);
                  }
                }}
              />
            </div>
            <div className="box">
              <h5>Loan Month</h5>
              <input
                style={{
                  width: "100%",
                }}
                name="loanmonth"
                pattern="[0-9]*"
                placeholder="0"
                value={loanData.loanmonth}
                onChange={(e) => {
                  if (e.target.validity.valid) {
                    handleChange(e);
                  }
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="box"
            >
              <button type="submit" className="btn btn-danger">
                Calculate
              </button>
            </div>
          </form>
        </div>
        {data.length > 0 ? (
          <div
            className="table"
            style={{
              marginTop: "2vw",
              border: "1px solid black",
              borderRadius: "10px",
              overflowX: "scroll",
              overflowY: "hidden",
            }}
          >
            <table className="table table-danger  table-striped">
              <thead>
                <tr>
                  <th scope="col">Month</th>
                  <th scope="col">Remaining Amount</th>
                  <th scope="col">Instalment</th>
                  <th scope="col">Intrest</th>
                  <th scope="col">Paid Principal</th>
                  <th scope="col">Remaining Balance</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((data, i) => {
                  return (
                    <tr>
                      <th scope="col">{i + 1}</th>
                      <th scope="col">{Math.round(data?.LoanAmount)} </th>
                      <th scope="col">{Math.round(data?.emi)}</th>
                      <th scope="col">{Math.round(data?.intrest)}</th>
                      <th scope="col">
                        {Math.round(data?.PrincipalRepayment)}
                      </th>
                      <th scope="col">{Math.round(data?.LoanAmountForNext)}</th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;
