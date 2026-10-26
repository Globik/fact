// ============================================================================
// МАТЕМАТИКА (Без изменений)
// ============================================================================

const MathUtils = {
    degToRad(deg) { return deg * (Math.PI / 180); },
    
    createMat4() {
        return new Float32Array([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
    },

    identity(out) {
        out.fill(0);
        out[0] = 1; out[5] = 1; out[10] = 1; out[15] = 1;
        return out;
    },

    perspective(out, fovy, aspect, near, far) {
        const f = 1.0 / Math.tan(fovy / 2);
        out.fill(0);
        out[0] = f / aspect;
        out[5] = f;
        out[11] = -1;
        out[10] = (far + near) / (near - far);
        out[14] = (2 * far * near) / (near - far);
        return out;
    },

    lookAt(out, eye, center, up) {
        let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
        let eyex = eye[0], eyey = eye[1], eyez = eye[2];
        let upx = up[0], upy = up[1], upz = up[2];
        let centerx = center[0], centery = center[1], centerz = center[2];

        if (Math.abs(eyex - centerx) < 0.000001 &&
            Math.abs(eyey - centery) < 0.000001 &&
            Math.abs(eyez - centerz) < 0.000001) {
            return this.identity(out);
        }

        z0 = eyex - centerx;
        z1 = eyey - centery;
        z2 = eyez - centerz;

        len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
        z0 *= len; z1 *= len; z2 *= len;

        x0 = upy * z2 - upz * z1;
        x1 = upz * z0 - upx * z2;
        x2 = upx * z1 - upy * z0;
        
        len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
        if (!len) {
            x0 = 0; x1 = 0; x2 = 0;
        } else {
            len = 1 / len;
            x0 *= len; x1 *= len; x2 *= len;
        }

        y0 = z1 * x2 - z2 * x1;
        y1 = z2 * x0 - z0 * x2;
        y2 = z0 * x1 - z1 * x0;

        len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
        if (!len) {
            y0 = 0; y1 = 0; y2 = 0;
        } else {
            len = 1 / len;
            y0 *= len; y1 *= len; y2 *= len;
        }

        out[0] = x0; out[1] = y0; out[2] = z0; out[3] = 0;
        out[4] = x1; out[5] = y1; out[6] = z1; out[7] = 0;
        out[8] = x2; out[9] = y2; out[10] = z2; out[11] = 0;
        
        out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
        out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
        out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
        out[15] = 1;

        return out;
    },

    multiply(out, a, b) {
        let a00=a[0],a01=a[1],a02=a[2],a03=a[3];
        let a10=a[4],a11=a[5],a12=a[6],a13=a[7];
        let a20=a[8],a21=a[9],a22=a[10],a23=a[11];
        let a30=a[12],a31=a[13],a32=a[14],a33=a[15];

        let b0=b[0],b1=b[1],b2=b[2],b3=b[3];
        out[0]=b0*a00+b1*a10+b2*a20+b3*a30;
        out[1]=b0*a01+b1*a11+b2*a21+b3*a31;
        out[2]=b0*a02+b1*a12+b2*a22+b3*a32;
        out[3]=b0*a03+b1*a13+b2*a23+b3*a33;

        b0=b[4];b1=b[5];b2=b[6];b3=b[7];
        out[4]=b0*a00+b1*a10+b2*a20+b3*a30;
        out[5]=b0*a01+b1*a11+b2*a21+b3*a31;
        out[6]=b0*a02+b1*a12+b2*a22+b3*a32;
        out[7]=b0*a03+b1*a13+b2*a23+b3*a33;

        b0=b[8];b1=b[9];b2=b[10];b3=b[11];
        out[8]=b0*a00+b1*a10+b2*a20+b3*a30;
        out[9]=b0*a01+b1*a11+b2*a21+b3*a31;
        out[10]=b0*a02+b1*a12+b2*a22+b3*a32;
        out[11]=b0*a03+b1*a13+b2*a23+b3*a33;

        b0=b[12];b1=b[13];b2=b[14];b3=b[15];
        out[12]=b0*a00+b1*a10+b2*a20+b3*a30;
        out[13]=b0*a01+b1*a11+b2*a21+b3*a31;
        out[14]=b0*a02+b1*a12+b2*a22+b3*a32;
        out[15]=b0*a03+b1*a13+b2*a23+b3*a33;
        return out;
    }
};

// ============================================================================
// ГЕНЕРАЦИЯ БЕСКОНЕЧНОЙ КОМНАТЫ (WRAP LOGIC)
// ============================================================================

class InfiniteCorridor {
    constructor(width, height, segmentLength, totalSegments) {
        this.width = width;
        this.height = height;
        this.segmentLength = segmentLength;
        this.totalSegments = totalSegments; // Сколько сегментов держать в пуле
        
        // Пул объектов: [{type: 'wall'|'floor'|'crystal', pos: [x,y,z], size: [...] }]
        this.objects = [];
        
        // Инициализация начального набора объектов
        for(let i=0; i<totalSegments; i++) {
            this.spawnSegment(i * segmentLength);
        }
    }

    spawnSegment(zStart) {
        const w = this.width;
        const h = this.height;
        const sl = this.segmentLength;
        const zEnd = zStart - sl;

        // Пол
        this.objects.push({ type: 'quad', p1:[-w/2,-h/2,zStart], p2:[w/2,-h/2,zStart], p3:[w/2,-h/2,zEnd], p4:[-w/2,-h/2,zEnd], color:[0.15, 0.18, 0.22, 1.0] });
        // Потолок
        this.objects.push({ type: 'quad', p1:[-w/2,h/2,zStart], p2:[-w/2,h/2,zEnd], p3:[w/2,h/2,zEnd], p4:[w/2,h/2,zStart], color:[0.8, 0.85, 0.9, 1.0] });
        // Левая стена
        this.objects.push({ type: 'quad', p1:[-w/2,-h/2,zStart], p2:[-w/2,h/2,zStart], p3:[-w/2,h/2,zEnd], p4:[-w/2,-h/2,zEnd], color:[0.9, 0.95, 1.0, 1.0] });
        // Правая стена
        this.objects.push({ type: 'quad', p1:[w/2,-h/2,zStart], p2:[w/2,-h/2,zEnd], p3:[w/2,h/2,zEnd], p4:[w/2,h/2,zStart], color:[0.9, 0.95, 1.0, 1.0] });

        // Кристаллы (случайно по бокам)
        if(Math.random() > 0.3) {
            const side = Math.random() > 0.5 ? 1 : -1;
            const cx = side * (w/2 - 0.8);
            const cz = zStart - sl/2;
            const cy = -h/2 + 1.5 + Math.random()*2;
            
            // Простой октаэдр как кристалл
            this.addCrystal(cx, cy, cz, 0.6, [0.4, 0.9, 1.0, 1.0]);
        }
    }

    addCrystal(cx, cy, cz, size, color) {
        // Добавляем 8 треугольников для октаэдра
        const verts = [
            [cx, cy+size, cz], [cx, cy-size, cz],
            [cx+size, cy, cz], [cx-size, cy, cz],
            [cx, cy, cz+size], [cx, cy, cz-size]
        ];
        
        // Индексы граней (Top-Front-Right, Top-Right-Back, etc.)
        const faces = [
            [0,4,2], [0,2,5], [0,5,3], [0,3,4], // Верхние
            [1,2,4], [1,5,2], [1,3,5], [1,4,3]  // Нижние
        ];

        faces.forEach(face => {
            this.objects.push({
                type: 'tri',
                p1: verts[face[0]],
                p2: verts[face[1]],
                p3: verts[face[2]],
                color: color
            });
        });
    }

    update(cameraZ) {
        // Логика "Wrap Around":
        // Если объект находится слишком далеко позади камеры (например, cameraZ - 50),
        // мы телепортируем его вперед (cameraZ + 50).
        // Это создает эффект бесконечного туннеля.
        
        const wrapRange = this.segmentLength * this.totalSegments;
        const behindLimit = cameraZ - wrapRange * 0.5;
        const aheadLimit = cameraZ + wrapRange * 0.5;

        for(let obj of this.objects) {
            // Берем среднюю Z координату объекта для проверки
            let avgZ = 0;
            if(obj.type === 'quad') {
                avgZ = (obj.p1[2] + obj.p2[2] + obj.p3[2] + obj.p4[2]) / 4;
            } else if (obj.type === 'tri') {
                avgZ = (obj.p1[2] + obj.p2[2] + obj.p3[2]) / 3;
            }

            // Если ушел далеко назад -> перебрасываем вперед
            if(avgZ < behindLimit) {
                const shift = wrapRange;
                if(obj.type === 'quad') {
                    obj.p1[2]+=shift; obj.p2[2]+=shift; obj.p3[2]+=shift; obj.p4[2]+=shift;
                } else {
                    obj.p1[2]+=shift; obj.p2[2]+=shift; obj.p3[2]+=shift;
                }
            }
            // Если ушел далеко вперед (редко бывает при движении назад) -> перебрасываем назад
            else if(avgZ > aheadLimit) {
                const shift = -wrapRange;
                if(obj.type === 'quad') {
                    obj.p1[2]+=shift; obj.p2[2]+=shift; obj.p3[2]+=shift; obj.p4[2]+=shift;
                } else {
                    obj.p1[2]+=shift; obj.p2[2]+=shift; obj.p3[2]+=shift;
                }
            }
        }
    }

    getGeometryData() {
        const verts = [];
        const uvs = [];
        const cols = [];
        const idxs = [];
        let vertIndex = 0;

        for(let obj of this.objects) {
            if(obj.type === 'quad') {
                // Два треугольника для квада
                // Треугольник 1
                verts.push(...obj.p1, ...obj.p2, ...obj.p3);
                uvs.push(0,0, 1,0, 1,1);
                cols.push(...obj.color, ...obj.color, ...obj.color);
                idxs.push(vertIndex, vertIndex+1, vertIndex+2);
                vertIndex += 3;

                // Треугольник 2
                verts.push(...obj.p1, ...obj.p3, ...obj.p4);
                uvs.push(0,0, 1,1, 0,1);
                cols.push(...obj.color, ...obj.color, ...obj.color);
                idxs.push(vertIndex, vertIndex+1, vertIndex+2);
                vertIndex += 3;

            } else if (obj.type === 'tri') {
                verts.push(...obj.p1, ...obj.p2, ...obj.p3);
                uvs.push(0.5,1, 0,0, 1,0); // Простые UV для кристаллов
                cols.push(...obj.color, ...obj.color, ...obj.color);
                idxs.push(vertIndex, vertIndex+1, vertIndex+2);
                vertIndex += 3;
            }
        }

        return {
            positions: new Float32Array(verts),
            texCoords: new Float32Array(uvs),
            colors: new Float32Array(cols),
            indices: new Uint16Array(idxs)
        };
    }
}

// ============================================================================
// WEBGL RENDERER CLASS
// ============================================================================

class RoomRenderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.gl = this.canvas.getContext('webgl', { antialias: true, alpha: false });
        
        if (!this.gl) {
            alert("WebGL not supported!");
            return;
        }

        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.initShaders();
        this.initState();
        
        // Камера
        this.cameraPos = [0, 0, 0]; 
        this.cameraTarget = [0, 0, -10]; 
        this.speed = 0.2; // Чуть быстрее для динамики
        this.autoMove = true;

        // Бесконечный коридор
        // Ширина 6, Высота 5, Длина сегмента 10, Всего сегментов в пуле 20 (диапазон 200 метров)
        this.corridor = new InfiniteCorridor(6, 5, 10, 20);

        // Матрицы
        this.projMatrix = MathUtils.createMat4();
        this.viewMatrix = MathUtils.createMat4();
        this.mvpMatrix = MathUtils.createMat4();

        requestAnimationFrame((t) => this.render(t));
    }

    resize() {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = this.canvas.clientWidth * dpr;
        this.canvas.height = this.canvas.clientHeight * dpr;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }

    initShaders() {
        const vsSource = document.getElementById('vs-room').textContent;
        const fsSource = document.getElementById('fs-room').textContent;

        this.program = this.createProgram(vsSource, fsSource);
        
        this.locAttribPos = this.gl.getAttribLocation(this.program, 'aPosition');
        this.locAttribTex = this.gl.getAttribLocation(this.program, 'aTexCoord');
        this.locAttribCol = this.gl.getAttribLocation(this.program, 'aColor');

        this.locUniformMVP = this.gl.getUniformLocation(this.program, 'uMvpMatrix');
        this.locUniformTexture = this.gl.getUniformLocation(this.program, 'uTexture0');
    }

    createShader(type, source) {
        const gl = this.gl;
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error("Shader compile error:", gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    createProgram(vsSrc, fsSrc) {
        const gl = this.gl;
        const vs = this.createShader(gl.VERTEX_SHADER, vsSrc);
        const fs = this.createShader(gl.FRAGMENT_SHADER, fsSrc);
        const prog = gl.createProgram();
        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            console.error("Program link error:", gl.getProgramInfoLog(prog));
            return null;
        }
        return prog;
    }

    initState() {
        const gl = this.gl;
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clearColor(0.0, 0.0, 0.0, 1.0); 
        
        // Отключаем Cull Face, чтобы видеть все грани внутри коридора
        gl.disable(gl.CULL_FACE); 
        
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        // Белая текстура 1x1
        this.emptyTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.emptyTexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255]));
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    }

    updateCamera(dt) {
        if (this.autoMove) {
            let dx = this.cameraTarget[0] - this.cameraPos[0];
            let dy = this.cameraTarget[1] - this.cameraPos[1];
            let dz = this.cameraTarget[2] - this.cameraPos[2];
            let len = Math.sqrt(dx*dx + dy*dy + dz*dz);
            
            if (len > 0.001) {
                dx /= len; dy /= len; dz /= len;
                
                this.cameraPos[0] += dx * this.speed;
                this.cameraPos[1] += dy * this.speed;
                this.cameraPos[2] += dz * this.speed;
                
                this.cameraTarget[0] = this.cameraPos[0] + dx * 10;
                this.cameraTarget[1] = this.cameraPos[1] + dy * 10;
                this.cameraTarget[2] = this.cameraPos[2] + dz * 10;
            }
        }
    }

    render(timestamp) {
        const gl = this.gl;
        
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.useProgram(this.program);

        // 1. Обновить позицию камеры
        this.updateCamera();

        // 2. Обновить геометрию коридора (Teleport objects that went too far back)
        this.corridor.update(this.cameraPos[2]);

        // 3. Получить свежие данные геометрии
        const geoData = this.corridor.getGeometryData();

        // 4. Загрузить данные в GPU буферы каждый кадр (для простоты демо)
        // В реальной игре это делалось бы через Dynamic VBO updates, но здесь проще пересоздать
        if (!this.posBuffer) {
             this.posBuffer = gl.createBuffer();
             this.texBuffer = gl.createBuffer();
             this.colBuffer = gl.createBuffer();
             this.idxBuffer = gl.createBuffer();
        }

        gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, geoData.positions, gl.DYNAMIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.texBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, geoData.texCoords, gl.DYNAMIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.colBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, geoData.colors, gl.DYNAMIC_DRAW);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.idxBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geoData.indices, gl.DYNAMIC_DRAW);

        // 5. Рассчитать матрицы
        const aspect = this.canvas.width / this.canvas.height;
        MathUtils.perspective(this.projMatrix, MathUtils.degToRad(60), aspect, 0.1, 100.0);
        MathUtils.lookAt(this.viewMatrix, this.cameraPos, this.cameraTarget, [0, 1, 0]);
        MathUtils.multiply(this.mvpMatrix, this.projMatrix, this.viewMatrix);

        gl.uniformMatrix4fv(this.locUniformMVP, false, this.mvpMatrix);

        // 6. Привязать атрибуты
        this.bindAttribute(this.locAttribPos, this.posBuffer, 3);
        this.bindAttribute(this.locAttribTex, this.texBuffer, 2);
        this.bindAttribute(this.locAttribCol, this.colBuffer, 4);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.emptyTexture);
        gl.uniform1i(this.locUniformTexture, 0);

        // 7. Отрисовать
        gl.drawElements(gl.TRIANGLES, geoData.indices.length, gl.UNSIGNED_SHORT, 0);

        requestAnimationFrame((t) => this.render(t));
    }

    bindAttribute(loc, buffer, size) {
        const gl = this.gl;
        if (loc < 0) return;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(loc);
    }
}

// Запуск
window.onload = () => {
    const renderer = new RoomRenderer('glcanvas');
    
    document.addEventListener('keydown', (e) => {
        if(e.key === ' ') renderer.autoMove = !renderer.autoMove;
        if(!renderer.autoMove) {
            const speed = 0.2;
            if(e.key === 'w') renderer.cameraPos[2] -= speed;
            if(e.key === 's') renderer.cameraPos[2] += speed;
            if(e.key === 'a') renderer.cameraPos[0] -= speed;
            if(e.key === 'd') renderer.cameraPos[0] += speed;
        }
    });
};
