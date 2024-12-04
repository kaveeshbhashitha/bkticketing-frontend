import React, {useState} from 'react';
import '../../styles/adminEvents.css';
import AdminSideBar from '../../components/layout/AdminSideBar';
import FooterRest from '../../components/layout/FooterRest';
import AddCustomer from '../../components/other/AddCustomer';
import UserRegistrationDataChart from '../../components/charts/UserRegistrationDataChart';

export default function Customer() {
    const [visibleDiv, setVisibleDiv] = useState(1);
  return (
    <div>
        <div class="layout-wrapper layout-content-navbar">
            <div class="layout-container">
                <AdminSideBar />

                <div class="content-wrapper">
                    <div class="container-xxl flex-grow-1 container-p-y">
                        <h4 class="fw-bold py-3 my-1"><span class="text-muted fw-light">Statistic /</span> Customer</h4>
                        <div className="button-container mb-4">
                            <button className='btn btn-primary' onClick={() => setVisibleDiv(1)}>All Customer</button>
                            <button className='btn btn-primary mx-2' onClick={() => setVisibleDiv(2)}>Customer Statistics</button>
                        </div>

                        <div className={visibleDiv === 1 ? "visible" : "hidden"}>
                            <AddCustomer/>
                        </div>
                        <div className={visibleDiv === 2 ? "visible" : "hidden"}>
                            <UserRegistrationDataChart/>
                        </div>
                    </div>
                    <div class="content-backdrop fade"></div>
                </div>
            </div>
        </div>
      <FooterRest/>
    </div>
  )
}
