export default function Resume() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0f',
      color: '#e0e0e0',
      fontFamily: "'GC Romans Flower', system-ui, sans-serif",
      padding: '40px 20px',
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
      }}>
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{
            fontSize: '2.5rem',
            color: '#ff4444',
            marginBottom: '8px',
          }}>
            Noa Souccar
          </h1>
          <p style={{ color: '#888', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <a href="mailto:noasouccar@berkeley.edu" style={{ color: '#ff4444', textDecoration: 'none' }}>
              noasouccar@berkeley.edu
            </a>
            <span>|</span>
            <span>9145229198</span>
            <span>|</span>
            <a
              href="https://github.com/nsouccar"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#ff4444', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              nsouccar
            </a>
          </p>
        </header>

        {/* Experience */}
        <section style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '1.3rem',
            color: '#ff4444',
            borderBottom: '1px solid #333',
            paddingBottom: '8px',
            marginBottom: '20px',
          }}>
            EXPERIENCE
          </h2>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '1.1rem', margin: 0 }}>SettleKit</h3>
              <span style={{ color: '#888', fontSize: '0.9rem' }}>October 2025 – Present</span>
            </div>
            <p style={{ color: '#aaa', fontStyle: 'italic', margin: '4px 0 8px' }}>Software Engineer</p>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.6', margin: 0 }}>
              <li>Built the entire MVP backend from scratch using Supabase, designing the database schema, server logic, and auth flows to support a fast, reliable full-stack web app.</li>
            </ul>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Twitter Community Archive</h3>
              <span style={{ color: '#888', fontSize: '0.9rem' }}>October 2025</span>
            </div>
            <p style={{ color: '#aaa', fontStyle: 'italic', margin: '4px 0 8px' }}>Software Engineer</p>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.6', margin: 0 }}>
              <li>Built infrastructure for the first open source Twitter archive</li>
              <li>Implemented and tested semantic search, clustering, standing up server to host tweet vector embeddings</li>
            </ul>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Fractal Tech AI Accelerator</h3>
              <span style={{ color: '#888', fontSize: '0.9rem' }}>September 2025 – Present</span>
            </div>
            <p style={{ color: '#aaa', fontStyle: 'italic', margin: '4px 0 8px' }}>Software Engineer</p>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.6', margin: 0 }}>
              <li>60+ hours a week of creating and demoing cutting edge implementations of LLMs and other AI tools</li>
              <li>Exploring the frontier of AI agent coding workflows</li>
            </ul>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Arias Research Lab</h3>
              <span style={{ color: '#888', fontSize: '0.9rem' }}>May 2024 – December 2024</span>
            </div>
            <p style={{ color: '#aaa', fontStyle: 'italic', margin: '4px 0 8px' }}>Undergraduate AI Research Intern</p>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.6', margin: 0 }}>
              <li>Designed and trained a neural network in Python to assist a sensor in detecting excess nitrate levels in farm soil</li>
              <li>Increased the accuracy of soil sensors by 20%</li>
            </ul>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Princeton Visual AI Lab</h3>
              <span style={{ color: '#888', fontSize: '0.9rem' }}>June 2023 – August 2023</span>
            </div>
            <p style={{ color: '#aaa', fontStyle: 'italic', margin: '4px 0 8px' }}>Intern</p>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.6', margin: 0 }}>
              <li>Designed an algorithm to detect DeepFake videos in Python</li>
              <li>Implemented a convolutional neural network and Eulerian Video Magnification to achieve a detection accuracy of 83%</li>
            </ul>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Quattron Kids</h3>
              <span style={{ color: '#888', fontSize: '0.9rem' }}>June 2024 – May 2025</span>
            </div>
            <p style={{ color: '#aaa', fontStyle: 'italic', margin: '4px 0 8px' }}>Python Instructor</p>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.6', margin: 0 }}>
              <li>Taught Python classes of up to 10 students (ages 9 - 15) over Zoom</li>
              <li>Utilized Google Slides and Google Collab to present fun, interactive, project based lessons</li>
              <li>Communicated with parents to tailor lessons to the needs of each learner</li>
            </ul>
          </div>
        </section>

        {/* Education */}
        <section style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '1.3rem',
            color: '#ff4444',
            borderBottom: '1px solid #333',
            paddingBottom: '8px',
            marginBottom: '20px',
          }}>
            EDUCATION
          </h2>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '1.1rem', margin: 0 }}>University of California, Berkeley</h3>
              <span style={{ color: '#888', fontSize: '0.9rem' }}>August 2021 - August 2025</span>
            </div>
            <p style={{ color: '#aaa', margin: '4px 0' }}>Bachelor of Arts in Applied Math, Cognitive Science</p>
          </div>
        </section>

        {/* Technical Skills */}
        <section style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '1.3rem',
            color: '#ff4444',
            borderBottom: '1px solid #333',
            paddingBottom: '8px',
            marginBottom: '20px',
          }}>
            TECHNICAL SKILLS
          </h2>

          <ul style={{ paddingLeft: '20px', lineHeight: '1.8', margin: 0 }}>
            <li><strong>Programming & Tools:</strong> Python, Fullstack React, SQL, Java, Matlab, JavaScript, HTML/CSS, React Native, Swift, TensorFlow, PyTorch, OpenCV, Pandas, NumPy</li>
            <li><strong>Machine Learning & Statistics:</strong> Regression, probability distributions, Bayesian inference, hypothesis testing, scikit-learn, neural networks, optimization</li>
            <li><strong>LLMs & AI Applications:</strong> AI model integration with Vercel AI SDK and 11 Labs for speech, prompt engineering, using Claude Code, Semantic Search</li>
            <li><strong>Other Tools:</strong> Excel, PowerPoint, FL Studio</li>
          </ul>
        </section>

        {/* Music */}
        <section style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '1.3rem',
            color: '#ff4444',
            borderBottom: '1px solid #333',
            paddingBottom: '8px',
            marginBottom: '20px',
          }}>
            MUSIC
          </h2>

          <ul style={{ paddingLeft: '20px', lineHeight: '1.8', margin: 0 }}>
            <li>
              <strong>Raccoon Hospital:</strong>{' '}
              <a
                href="https://open.spotify.com/artist/0DniROsUAgyZmEj3tVNeT1"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#ff4444', textDecoration: 'none' }}
              >
                Spotify
              </a>
            </li>
            <li>
              <strong>Hell is a Teenage Girl:</strong>{' '}
              <a
                href="https://open.spotify.com/artist/6SIY1EaHYUWRXVn3Po1lxg"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#ff4444', textDecoration: 'none' }}
              >
                Spotify
              </a>
            </li>
          </ul>
        </section>

        {/* Back link */}
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <a
            href="/3d"
            style={{
              color: '#ff4444',
              textDecoration: 'none',
              fontSize: '1rem',
              padding: '10px 20px',
              border: '1px solid #ff4444',
              borderRadius: '4px',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 68, 68, 0.1)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
          >
            Back to Room
          </a>
        </div>
      </div>
    </div>
  )
}
