import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#171817',
          borderRadius: '50%',
        }}
      >
        <div
          style={{
            width: '86%',
            height: '86%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            borderWidth: '1.2px',
            borderStyle: 'solid',
            borderColor: '#c5a16d',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontFamily: 'Georgia, serif',
              fontWeight: 400,
              color: '#c5a16d',
              fontSize: 15,
              letterSpacing: '-0.04em',
            }}
          >
            FC
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
