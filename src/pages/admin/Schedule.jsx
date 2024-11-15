import React from 'react'
import AdminSideBar from '../../components/layout/AdminSideBar'
import FooterRest from '../../components/layout/FooterRest'
import EventCalendar from '../../components/other/EventCalendar'

export default function Schedule() {
  return (
    <div>
        <div>
        <div class="layout-wrapper layout-content-navbar">
            <div class="layout-container">
                <AdminSideBar />

                <div class="content-wrapper" style={{overflow:'scroll'}}>
                    <div class="container-xxl flex-grow-1 container-p-y">
                        <h4 class="fw-bold py-3 my-1"><span class="text-muted fw-light">Events /</span> Event Schedule</h4>
                        <div >
                            <EventCalendar height={820}/>
                        </div>
                    </div>
                    <div class="content-backdrop fade"></div>
                </div>
            </div>
        </div>
      <FooterRest/>
    </div>
    </div>
  )
}
