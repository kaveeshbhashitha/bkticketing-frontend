import React, {useState} from 'react';
import AdminSideBar from '../../components/layout/AdminSideBar';
import FooterRest from '../../components/layout/FooterRest';
import '../../styles/adminEvents.css';
import Delete from '../../components/other/Delete';
import Update from '../../components/other/Update';

export default function DeleteEvent() {
    const [visibleDiv, setVisibleDiv] = useState(1);
  return (
    <div>
        <div class="layout-wrapper layout-content-navbar">
            <div class="layout-container">
                <AdminSideBar />

                <div class="content-wrapper">
                    <div class="container-xxl flex-grow-1 container-p-y">
                        <h4 class="fw-bold py-3 my-1"><span class="text-muted fw-light">Events /</span> Update and Delete</h4>
                        <div className="button-container mb-4">
                            <button className='btn btn-primary' onClick={() => setVisibleDiv(1)}>Update Event</button>
                            <button className='btn btn-primary mx-2' onClick={() => setVisibleDiv(2)}>Delete Event</button>
                        </div>

                        <div className={visibleDiv === 1 ? "visible" : "hidden"}>
                            <Update/>
                        </div>

                        <div className={visibleDiv === 2 ? "visible" : "hidden"}>
                            <Delete/>
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
