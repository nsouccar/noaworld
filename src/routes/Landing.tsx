import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#2a2a2a',
      color: '#ffffff',
      gap: '2rem'
    }}>
      <h1>Welcome</h1>
      <p>Choose how you'd like to explore:</p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link
          to="/classic"
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#4a4a4a',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          Classic Portfolio
        </Link>
        <Link
          to="/3d"
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#6a4a6a',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          Enter 3D Room
        </Link>
      </div>
    </div>
  )
}
