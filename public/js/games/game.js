
const canvas = document.getElementById('cnv');
const gl = canvas.getContext('webgl');
if (!gl) { alert('WebGL не поддерживается'); }

// ---------- Шейдеры ----------
const vsSrc = `
attribute vec3 aPos;
attribute vec3 aColor;
uniform mat4 uProj;
uniform mat4 uView;
varying vec3 vColor;
void main() {
  vColor = aColor;
  gl_Position = uProj * uView * vec4(aPos, 1.0);
}
`;

const fsSrc = `
precision mediump float;
varying vec3 vColor;
void main() {
  // простая псевдо-освещённость по нормали не считаем,
  // но чуть затемним по глубине для объёма
  gl_FragColor = vec4(vColor, 1.0);
}
`;

function compile(type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
    throw gl.getShaderInfoLog(s);
  return s;
}

const prog = gl.createProgram();
gl.attachShader(prog, compile(gl.VERTEX_SHADER, vsSrc));
gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fsSrc));
gl.linkProgram(prog);
if (!gl.getProgramParameter(prog, gl.LINK_STATUS))
  throw gl.getProgramInfoLog(prog);
gl.useProgram(prog);

const aPos   = gl.getAttribLocation(prog, 'aPos');
const aColor = gl.getAttribLocation(prog, 'aColor');
const uProj  = gl.getUniformLocation(prog, 'uProj');
const uView  = gl.getUniformLocation(prog, 'uView');

// ---------- Матрицы (мини-библиотека) ----------
function perspective(fovy, aspect, near, far) {
  const f = 1 / Math.tan(fovy / 2);
  const nf = 1 / (near - far);
  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * nf, -1,
    0, 0, 2 * far * near * nf, 0
  ]);
}

function lookAt(eye, target, up) {
  const zx = eye[0]-target[0], zy = eye[1]-target[1], zz = eye[2]-target[2];
  let zl = Math.hypot(zx,zy,zz); const z = [zx/zl, zy/zl, zz/zl];
  const xx = up[1]*z[2]-up[2]*z[1], xy = up[2]*z[0]-up[0]*z[2], xz = up[0]*z[1]-up[1]*z[0];
  let xl = Math.hypot(xx,xy,xz); const x = [xx/xl, xy/xl, xz/xl];
  const y = [z[1]*x[2]-z[2]*x[1], z[2]*x[0]-z[0]*x[2], z[0]*x[1]-z[1]*x[0]];
  return new Float32Array([
    x[0], y[0], z[0], 0,
    x[1], y[1], z[1], 0,
    x[2], y[2], z[2], 0,
    -(x[0]*eye[0]+x[1]*eye[1]+x[2]*eye[2]),
    -(y[0]*eye[0]+y[1]*eye[1]+y[2]*eye[2]),
    -(z[0]*eye[0]+z[1]*eye[1]+z[2]*eye[2]),
    1
  ]);
}

// ---------- Генератор куба ----------
// Возвращает массив вершин [x,y,z, r,g,b, ...] для одного куба
function pushCube(arr, cx, cy, cz, sx, sy, sz, r, g, b) {
  const x0 = cx - sx/2, x1 = cx + sx/2;
  const y0 = cy - sy/2, y1 = cy + sy/2;
  const z0 = cz - sz/2, z1 = cz + sz/2;

  // каждая грань: 6 вершин (2 треугольника)
  const faces = [
    // +Z (перед)
    [[x0,y0,z1],[x1,y0,z1],[x1,y1,z1], [x0,y0,z1],[x1,y1,z1],[x0,y1,z1]],
    // -Z (зад)
    [[x1,y0,z0],[x0,y0,z0],[x0,y1,z0], [x1,y0,z0],[x0,y1,z0],[x1,y1,z0]],
    // +X
    [[x1,y0,z1],[x1,y0,z0],[x1,y1,z0], [x1,y0,z1],[x1,y1,z0],[x1,y1,z1]],
    // -X
    [[x0,y0,z0],[x0,y0,z1],[x0,y1,z1], [x0,y0,z0],[x0,y1,z1],[x0,y1,z0]],
    // +Y (верх)
    [[x0,y1,z1],[x1,y1,z1],[x1,y1,z0], [x0,y1,z1],[x1,y1,z0],[x0,y1,z0]],
    // -Y (низ)
    [[x0,y0,z0],[x1,y0,z0],[x1,y0,z1], [x0,y0,z0],[x1,y0,z1],[x0,y0,z1]],
  ];

  for (const face of faces) {
    for (const v of face) {
      arr.push(v[0], v[1], v[2], r, g, b);
    }
  }
}

