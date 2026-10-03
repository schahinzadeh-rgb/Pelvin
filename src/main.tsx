import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

const isAdvertisingPage = window.location.pathname.replace(/\/+$/, '') === '/werbung'
const isJobsAdvertisingPage = window.location.pathname.replace(/\/+$/, '') === '/werbung-jobs'

async function renderPage() {
  const Page = isJobsAdvertisingPage
    ? (await import('./advertising/JobsAdvertisingFilm')).JobsAdvertisingFilm
    : isAdvertisingPage
      ? (await import('./advertising/AdvertisingFilm')).AdvertisingFilm
      : (await import('./App')).default

  createRoot(document.getElementById('root')!).render(
    <StrictMode><Page /></StrictMode>,
  )
}

void renderPage()
