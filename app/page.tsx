'use client'

import { useEffect } from 'react'

export default function Page() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = '/script.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return (
    <html lang="th">
      <head>
        <title>Popcat Locked</title>

        <style>{`
:root { --bg:#071025; --muted:#94a3b8; --accent:#ffd166 }
* { box-sizing: border-box; }
html,body { height:100%; margin:0; font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,"Noto Sans Thai",sans-serif; background:var(--bg); color:#e6eef6; }

.stage { position:fixed; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; overflow:hidden; }

.hero { 
  position:relative; 
  flex:1; 
  display:flex; 
  align-items:center; 
  justify-content:center; 
  width:100%; 
  height:100%; 
  background:#06101a; 
  cursor:pointer; 
  user-select:none;
}

.hero img { 
  width:100%; 
  height:100%; 
  object-fit:cover; 
  display:block; 
  pointer-events:none;
}

.counter-badge { 
  position:absolute; 
  top:18px; left:18px; 
  background:rgba(0,0,0,0.45); 
  padding:8px 12px; 
  border-radius:10px; 
  font-weight:800; 
  color:var(--accent); 
  backdrop-filter:blur(4px); 
}

.plus { 
  position:absolute; 
  pointer-events:none; 
  font-weight:800; 
  font-size:28px; 
  color:#fff; 
  text-shadow:0 2px 8px rgba(0,0,0,.6); 
  animation:floatUp .9s cubic-bezier(.16,.9,.34,1); 
}

@keyframes floatUp { 
  0% { transform:translateY(0) scale(1); opacity:1 } 
  70% { transform:translateY(-80px) scale(1.08); opacity:1 } 
  100% { transform:translateY(-120px) scale(.95); opacity:0 } 
}

.bottom-bar { 
  position:fixed; 
  left:0; right:0; bottom:0; 
  height:84px; 
  background:rgba(0,0,0,0.7); 
  display:flex; 
  align-items:center; 
  justify-content:space-between; 
  padding:12px 20px; 
  gap:12px; 
  border-top:1px solid rgba(255,255,255,0.03); 
}

.controls { display:flex; gap:10px; align-items:center; flex-wrap:wrap; }

.btn { 
  background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)); 
  border:1px solid rgba(255,255,255,0.04); 
  padding:10px 14px; 
  border-radius:10px; 
  color:inherit; 
  cursor:pointer; 
  font-weight:700; 
}
.small { padding:8px 10px; font-size:14px }

.leaderboard { 
  min-width:220px; 
  max-width:320px; 
  background:rgba(255,255,255,0.02); 
  padding:8px; 
  border-radius:8px; 
  overflow:auto; 
  max-height:64px; 
}

input[type=text] { 
  padding:8px; 
  border-radius:8px; 
  border:1px solid rgba(255,255,255,0.04); 
  background:transparent; 
  color:inherit; 
}

.muted { color:var(--muted); font-size:13px }

@media (max-width:780px) { 
  .bottom-bar { flex-direction:column; height:auto; padding:10px; } 
  .leaderboard { max-width:100%; width:100%; } 
}
        `}</style>
      </head>

      <body>
        <div className="stage">
          {/* พื้นที่ POP */}
          <div className="hero" id="h">
            <img id="c" src="https://img5.pic.in.th/file/secure-sv1/Blue-and-Green-Glassy-Nature-Desktop-Wallpaper.png" draggable="false" alt="Closed" />
            <img id="o" src="https://img2.pic.in.th/pic/581057723_896655819567396_2736182994753000191_n.png" style={{display:'none',position:'absolute',left:0,top:0,width:'100%',height:'100%',objectFit:'cover'}} draggable="false" alt="Open" />
            <div className="counter-badge" id="x">0</div>
          </div>

          {/* แถบล่าง */}
          <div className="bottom-bar">
            <div className="controls">
              <button id="r" className="btn small">รีเซ็ต</button>
              <button id="s" className="btn small">บันทึก</button>
            </div>

            <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
              <div className="leaderboard" id="l">ยังไม่มีคะแนน</div>

              <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                <input id="n" type="text" placeholder="ชื่อ" style={{minWidth:'150px'}} />
                <button id="m" className="btn small">บันทึก</button>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
