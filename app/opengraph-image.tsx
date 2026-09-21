import { ImageResponse } from 'next/og'

export const alt =
  'Ferro Crema — precizni delovi za espresso aparate, barista alat i noževi za mlinove. Od 2018. iz Beograda.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#171817',
          color: '#f4f2eb',
          flexDirection: 'row',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '62%',
            height: '100%',
            padding: '78px 84px',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              marginBottom: 30,
            }}
          >
            <div
              style={{
                width: 34,
                height: 1,
                background: '#c5a16d',
                display: 'flex',
              }}
            />
            <div
              style={{
                display: 'flex',
                color: '#c5a16d',
                fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                fontSize: 14,
                letterSpacing: '0.32em',
                fontWeight: 600,
              }}
            >
              PRECIZNI DELOVI · BOLJA KREMA
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'baseline',
              flexWrap: 'wrap',
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              fontWeight: 300,
              fontSize: 82,
              lineHeight: 0.95,
              letterSpacing: '-0.06em',
              color: '#faf8f2',
            }}
          >
            <div style={{ display: 'flex' }}>Ferro</div>
            <div
              style={{
                display: 'flex',
                marginLeft: 18,
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                fontWeight: 400,
                color: '#c5a16d',
              }}
            >
              Crema
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'baseline',
              flexWrap: 'wrap',
              fontFamily: 'ui-sans-serif, system-ui, sans-serif',
              fontWeight: 300,
              fontSize: 38,
              lineHeight: 1.1,
              letterSpacing: '-0.04em',
              color: '#d6d4cb',
              marginTop: 22,
              maxWidth: 620,
            }}
          >
            <div style={{ display: 'flex' }}>Sve</div>
            <div
              style={{
                display: 'flex',
                margin: '0 10px',
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                color: '#c5a16d',
              }}
            >
              što je između
            </div>
            <div style={{ display: 'flex' }}>aparata i dobre kafe.</div>
          </div>

          <div
            style={{
              marginTop: 56,
              display: 'flex',
              gap: 44,
              alignItems: 'flex-end',
              paddingTop: 28,
              borderTopWidth: 1,
              borderTopStyle: 'solid',
              borderTopColor: '#ffffff1a',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontSize: 11,
                  letterSpacing: '0.2em',
                  color: '#8a8d88',
                  fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                  fontWeight: 600,
                }}
              >
                EST.
              </div>
              <div
                style={{
                  display: 'flex',
                  color: '#c5a16d',
                  fontSize: 26,
                  fontFamily: 'Georgia, serif',
                  letterSpacing: '0.02em',
                }}
              >
                2018
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontSize: 11,
                  letterSpacing: '0.2em',
                  color: '#8a8d88',
                  fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                  fontWeight: 600,
                }}
              >
                LOKACIJA
              </div>
              <div
                style={{
                  display: 'flex',
                  color: '#e8e6de',
                  fontSize: 20,
                  fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                  letterSpacing: '-0.01em',
                }}
              >
                Beograd · Srbija
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontSize: 11,
                  letterSpacing: '0.2em',
                  color: '#8a8d88',
                  fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                  fontWeight: 600,
                }}
              >
                KATEGORIJE
              </div>
              <div
                style={{
                  display: 'flex',
                  color: '#e8e6de',
                  fontSize: 20,
                  fontFamily: 'ui-sans-serif, system-ui, sans-serif',
                  letterSpacing: '-0.01em',
                }}
              >
                Delovi · Alat · Noževi
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            width: '38%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 0,
          }}
        >
          <div
            style={{
              width: 288,
              height: 288,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: '#c5a16d4d',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                width: '64%',
                height: '64%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: '#c5a16d77',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  fontFamily: 'Georgia, serif',
                  color: '#c5a16d',
                  fontSize: 96,
                  letterSpacing: '-0.04em',
                }}
              >
                FC
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
