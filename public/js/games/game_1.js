
        const canvas = document.getElementById('cnv');
        const dpr = Math.min(window.devicePixelRatio || 1, 2); // ограничиваем 2, чтобы не убить GPU
		canvas.width = Math.floor(window.innerWidth * dpr);//??? i don understand
		canvas.height = Math.floor(window.innerHeight * dpr);
		//canvas.style.width = window.innerWidth + 'px';
		//canvas.style.height = window.innerHeight + 'px';//???
        const gl = canvas.getContext('webgl2', { antialias: true, alpha: false,/*powerPreference: 'high-performance'*/ });

        if (!gl) {
            document.getElementById('info').textContent = 'WebGL2 не поддерживается.';
            throw new Error('WebGL2 not supported');
        }

        // =========================================================================
        // Шейдеры
        // =========================================================================
        const vertexShaderSource = `#version 300 es
        in vec3 aPosition;
        in vec3 aInstanceOffset;
        in vec3 aInstanceScale;
        in vec3 aInstanceColor;

        uniform mat4 uViewMatrix;
        uniform mat4 uProjectionMatrix;

        out vec3 vColor;
        out vec3 vWorldPos;

        void main() {
            vec3 worldPos = aPosition * aInstanceScale + aInstanceOffset;
            vWorldPos = worldPos;
            vColor = aInstanceColor;
            gl_Position = uProjectionMatrix * uViewMatrix * vec4(worldPos, 1.0);
        }
        `;

        const fragmentShaderSource = `#version 300 es
        precision highp float;
        in vec3 vColor;
        in vec3 vWorldPos;
        uniform vec3 uCameraPos;
        uniform vec3 uFogColor;
        uniform float uFogNear;
        uniform float uFogFar;
        out vec4 fragColor;
        void main() {
            float dist = length(vWorldPos - uCameraPos);
            float fogFactor = clamp((dist - uFogNear) / (uFogFar - uFogNear), 0.0, 1.0);
            vec3 finalColor = mix(vColor, uFogColor, fogFactor);
            fragColor = vec4(finalColor, 1.0);
        }
        `;

        function createShader(gl, type, source) {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('Shader compile error:', gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        }

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program link error:', gl.getProgramInfoLog(program));
        }

        const locations = {
            aPosition: gl.getAttribLocation(program, 'aPosition'),
            aInstanceOffset: gl.getAttribLocation(program, 'aInstanceOffset'),
            aInstanceScale: gl.getAttribLocation(program, 'aInstanceScale'),
            aInstanceColor: gl.getAttribLocation(program, 'aInstanceColor'),
            uViewMatrix: gl.getUniformLocation(program, 'uViewMatrix'),
            uProjectionMatrix: gl.getUniformLocation(program, 'uProjectionMatrix'),
            uCameraPos: gl.getUniformLocation(program, 'uCameraPos'),
            uFogColor: gl.getUniformLocation(program, 'uFogColor'),
            uFogNear: gl.getUniformLocation(program, 'uFogNear'),
            uFogFar: gl.getUniformLocation(program, 'uFogFar'),
        };

        // =========================================================================
        // Геометрия куба
        // =========================================================================
        const cubeVertices = new Float32Array([
            -0.5, -0.5,  0.5,   0.5, -0.5,  0.5,   0.5,  0.5,  0.5,  -0.5,  0.5,  0.5,
            -0.5, -0.5, -0.5,  -0.5,  0.5, -0.5,   0.5,  0.5, -0.5,   0.5, -0.5, -0.5,
            -0.5,  0.5, -0.5,  -0.5,  0.5,  0.5,   0.5,  0.5,  0.5,   0.5,  0.5, -0.5,
            -0.5, -0.5, -0.5,   0.5, -0.5, -0.5,   0.5, -0.5,  0.5,  -0.5, -0.5,  0.5,
             0.5, -0.5, -0.5,   0.5,  0.5, -0.5,   0.5,  0.5,  0.5,   0.5, -0.5,  0.5,
            -0.5, -0.5, -0.5,  -0.5, -0.5,  0.5,  -0.5,  0.5,  0.5,  -0.5,  0.5, -0.5,
        ]);
        const cubeIndices = new Uint16Array([
            0, 1, 2,  0, 2, 3,
            4, 5, 6,  4, 6, 7,
            8, 9, 10, 8, 10, 11,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 16, 18, 19,
            20, 21, 22, 20, 22, 23,
        ]);

        const cubeVAO = gl.createVertexArray();
        gl.bindVertexArray(cubeVAO);

        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, cubeVertices, gl.STATIC_DRAW);
        gl.enableVertexAttribArray(locations.aPosition);
        gl.vertexAttribPointer(locations.aPosition, 3, gl.FLOAT, false, 0, 0);

        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, cubeIndices, gl.STATIC_DRAW);

        // =========================================================================
        // Инстансные буферы (offset, scale, color)
        // =========================================================================
        const MAX_INSTANCES = 200; // достаточно для кубов + статики
        const instanceOffsetBuffer = gl.createBuffer();
        const instanceScaleBuffer = gl.createBuffer();
        const instanceColorBuffer = gl.createBuffer();

        const offsetsArray = new Float32Array(MAX_INSTANCES * 3);
        const scalesArray = new Float32Array(MAX_INSTANCES * 3);
        const colorsArray = new Float32Array(MAX_INSTANCES * 3);

        gl.bindBuffer(gl.ARRAY_BUFFER, instanceOffsetBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, offsetsArray, gl.DYNAMIC_DRAW);
        gl.enableVertexAttribArray(locations.aInstanceOffset);
        gl.vertexAttribPointer(locations.aInstanceOffset, 3, gl.FLOAT, false, 0, 0);
        gl.vertexAttribDivisor(locations.aInstanceOffset, 1);

        gl.bindBuffer(gl.ARRAY_BUFFER, instanceScaleBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, scalesArray, gl.DYNAMIC_DRAW);
        gl.enableVertexAttribArray(locations.aInstanceScale);
        gl.vertexAttribPointer(locations.aInstanceScale, 3, gl.FLOAT, false, 0, 0);
        gl.vertexAttribDivisor(locations.aInstanceScale, 1);

        gl.bindBuffer(gl.ARRAY_BUFFER, instanceColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, colorsArray, gl.DYNAMIC_DRAW);
        gl.enableVertexAttribArray(locations.aInstanceColor);
        gl.vertexAttribPointer(locations.aInstanceColor, 3, gl.FLOAT, false, 0, 0);
        gl.vertexAttribDivisor(locations.aInstanceColor, 1);

        gl.bindVertexArray(null);

        // =========================================================================
        // Конфигурация коридора
        // =========================================================================
      //  const CORRIDOR_WIDTH = 4.0;
     //   const CORRIDOR_HEIGHT = 3.0;
       // const CUBE_SIZE = 0.8;
       // const MAX_CUBES = 20;           // движущиеся кубы
     //   const VISIBLE_CUBES = 5;        // одновременно активных
        const SPAWN_DISTANCE = -20.0;   // кубы спавнятся далеко впереди (камера смотрит в -Z)
        const DESPAWN_DISTANCE = 3.0;   // когда уходит за камеру — деактивируется
     //   const CORRIDOR_SPEED = 4.0;

        // Статические элементы (пол, потолок, стены) — сегменты, повторяющиеся вдоль Z
        // Чтобы коридор выглядел бесконечным, сегменты двигаются так же, как кубы.
        // Проще всего сделать их «длинными» и двигать вместе с кубами через тот же пул.
        // Но чтобы не усложнять — сделаем 4 статических объекта огромной длины,
        // которые просто едут навстречу камере.
      //  const SEGMENT_LENGTH = 60.0; // длина каждого сегмента стены

        // Пул кубов (движущиеся)
        /*
        const cubePool = [];
        for (let i = 0; i < MAX_CUBES; i++) {
            cubePool.push({ offset: [0,0,0], color: [0,0,0], active: false });
        }
*/

	// =========================================================================
