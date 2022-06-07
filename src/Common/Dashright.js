import React, { useEffect, useState } from 'react'
import DonutChart from "react-donut-chart";
import lock from '../Assets/images/lock.png';
import contact from '../Assets/images/contact.png';
import axios from 'axios';
import Dashboard from './Dashboard';

function Dashright() {
  const [userdata, setuserdata] = useState([{ label: "", value: "" }]);
  useEffect(() => {
    const result = async () => { axios.get("http://localhost:8001/reactDonutChartdata").then(res => setuserdata(res.data)); }
    result();
    localStorage.setItem("dashboard page", 1);
  }, []);
  const reactDonutChartBackgroundColor = [
    "#CA9C31",
    "#854095",
    "#E37E06",
    "#1170CB",
    "#D9B648"
  ];
  const reactDonutChartInnerRadius = 0.5;
  const reactDonutChartSelectedOffset = 0.04;
  let reactDonutChartStrokeColor = "#000";
var title = "Dashboard"
  return (
    <Dashboard title={title}>
      <div className='d-flex justify-content-between'>
        <div className='main-chart'>
          <div className='chart-one d-flex align-items-center justify-content-between'>
            <div className='d-flex align-items-center'>  <div className='chart-little-img chart-little-img-one'> <div className='chr-img-div'><img src={lock} alt="something here" /></div></div>
              <p className='chart-para'>Total Number of Taps / Scans</p></div>
            <div><strong className='chart-num'>650</strong></div>
          </div>
          <div className='chart-two'>
            <div className='d-flex justify-content-between align-item-center' >
              <p className='num-tap-para'>Number of Taps / Scans by City</p>
              <button className='view-port-btn btn'>View Report</button>
            </div>

            <DonutChart
              width={500}
              height={350}
              strokeColor={reactDonutChartStrokeColor}
              data={userdata}
              colors={reactDonutChartBackgroundColor}
              innerRadius={reactDonutChartInnerRadius}
              selectedOffset={reactDonutChartSelectedOffset}
            />
          </div>
        </div>
        <div className='main-chart'>
          <div className='chart-one d-flex align-items-center justify-content-between'>
            <div className='d-flex align-items-center'>  <div className='chart-little-img chart-little-img-two'><div className='chr-img-div'> <img src={contact} alt="something here" /></div></div>
              <p className='chart-para'>Total Number of Contacts Saved</p></div>
            <div>
              <strong className='chart-num'>400</strong>
            </div>
          </div>
          <div className='chart-two'>
            <div className='d-flex justify-content-between align-items-center' >
              <p className='num-tap-para'>Number of Contacts Saved By User</p>
            </div>
            <div className='search-div d-flex align-items-baseline'>
              <p className='search-para'>Search</p>
              <div className="form-group">
                <input type="email" className="form-control search-inp" aria-describedby="emailHelp" placeholder="Search By User Name..." />
              </div>
            </div>
            <table className='table num-of-contact'>
              <thead className="thead-dark">
                <tr>
                  <th>#</th>
                  <th>User Name</th>
                  <th>Saved Contacts</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01</td>
                  <td>John Adam</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>02</td>
                  <td>Thomas Jefferson</td>
                  <td>08</td>
                </tr>
                <tr>
                  <td>03</td>
                  <td>Douglas Macaurthur</td>
                  <td>15</td>
                </tr>
                <tr>
                  <td>04</td>
                  <td>Jackie Robinson</td>
                  <td>06</td>
                </tr>
                <tr>
                  <td>05</td>
                  <td>Benjamin Franklin</td>
                  <td>09</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Dashboard>
  )
}

export default Dashright