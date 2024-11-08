import React from 'react'

export default function AdminHead() {
  return (
    <div>
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/assets/img/favicon/favicon.ico" />

      {/* Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
        rel="stylesheet"
      />

      {/* Icons */}
      <link rel="stylesheet" href="/assets/vendor/fonts/boxicons.css" />

      {/* Core CSS */}
      <link rel="stylesheet" href="/assets/vendor/css/core.css" />
      <link rel="stylesheet" href="/assets/vendor/css/theme-default.css" />
      <link rel="stylesheet" href="/assets/css/demo.css" />

      {/* Vendors CSS */}
      <link rel="stylesheet" href="/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" />
      <link rel="stylesheet" href="/assets/vendor/libs/apex-charts/apex-charts.css" />
      <link rel="stylesheet" href="/assets/vendor/css/pages/page-auth.css" />

      {/* Helpers */}
      <script src="/assets/vendor/js/helpers.js"></script>
      <script src="/assets/js/config.js"></script>
    </div>
  )
}