// Конфигурация
// =========================================================================
const CORRIDOR_WIDTH = 4.0;
const CORRIDOR_HEIGHT = 3.0;
const CUBE_SIZE = 0.8;
const MAX_CUBES = 20;
const VISIBLE_CUBES = 5;
const CORRIDOR_SPEED = 6.0;      // скорость полёта камеры
const SPAWN_AHEAD = 40.0;        // на сколько впереди камеры спавнить кубы
const DESPAWN_BEHIND = 5.0;      // на сколько позади камеры деактивировать
const SEGMENT_LENGTH = 40.0;     // длина сегмента стены

// Камера летит в -Z. Стартуем в 0 и уменьшаем.
let cameraZ = 0;

// Пул кубов — мировые координаты, не двигаются
const cubePool = [];
for (let i = 0; i < MAX_CUBES; i++) {
    cubePool.push({ x:0, y:0, z:0, color:[0,0,0], active:false });
}

// Статические сегменты — 4 штуки, каждый повторяется вдоль Z.
// Храним их мировые Z-позиции в массиве и переставляем вперёд по мере прохождения.
const staticSegmentsBase = [
    { x: 0,                    y: -CORRIDOR_HEIGHT/2, scale: [CORRIDOR_WIDTH, 0.1, SEGMENT_LENGTH], color: [0.10,0.10,0.12] }, // пол
    { x: 0,                    y:  CORRIDOR_HEIGHT/2, scale: [CORRIDOR_WIDTH, 0.1, SEGMENT_LENGTH], color: [0.08,0.08,0.10] }, // потолок
    { x: -CORRIDOR_WIDTH/2,    y: 0,                  scale: [0.1, CORRIDOR_HEIGHT, SEGMENT_LENGTH], color: [0.09,0.09,0.11] }, // левая
    { x:  CORRIDOR_WIDTH/2,    y: 0,                  scale: [0.1, CORRIDOR_HEIGHT, SEGMENT_LENGTH], color: [0.09,0.09,0.11] }, // правая
];

