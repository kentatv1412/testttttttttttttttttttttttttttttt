(function () {
  const hero = document.getElementById('h');
  const counter = document.getElementById('x');
  const resetBtn = document.getElementById('r');
  const saveBtn = document.getElementById('s');
  const nameInput = document.getElementById('n');
  const submitBtn = document.getElementById('m');
  const leaderboardDiv = document.getElementById('l');

  const a = 'https://img5.pic.in.th/file/secure-sv1/Blue-and-Green-Glassy-Nature-Desktop-Wallpaper.png';
  const b = 'https://img2.pic.in.th/pic/581057723_896655819567396_2736182994753000191_n.png';

  const MAX = 1e6;
  const CK = 'popcat_full_count_v1';
  let score = Number(localStorage.getItem(CK) || 0);

  const g = document.getElementById('c');
  const o = document.getElementById('o');

  if (g) g.src = a;
  if (o) o.src = b;

  function updateCounter() {
    if (score > MAX) score = MAX;
    counter.textContent = score.toLocaleString();
    localStorage.setItem(CK, score);
  }

  function flash() {
    if (!g || !o) return;
    g.style.display = 'none';
    o.style.display = 'block';
    setTimeout(() => {
      o.style.display = 'none';
      g.style.display = 'block';
    }, 140);
  }

  function popAnim(x, y) {
    const e = document.createElement('div');
    e.className = 'plus';
    e.textContent = '+1';
    hero.appendChild(e);
    const f = hero.getBoundingClientRect();
    e.style.left = x - f.left - 12 + 'px';
    e.style.top = y - f.top - 20 + 'px';
    setTimeout(() => e.remove(), 900);
  }

  function clickScore(x, y) {
    score++;
    updateCounter();
    popAnim(x, y);
    flash();
  }

  if (hero) {
    hero.addEventListener('click', (e) => {
      clickScore(e.clientX, e.clientY);
    });

    hero.addEventListener(
      'touchstart',
      (e) => {
        const t = e.touches[0];
        clickScore(t.clientX, t.clientY);
      },
      { passive: true }
    );
  }

  // ============================
  //   VERCEL API
  // ============================
  async function fetchLB() {
    try {
      const res = await fetch('/api/getScores');
      return await res.json();
    } catch (e) {
      return [];
    }
  }

  async function saveScore(name, score) {
    try {
      const res = await fetch('/api/saveScore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, score }),
      });
      return await res.json();
    } catch (e) {
      console.error(e);
    }
  }

  async function refreshLB() {
    let arr = await fetchLB();
    const localScore = score;

    // ลบ You (local) เก่า
    arr = arr.filter((r) => r.name !== 'You (local)');

    // ใส่คะแนนเรา ไม่ว่าจะเท่าไหร่ (รวม 0)
    arr.push({
      name: 'You (local)',
      score: localScore,
    });

    arr.sort((a, b) => b.score - a.score);

    leaderboardDiv.innerHTML = '';
    arr.forEach((r, i) => {
      const row = document.createElement('div');
      row.style.display = 'flex';
      row.style.justifyContent = 'space-between';
      row.style.marginBottom = '4px';

      row.innerHTML = `
        <div style="font-weight:700">${i + 1}. ${r.name}</div>
        <div style="font-weight:800">${Number(r.score).toLocaleString()}</div>
      `;

      leaderboardDiv.appendChild(row);
    });
  }

  submitBtn.addEventListener('click', async () => {
    const n = (nameInput.value || 'Guest').slice(0, 32);
    await saveScore(n, Math.min(score, MAX));
    refreshLB();
    alert('บันทึกคะแนนเรียบร้อย!');
  });

  saveBtn.addEventListener('click', () => submitBtn.click());

  resetBtn.addEventListener('click', () => {
    if (confirm('ต้องการรีเซ็ตคะแนนใช่ไหม?')) {
      score = 0;
      updateCounter();
      localStorage.removeItem(CK);
      refreshLB();
    }
  });

// ============================
//   Leaderboard Toggle
// ============================

const panel = document.getElementById("leaderPanel");
const toggleBtn = document.getElementById("leaderToggle");
const closeBtn = document.getElementById("leaderClose");

// เปิด Panel
toggleBtn.addEventListener("click", () => {
  panel.classList.add("show");
});

// ปิด Panel
closeBtn.addEventListener("click", () => {
  panel.classList.remove("show");
});

// ปิดเมื่อกดนอกกรอบ (มือถือก็ปิดได้)
document.addEventListener("click", (e) => {
  if (!panel.contains(e.target) && e.target !== toggleBtn) {
    panel.classList.remove("show");
  }
});

  updateCounter();
  refreshLB();
})();

