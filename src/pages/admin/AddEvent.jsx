import React, {useState} from 'react';
import AdminSideBar from '../../components/layout/AdminSideBar';
import FooterRest from '../../components/layout/FooterRest';
import '../../styles/adminEvents.css';
import GeneralEvent from '../../components/other/GeneralEventAdd';
import AddMatch from '../../components/other/AddMatch';
import OtherEvent from '../../components/other/OtherEventAdd';
import Theater from '../../pages/web/Theater';

export default function AddGeneralEvent() {
    const [visibleDiv, setVisibleDiv] = useState(1);
  return (
    <div>
        <div class="layout-wrapper layout-content-navbar">
            <div class="layout-container">
                <AdminSideBar />

                <div class="content-wrapper">
                    <div class="container-xxl flex-grow-1 container-p-y">
                        <h4 class="fw-bold py-3 my-1"><span class="text-muted fw-light">Events /</span> Add Event</h4>
                        <div className="button-container mb-4">
                            <button className='btn btn-primary' onClick={() => setVisibleDiv(1)}>General Event</button>
                            <button className='btn btn-primary mx-2' onClick={() => setVisibleDiv(2)}>Sports and Match</button>
                            <button className='btn btn-primary' onClick={() => setVisibleDiv(3)}>Other Events</button>
                            <button className='btn btn-primary mx-2' onClick={() => setVisibleDiv(4)}>Theater and Movie</button>
                        </div>

                        <div className={visibleDiv === 1 ? "visible" : "hidden"}>
                            <GeneralEvent/>
                        </div>
                        <div className={visibleDiv === 2 ? "visible" : "hidden"}>
                            <AddMatch/>
                        </div>
                        <div className={visibleDiv === 3 ? "visible" : "hidden"}>
                            <OtherEvent/>
                        </div>
                        <div className={visibleDiv === 4 ? "visible" : "hidden"}>
                            <Theater/>
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