// ---------- Чанки ----------
const CHUNK_SIZE   = 20;    // длина чанка по Z
const CHUNKS_AHEAD = 5;     // сколько чанков держим впереди
const CUBES_PER_CHUNK = 15; // сколько кубов в чанке
const ROOM_WIDTH = 20;      // ширина "комнаты"

function seededRandom(seed) {
  // xorshift32 — простой и быстрый
  let s = seed | 0;
  if (s === 0) s = 0x12345678;
  return function() {
    s ^= s << 13; s ^= s >>> 17; s ^= s << 5;
    return ((s >>> 0) / 4294967296);
  };
}

function buildChunk(chunkIndex) {
  const rnd = seededRandom(chunkIndex * 7919 + 13);
  const zBase = chunkIndex * CHUNK_SIZE;
  const verts = [];

  for (let i = 0; i < CUBES_PER_CHUNK; i++) {
    const x    = (rnd() - 0.5) * ROOM_WIDTH;
    const z    = zBase + rnd() * CHUNK_SIZE;
    const sx   = 0.5 + rnd() * 2.5;   // случайная ширина
    const sy   = 0.5 + rnd() * 5.0;   // случайная высота
    const sz   = 0.5 + rnd() * 2.5;
    const y    = -2 + sy / 2;         // стоят на "полу" y = -2
    const r    = rnd(), g = rnd(), b = rnd();

    pushCube(verts, x, y, z, sx, sy, sz, r, g, b);
  }

  // Загружаем в общий VBO-пул будем через отдельный буфер на чанк
  const vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
  return { vbo, count: verts.length / 6, chunkIndex };
}

// ---------- Мир ----------
const chunks = new Map(); // chunkIndex -> {vbo, count}
let frontChunk = 0;       // следующий чанк, который нужно построить
let cameraZ = 0;

// Стена-«комната»: две боковые плоскости? Упростим — просто кубы в пределах ROOM_WIDTH.
// Хочешь явные стены — добавь два длинных куба. Для простоты нет.

function ensureChunks() {
  while (frontChunk < cameraZ / CHUNK_SIZE + CHUNKS_AHEAD) {
    if (!chunks.has(frontChunk)) {
      chunks.set(frontChunk, buildChunk(frontChunk));
    }
    frontChunk++;
  }
}

function cleanupChunks() {
  const minKeep = Math.floor(cameraZ / CHUNK_SIZE) - 2;
  for (const [idx, chunk] of chunks) {
    if (idx < minKeep) {
      gl.deleteBuffer(chunk.vbo);
      chunks.delete(idx);
    }
  }
}

// ---------- Ресайз ----------
function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width  = Math.floor(canvas.clientWidth * dpr);
  canvas.height = Math.floor(canvas.clientHeight * dpr);
  gl.viewport(0, 0, canvas.width, canvas.height);
}
window.addEventListener('resize', resize);
resize();

// ---------- Рендер ----------
let lastTime = performance.now();

function frame(now) {
  const dt = Math.min((now - lastTime) / 1000, 0.1);
  lastTime = now;

  // Движение камеры вперёд со скоростью ~8 ед/сек
  cameraZ += dt * 8;

  ensureChunks();
  cleanupChunks();

  const proj = perspective(Math.PI / 3, canvas.width / canvas.height, 0.1, 200);
  const view = lookAt(
    [0, 0.5, cameraZ],
    [0, 0.5, cameraZ + 1],
    [0, 1, 0]
  );

  gl.uniformMatrix4fv(uProj, false, proj);
  gl.uniformMatrix4fv(uView, false, view);

  gl.clearColor(0.05, 0.07, 0.12, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);
  gl.cullFace(gl.BACK);

  gl.enableVertexAttribArray(aPos);
  gl.enableVertexAttribArray(aColor);

  for (const chunk of chunks.values()) {
    gl.bindBuffer(gl.ARRAY_BUFFER, chunk.vbo);
    const stride = 6 * 4;
    gl.vertexAttribPointer(aPos,   3, gl.FLOAT, false, stride, 0);
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, stride, 3 * 4);
    gl.drawArrays(gl.TRIANGLES, 0, chunk.count);
  }

  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
