import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
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
          borderRadius: 36,
        }}
      >
        <div
          style={{
            width: '72%',
            height: '72%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            borderWidth: '3px',
            borderStyle: 'solid',
            borderColor: '#c5a16d',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              color: '#c5a16d',
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              fontSize: 10,
              letterSpacing: '0.22em',
              fontWeight: 600,
              marginBottom: 2,
            }}
          >
            FERRO
          </div>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Georgia, serif',
              fontWeight: 400,
              color: '#c5a16d',
              fontSize: 64,
              letterSpacing: '-0.04em',
            }}
          >
            FC
          </div>
          <div
            style={{
              display: 'flex',
              color: '#c5a16d',
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              fontSize: 10,
              letterSpacing: '0.22em',
              fontWeight: 600,
              marginTop: 2,
            }}
          >
            CREMA
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
