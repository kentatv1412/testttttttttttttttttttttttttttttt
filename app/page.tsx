'use client'

import { useEffect } from 'react'

export default function Page() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = '/script.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script)
    }
  }, [])

  return (
    <div>
      <style>{`
:root { --bg:#071025; --muted:#94a3b8; --accent:#ffd166 }
* { box-sizing: border-box }
body,html { margin:0; height:100%; background:var(--bg); color:white; font-family:Inter,system-ui }
.stage { position:fixed; inset:0; display:flex; flex-direction:column; }

/* POP Area */
.hero {
  flex:1;
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
  background:#06101a;
  cursor:pointer;
  user-select:none;
}
.hero img { width:100%; height:100%; object-fit:cover; pointer-events:none }

/* Score badge */
.counter-badge {
  position:absolute; top:18px; left:18px;
  background:rgba(0,0,0,0.45);
  padding:8px 12px;
  border-radius:10px;
  font-weight:800; color:var(--accent);
  backdrop-filter:blur(4px)
}

/* pop text */
.plus {
  position:absolute;
  pointer-events:none;
  font-weight:800;
  font-size:28px;
  animation:floatUp .9s cubic-bezier(.16,.9,.34,1);
}
@keyframes floatUp {
  0%{ transform:translateY(0); opacity:1 }
  100%{ transform:translateY(-120px); opacity:0 }
}

/* bottom bar */
.bottom-bar {
  height:84px;
  background:rgba(0,0,0,0.65);
  border-top:1px solid rgba(255,255,255,0.05);
  display:flex; justify-content:space-between; 
  padding:12px 20px;
  align-items:center;
}

/* Buttons */
.btn {
  padding:10px 14px;
  border-radius:10px;
  border:1px solid rgba(255,255,255,0.05);
  background:rgba(255,255,255,0.05);
  color:white;
  font-weight:700;
  cursor:pointer;
}
.small { padding:8px 10px; font-size:14px }

/* Leaderboard Button */
.leader-toggle {
  position: fixed;
  right: 18px;
  bottom: 110px;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: var(--accent);
  font-size: 28px;
  font-weight: 900;
  color: #000;
  display:flex; align-items:center; justify-content:center;
  cursor:pointer;
  box-shadow:0 4px 15px rgba(0,0,0,0.4);
  z-index:9999;
}

/* Leaderboard Panel */
.leader-panel {
  position: fixed;
  top: 0;
  right: -340px;
  width: 300px;
  height: 100vh;
  background: rgba(0,0,0,0.9);
  backdrop-filter: blur(10px);
  padding: 16px;
  transition: right .28s ease;
  z-index: 99999;
  overflow-y:auto;
}
.leader-panel.open { right:0 }

.leader-header {
  display:flex; justify-content:space-between; align-items:center;
  font-size: 20px; font-weight: 800;
  margin-bottom: 16px;
}
.close-btn {
  background:none; border:none; color:white; font-size:24px; cursor:pointer;
}

.leader-content div {
  display:flex; justify-content:space-between;
  padding:6px 0; border-bottom:1px solid rgba(255,255,255,0.08);
}

/* Mobile */
@media(max-width:780px){
  .bottom-bar { flex-direction:column; height:auto; gap:10px }
  .leader-panel { width:85%; right:-85% }
}
      `}</style>

      <div className="stage">
        
        {/* POP area */}
        <div id="h" className="hero">
          <img id="c" src="https://img5.pic.in.th/file/secure-sv1/Blue-and-Green-Glassy-Nature-Desktop-Wallpaper.png" />
          <img id="o" style={{display:'none', position:'absolute', left:0, top:0, width:'100%', height:'100%', objectFit:'cover'}} 
               src="https://img2.pic.in.th/pic/581057723_896655819567396_2736182994753000191_n.png" />
          <div id="x" className="counter-badge">0</div>
        </div>

        {/* Bottom bar */}
        <div className="bottom-bar">
          <button id="r" className="btn small">รีเซ็ต</button>
          <button id="s" className="btn small">บันทึก</button>

          <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
            <input id="n" type="text" placeholder="ชื่อ" style={{padding:'8px', borderRadius:'8px'}} />
            <button id="m" className="btn small">บันทึก</button>
          </div>
        </div>

        {/* Leaderboard button */}
        <div id="leaderToggle" className="leader-toggle">🏆</div>

        {/* Sidebar Leaderboard */}
        <div id="leaderPanel" className="leader-panel">
          <div className="leader-header">
            <span>🏆 Leaderboard</span>
            <button id="leaderClose" className="close-btn">✕</button>
          </div>
          <div id="l" className="leader-content">กำลังโหลด...</div>
        </div>

      </div>
    </div>
  )
}
