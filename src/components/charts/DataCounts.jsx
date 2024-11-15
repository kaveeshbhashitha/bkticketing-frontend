import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DataCounts() {

    const [counts, setCounts] = useState({
        generalEvents: 0,
        theaters: 0,
        sports: 0,
        activity: 0,
        notification: 0,
        reservation: 0,
        user: 0,
      });
    
      const fetchCounts = async () => {
        try {
          const endpoints = {
            generalEvents: "http://localhost:8080/recordCount/generalEvents",
            theaters: "http://localhost:8080/recordCount/theaters",
            sports: "http://localhost:8080/recordCount/sports",
            activity: "http://localhost:8080/recordCount/activity",
            notification: "http://localhost:8080/recordCount/notification",
            reservation: "http://localhost:8080/recordCount/reservation",
            user: "http://localhost:8080/recordCount/user",
          };
    
          const responses = await Promise.all(
            Object.entries(endpoints).map(([key, url]) =>
              axios.get(url).then((response) => ({ key, value: response.data }))
            )
          );
    
          const updatedCounts = responses.reduce((acc, { key, value }) => {
            acc[key] = value;
            return acc;
          }, {});
    
          setCounts(updatedCounts);
        } catch (error) {
          console.error("Error fetching counts:", error);
        }
      };
    
      useEffect(() => {
        fetchCounts();
      }, []);

  return (
    <div class="card h-100">
        <div class="card-header d-flex align-items-center justify-content-between">
            <h5 class="card-title m-0 me-2">Transactions</h5>
            <div class="dropdown">
            <button
                class="btn p-0"
                type="button"
                id="transactionID"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                <i class="bx bx-dots-vertical-rounded"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="transactionID">
                <a class="dropdown-item" href="/">Last 28 Days</a>
                <a class="dropdown-item" href="/">Last Month</a>
                <a class="dropdown-item" href="/">Last Year</a>
            </div>
            </div>
        </div>
        <div class="card-body">
            <ul class="p-0 m-0">
            <li class="d-flex mb-4 pb-1">
                <div class="avatar flex-shrink-0 me-3">
                <img src="../assets/img/icons/unicons/paypal.png" alt="User" class="rounded" />
                </div>
                <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                <div class="me-2">
                    <small class="text-muted d-block mb-1">Events</small>
                    <h6 class="mb-0">General Events</h6>
                </div>
                <div class="user-progress d-flex align-items-center gap-1">
                    <h6 class="mb-0">00{counts.generalEvents}</h6>
                </div>
                </div>
            </li>
            <li class="d-flex mb-4 pb-1">
                <div class="avatar flex-shrink-0 me-3">
                <img src="../assets/img/icons/unicons/wallet.png" alt="User" class="rounded" />
                </div>
                <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                <div class="me-2">
                    <small class="text-muted d-block mb-1">Events</small>
                    <h6 class="mb-0">Theaters</h6>
                </div>
                <div class="user-progress d-flex align-items-center gap-1">
                    <h6 class="mb-0">00{counts.theaters}</h6>
                </div>
                </div>
            </li>
            <li class="d-flex mb-4 pb-1">
                <div class="avatar flex-shrink-0 me-3">
                <img src="../assets/img/icons/unicons/chart.png" alt="User" class="rounded" />
                </div>
                <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                <div class="me-2">
                    <small class="text-muted d-block mb-1">Events</small>
                    <h6 class="mb-0">Sports</h6>
                </div>
                <div class="user-progress d-flex align-items-center gap-1">
                    <h6 class="mb-0">00{counts.sports}</h6>
                </div>
                </div>
            </li>
            <li class="d-flex mb-4 pb-1">
                <div class="avatar flex-shrink-0 me-3">
                <img src="../assets/img/icons/unicons/cc-success.png" alt="User" class="rounded" />
                </div>
                <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                <div class="me-2">
                    <small class="text-muted d-block mb-1">Events</small>
                    <h6 class="mb-0">Activities</h6>
                </div>
                <div class="user-progress d-flex align-items-center gap-1">
                    <h6 class="mb-0">00{counts.activity}</h6>
                </div>
                </div>
            </li>
            <li class="d-flex mb-4 pb-1">
                <div class="avatar flex-shrink-0 me-3">
                <img src="../assets/img/icons/unicons/wallet.png" alt="User" class="rounded" />
                </div>
                <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                <div class="me-2">
                    <small class="text-muted d-block mb-1">Events</small>
                    <h6 class="mb-0">Notifications</h6>
                </div>
                <div class="user-progress d-flex align-items-center gap-1">
                    <h6 class="mb-0">00{counts.notification}</h6>
                </div>
                </div>
            </li>
            <li class="d-flex">
                <div class="avatar flex-shrink-0 me-3">
                <img src="../assets/img/icons/unicons/cc-warning.png" alt="User" class="rounded" />
                </div>
                <div class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                <div class="me-2">
                    <small class="text-muted d-block mb-1">Company</small>
                    <h6 class="mb-0">Customers</h6>
                </div>
                <div class="user-progress d-flex align-items-center gap-1">
                    <h6 class="mb-0">00{counts.user}</h6>
                </div>
                </div>
            </li>
            </ul>
        </div>
    </div>
  )
}