// Для каждого базового сегмента — массив текущих Z-позиций (например, 2 копии)
const SEGMENTS_PER_TYPE = 2;
const segmentZs = []; // segmentZs[typeIndex] = [z0, z1]
for (let i = 0; i < staticSegmentsBase.length; i++) {
    const arr = [];
    for (let k = 0; k < SEGMENTS_PER_TYPE; k++) {
        arr.push(-k * SEGMENT_LENGTH); // 0, -40
    }
    segmentZs.push(arr);
}

// =========================================================================
// Логика: камера летит, объекты стоят, «отставшие» переставляются вперёд
// =========================================================================
function updateWorld(deltaTime) {
    // 1. Двигаем камеру вперёд (в -Z)
    cameraZ -= CORRIDOR_SPEED * deltaTime;

    // 2. Кубы: если куб оказался позади камеры — переставляем вперёд
    for (const cube of cubePool) {
        if (!cube.active) continue;
        // Куб «позади», если его Z больше, чем cameraZ + DESPAWN_BEHIND
        if (cube.z > cameraZ + DESPAWN_BEHIND) {
            cube.active = false; // деактивируем, спавн ниже подхватит
        }
    }

    // 3. Спавн: добираем активные кубы до VISIBLE_CUBES
    let activeCount = 0;
    for (const c of cubePool) if (c.active) activeCount++;

    while (activeCount < VISIBLE_CUBES) {
        // Ищем свободный слот
        let slot = null;
        for (const c of cubePool) {
            if (!c.active) { slot = c; break; }
        }
        if (!slot) break; // пул переполнен (не должно случиться)

        slot.active = true;
        slot.x = (Math.random() - 0.5) * (CORRIDOR_WIDTH - CUBE_SIZE - 0.2);
        slot.y = (Math.random() - 0.5) * (CORRIDOR_HEIGHT - CUBE_SIZE - 0.2);
        // Спавним впереди камеры на случайное расстояние, чтобы не все в одной плоскости
        slot.z = cameraZ - SPAWN_AHEAD - Math.random() * 10.0;
        slot.color = [
            0.4 + Math.random() * 0.6,
            0.4 + Math.random() * 0.6,
            0.4 + Math.random() * 0.6
        ];
        activeCount++;
    }

    // 4. Сегменты стен: каждый сегмент, который оказался позади камеры,
    //    переставляем на SEGMENT_LENGTH вперёд.
    for (let t = 0; t < staticSegmentsBase.length; t++) {
        for (let k = 0; k < SEGMENTS_PER_TYPE; k++) {
            if (segmentZs[t][k] > cameraZ + SEGMENT_LENGTH * 0.5) {
                // Находим минимальный Z среди копий этого типа и ставим на SEGMENT_LENGTH позади него
                let minZ = Infinity;
                for (let kk = 0; kk < SEGMENTS_PER_TYPE; kk++) {
                    if (segmentZs[t][kk] < minZ) minZ = segmentZs[t][kk];
                }
                segmentZs[t][k] = minZ - SEGMENT_LENGTH;
            }
        }
    }
}

