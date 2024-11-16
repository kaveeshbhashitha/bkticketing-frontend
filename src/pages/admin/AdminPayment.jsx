import React from 'react'
import AdminSideBar from '../../components/layout/AdminSideBar'
import FooterRest from '../../components/layout/FooterRest'
import DailyIncomeChart from '../../components/charts/DailyIncomeChart'

export default function AdminPayment() {
  return (
    <div>
        <div class="layout-wrapper layout-content-navbar">
            <div class="layout-container">
                <AdminSideBar />

                <div class="content-wrapper">
                    <div class="container-xxl flex-grow-1 container-p-y">
                        <h4 class="fw-bold py-3 my-1"><span class="text-muted fw-light">Statistic /</span> Payments</h4>
                        <DailyIncomeChart height={'auto'} width={'1200px'}/>
                    </div>
                    <div class="content-backdrop fade"></div>
                </div>
            </div>
        </div>
      <FooterRest/>
    </div>
  )
}

