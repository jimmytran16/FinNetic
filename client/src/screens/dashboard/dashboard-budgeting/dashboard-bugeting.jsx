import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import BoxContainer from '../../../components/BoxContainer'
import API from '../../../api/budget.api'

const DashboardBudgetingPage = () => {

  const [data, setData] = useState([])
  const [options, setOptions] = useState([])

  useEffect(() => {
    // API.getBudgetBreakdown()
    //   .then(response => {
    //     setData(response.data.data.data)
    //     setOptions(response.data.data.options)
    //   })
    //   .catch(err => console.log(err))
  }, [])

  return (
    <>
      {/* <h3 style={{ textAlign: 'center' }}>Budgetting</h3>
      <BoxContainer>
        <h6>
          Budgeting -- Developing
        </h6>
        <CheckBox label={'Food'} />
        <StackedBarChart data={data} options={options} />
      </BoxContainer> */}
    </>
  )
}

// Testing stacked bar chart
// const StackedBarChart = ({ data, options }) => {
//   return (
//     <>
//       <Bar data={data} options={options} />
//     </>
//   )
// }



// a reusable component for the category checkbox
// const CheckBox = ({ label }) => {
//   return (
//     <div style={{ backgroundColor:'lightgrey', borderRadius:'5px', display: 'inline-block', padding:'5px 8px' }}>
//       <input style={{ height:15, width:15, verticalAlign:'middle' }} type="checkbox" />
//       <label style={{ margin: '0px 5px', verticalAlign:'middle' }}>{label}</label>
//     </div>
//   )
// }

export default DashboardBudgetingPage;