function updateInstanceBuffers() {
    let idx = 0;

    // Статические сегменты: 4 типа × SEGMENTS_PER_TYPE копий
    for (let t = 0; t < staticSegmentsBase.length; t++) {
        const seg = staticSegmentsBase[t];
        for (let k = 0; k < SEGMENTS_PER_TYPE; k++) {
            offsetsArray[idx*3+0] = seg.x;
            offsetsArray[idx*3+1] = seg.y;
            offsetsArray[idx*3+2] = segmentZs[t][k];
            scalesArray[idx*3+0] = seg.scale[0];
            scalesArray[idx*3+1] = seg.scale[1];
            scalesArray[idx*3+2] = seg.scale[2];
            colorsArray[idx*3+0] = seg.color[0];
            colorsArray[idx*3+1] = seg.color[1];
            colorsArray[idx*3+2] = seg.color[2];
            idx++;
        }
    }

    // Активные кубы
    for (const cube of cubePool) {
        if (!cube.active) continue;
        offsetsArray[idx*3+0] = cube.x;
        offsetsArray[idx*3+1] = cube.y;
        offsetsArray[idx*3+2] = cube.z;
        scalesArray[idx*3+0] = CUBE_SIZE;
        scalesArray[idx*3+1] = CUBE_SIZE;
        scalesArray[idx*3+2] = CUBE_SIZE;
        colorsArray[idx*3+0] = cube.color[0];
        colorsArray[idx*3+1] = cube.color[1];
        colorsArray[idx*3+2] = cube.color[2];
        idx++;
    }

    // Прячем хвост
    for (let j = idx; j < MAX_INSTANCES; j++) {
        offsetsArray[j*3+2] = 10000;
        scalesArray[j*3+0] = scalesArray[j*3+1] = scalesArray[j*3+2] = 0;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, instanceOffsetBuffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, offsetsArray);
    gl.bindBuffer(gl.ARRAY_BUFFER, instanceScaleBuffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, scalesArray);
    gl.bindBuffer(gl.ARRAY_BUFFER, instanceColorBuffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, colorsArray);

    return idx;
}






























        // Статические сегменты: 4 штуки (пол, потолок, левая, правая стена)
        // Двигаются навстречу, чтобы создавать ощущение бесконечности.
        const staticSegments = [
            // пол: y = -CORRIDOR_HEIGHT/2, огромный по X и Z
            { baseOffset: [0, -CORRIDOR_HEIGHT/2, 0], scale: [CORRIDOR_WIDTH, 0.1, SEGMENT_LENGTH], color: [0.10, 0.10, 0.12] },
            // потолок
            { baseOffset: [0,  CORRIDOR_HEIGHT/2, 0], scale: [CORRIDOR_WIDTH, 0.1, SEGMENT_LENGTH], color: [0.08, 0.08, 0.10] },
            // левая стена: x = -CORRIDOR_WIDTH/2
            { baseOffset: [-CORRIDOR_WIDTH/2, 0, 0], scale: [0.1, CORRIDOR_HEIGHT, SEGMENT_LENGTH], color: [0.09, 0.09, 0.11] },
            // правая стена
            { baseOffset: [ CORRIDOR_WIDTH/2, 0, 0], scale: [0.1, CORRIDOR_HEIGHT, SEGMENT_LENGTH], color: [0.09, 0.09, 0.11] },
        ];
        // Текущее смещение статических сегментов вдоль Z (двигаются навстречу)
        let segmentZ = 0;

        // =========================================================================
        // Обновление логики
        // =========================================================================
        let spawnTimer = 0;

        function updateCubes(deltaTime) {
            // Движение кубов навстречу камере: камера в 0 смотрит в -Z, значит кубы
            // должны двигаться в сторону +Z (к камере).
            for (let i = 0; i < cubePool.length; i++) {
                const cube = cubePool[i];
                if (cube.active) {
                    cube.offset[2] += CORRIDOR_SPEED * deltaTime;
                    if (cube.offset[2] > DESPAWN_DISTANCE) {
                        cube.active = false;
                    }
                }
            }

            // Движение статических сегментов
            segmentZ += CORRIDOR_SPEED * deltaTime;
            // Когда сегмент уехал на SEGMENT_LENGTH вперёд, сбрасываем его назад
            if (segmentZ > SEGMENT_LENGTH) {
                segmentZ -= SEGMENT_LENGTH;
            }

            // Спавн кубов
            spawnTimer += deltaTime;
            const spawnInterval = 0.6;
            if (spawnTimer > spawnInterval) {
                spawnTimer = 0;
                let activeCount = 0;
                for (let i = 0; i < cubePool.length; i++) if (cubePool[i].active) activeCount++;
                if (activeCount < VISIBLE_CUBES) {
                    for (let i = 0; i < cubePool.length; i++) {
                        if (!cubePool[i].active) {
                            cubePool[i].active = true;
                            const x = (Math.random() - 0.5) * (CORRIDOR_WIDTH - CUBE_SIZE - 0.2);
                            const y = (Math.random() - 0.5) * (CORRIDOR_HEIGHT - CUBE_SIZE - 0.2);
                            const z = SPAWN_DISTANCE + Math.random() * 4.0;
                            cubePool[i].offset = [x, y, z];
                            cubePool[i].color = [
                                0.4 + Math.random() * 0.6,
                                0.4 + Math.random() * 0.6,
                                0.4 + Math.random() * 0.6
                            ];
                            break;
                        }
                    }
                }
            }
        }

        // =========================================================================
        // Матрицы
        // =========================================================================
        function perspective(fov, aspect, near, far) {
            const f = 1.0 / Math.tan(fov / 2);
            const nf = 1 / (near - far);
            return new Float32Array([
                f / aspect, 0, 0, 0,
                0, f, 0, 0,
                0, 0, (far + near) * nf, -1,
                0, 0, 2 * far * near * nf, 0
            ]);
        }

        // Классический lookAt (камера смотрит из eye в center)
        function lookAt(eye, center, up) {
            const z = normalize(subtract(eye, center));   // ось Z (назад)
            const x = normalize(cross(up, z));             // ось X
            const y = cross(z, x);                          // ось Y
            return new Float32Array([
                x[0], y[0], z[0], 0,
                x[1], y[1], z[1], 0,
                x[2], y[2], z[2], 0,
                -dot(x, eye), -dot(y, eye), -dot(z, eye), 1
            ]);
        }

        function subtract(a, b) { return [a[0]-b[0], a[1]-b[1], a[2]-b[2]]; }
        function dot(a, b) { return a[0]*b[0] + a[1]*b[1] + a[2]*b[2]; }
        function cross(a, b) { return [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]]; }
        function normalize(a) {
            const len = Math.sqrt(a[0]*a[0]+a[1]*a[1]+a[2]*a[2]);
            return len > 0 ? [a[0]/len, a[1]/len, a[2]/len] : [0,0,0];
        }

        // =========================================================================
        // Рендеринг
        // =========================================================================
        const FOG_COLOR = [0.09, 0.02, 0.04];
        const FOG_NEAR = 5.0;
        const FOG_FAR = 30.0;

        let instanceCount = 0;

        function renderScene(viewMatrix, projectionMatrix, cameraPos) {
            gl.useProgram(program);
            gl.uniformMatrix4fv(locations.uViewMatrix, false, viewMatrix);
            gl.uniformMatrix4fv(locations.uProjectionMatrix, false, projectionMatrix);
            gl.uniform3fv(locations.uCameraPos, cameraPos);
            gl.uniform3fv(locations.uFogColor, FOG_COLOR);
            gl.uniform1f(locations.uFogNear, FOG_NEAR);
            gl.uniform1f(locations.uFogFar, FOG_FAR);

            gl.bindVertexArray(cubeVAO);
            gl.drawElementsInstanced(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0, instanceCount);
            gl.bindVertexArray(null);
        }

        // =========================================================================
        // Основной цикл / WebXR
        // =========================================================================
        let xrSession = null;
        let xrRefSpace = null;
        const infoDiv = document.getElementById('info');

        if (navigator.xr) {
            navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
                if (supported) {
                    infoDiv.textContent = 'WebXR AR доступен. Нажмите кнопку для входа.';
                    const btn = document.createElement('button');
                    btn.textContent = 'Войти в AR';
                    btn.style.cssText = 'position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); padding:15px 30px; font-size:18px; z-index:101;';
                    btn.onclick = () => {
                        navigator.xr.requestSession('immersive-ar', {
                              requiredFeatures: ['local'],
							optionalFeatures: ['local-floor', 'dom-overlay'],
							domOverlay: { root: document.body }
                        }).then(onXRSessionStarted).catch((err) => {
                            console.error(err);
                            infoDiv.textContent = 'Ошибка AR: ' + err.message + '. Запуск fallback.';
                            startFallback();
                        });
                    };
                    document.body.appendChild(btn);
                } else {
                    infoDiv.textContent = 'WebXR AR не поддерживается. Fallback WebGL.';
                    startFallback();
                }
            }).catch(() => {
                infoDiv.textContent = 'Ошибка проверки WebXR. Fallback WebGL.';
                startFallback();
            });
        } else {
            infoDiv.textContent = 'WebXR не поддерживается. Fallback WebGL.';
            startFallback();
        }

        function onXRSessionStarted(session) {
            xrSession = session;
            infoDiv.textContent = 'AR сессия активна';

            const glLayer = new XRWebGLLayer(session, gl);
            session.updateRenderState({ baseLayer: glLayer });
	//session.requestReferenceSpace('local-floor')
   // .catch(() => session.requestReferenceSpace('local'))
   // .then((refSpace) => { xrRefSpace = refSpace; ... });
            session.requestReferenceSpace('local-floor').catch(() => session.requestReferenceSpace('local')).then((refSpace) => {
                xrRefSpace = refSpace;
                session.requestAnimationFrame(onXRFrame);
            }).catch(function(e){alert(e)});

            session.addEventListener('end', () => {
                xrSession = null;
                xrRefSpace = null;
                setTimeout(() => location.reload(), 1000);
            });
        }

        function onXRFrame(time, frame) {
            const session = frame.session;
            const refSpace = xrRefSpace;
            const deltaTime = 1/60;

            updateCubes(deltaTime);
            instanceCount = updateInstanceBuffers();

            const pose = frame.getViewerPose(refSpace);
            if (!pose) {
                session.requestAnimationFrame(onXRFrame);
                return;
            }

            const glLayer = session.renderState.baseLayer;
            gl.bindFramebuffer(gl.FRAMEBUFFER, glLayer.framebuffer);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.enable(gl.DEPTH_TEST);

            for (const view of pose.views) {
                const viewport = glLayer.getViewport(view);
                gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);

                const viewMatrix = view.transform.inverse.matrix;
                const cameraPos = [
                    -viewMatrix[12],
                    -viewMatrix[13],
                    -viewMatrix[14]
                ];
                renderScene(viewMatrix, view.projectionMatrix, cameraPos);
            }

            session.requestAnimationFrame(onXRFrame);
        }

		function startFallback() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let lastTime = performance.now();
    let firstFrame = true;

    function fallbackLoop(now) {
        const deltaTime = Math.min((now - lastTime) / 1000, 0.1);
        lastTime = now;

        updateWorld(deltaTime);
        instanceCount = updateInstanceBuffers();

        // Камера в мировых координатах: x=0, y=0, z=cameraZ, смотрит в -Z
        const eye = [0, 0, cameraZ];
        const viewMatrix = lookAt(eye, [0, 0, cameraZ - 1], [0, 1, 0]);

        const aspect = canvas.width / canvas.height;
        const projectionMatrix = perspective(Math.PI / 3, aspect, 0.1, 100.0);

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(FOG_COLOR[0], FOG_COLOR[1], FOG_COLOR[2], 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);

        renderScene(viewMatrix, projectionMatrix, eye);

        if (firstFrame) {
            infoDiv.textContent = `Fallback: камера летит. z=${cameraZ.toFixed(1)}`;
            firstFrame = false;
        }

        requestAnimationFrame(fallbackLoop);
    }
    requestAnimationFrame(fallbackLoop);
}
        window.addEventListener('resize', () => {
            if (!xrSession) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        });
