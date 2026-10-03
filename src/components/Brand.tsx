import type { SVGProps } from 'react'

export function BrandMark({ className = '' }: { className?: string }) {
  return (
    <span className={`brand ${className}`} aria-label="Pelvin">
      <svg viewBox="0 0 36 36" aria-hidden="true" focusable="false">
        <path fill="#FF5E1F" d="M5 3h14.2C27.4 3 33 7.5 33 14.4S27.4 26 19.2 26H13v7H5V3Zm8 7v9h6c3.8 0 6-1.6 6-4.5S22.8 10 19 10h-6Z" />
        <path fill="#FF8B45" d="M5 26h8v7H5z" />
      </svg>
      <span>pelvin</span>
    </span>
  )
}

export function TinySquare(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" {...props}>
      <rect x="1" y="1" width="10" height="10" rx="1" fill="#191817" stroke="currentColor" />
    </svg>
  )
}
