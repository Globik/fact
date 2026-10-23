	try{
		if (typeof AFRAME === 'undefined') {
    console.error('AFRAME не загружен! Проверьте CDN.');
} else {
        AFRAME.registerComponent('corridor-tunnel', {
            init: function () {
                // Конфигурация
                const CORRIDOR_WIDTH = 4.0;
                const CORRIDOR_HEIGHT = 3.0;
                const CUBE_SIZE = 0.8;
                const MAX_CUBES = 10;
                const VISIBLE_CUBES = 5;
                const SPEED = 4.0;
                const SPAWN_AHEAD = 15.0;
                const DESPAWN_BEHIND = 2.0;
                const SEGMENT_LENGTH = 30.0;

                // Three.js объекты
                const scene = this.el.sceneEl.object3D;
                const camera = this.el.sceneEl.camera;

                // 1. Создаём геометрию и материал куба
                const geometry = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
                const material = new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: true });
                
                // 2. InstancedMesh для кубов (с цветами)
                // Нам нужно установить цвета для каждого экземпляра, поэтому используем InstancedBufferAttribute
                const instancedMesh = new THREE.InstancedMesh(geometry, material, MAX_CUBES);
                instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
                
                // Инициализация цветов
                const colors = new Float32Array(MAX_CUBES * 3);
                instancedMesh.instanceColor = new THREE.InstancedBufferAttribute(colors, 3);
                
                scene.add(instancedMesh);

                // 3. Стены/пол/потолок (используем обычные Mesh, они статичны)
                const wallMat = new THREE.MeshBasicMaterial({ color: 0x1a1a1a, side: THREE.DoubleSide });
                const floorMat = new THREE.MeshBasicMaterial({ color: 0x222222, side: THREE.DoubleSide });
                const ceilMat = new THREE.MeshBasicMaterial({ color: 0x111111, side: THREE.DoubleSide });

                // Создаём 4 длинных плоскости для коридора
                const planes = [
                    { w: CORRIDOR_WIDTH, h: SEGMENT_LENGTH, pos: [0, -CORRIDOR_HEIGHT/2, -SEGMENT_LENGTH/2], rot: [-Math.PI/2, 0, 0], mat: floorMat }, // Пол
                    { w: CORRIDOR_WIDTH, h: SEGMENT_LENGTH, pos: [0, CORRIDOR_HEIGHT/2, -SEGMENT_LENGTH/2], rot: [Math.PI/2, 0, 0], mat: ceilMat },  // Потолок
                    { w: SEGMENT_LENGTH, h: CORRIDOR_HEIGHT, pos: [-CORRIDOR_WIDTH/2, 0, -SEGMENT_LENGTH/2], rot: [0, Math.PI/2, 0], mat: wallMat }, // Левая
                    { w: SEGMENT_LENGTH, h: CORRIDOR_HEIGHT, pos: [CORRIDOR_WIDTH/2, 0, -SEGMENT_LENGTH/2], rot: [0, -Math.PI/2, 0], mat: wallMat }  // Правая
                ];
                planes.forEach(p => {
                    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(p.w, p.h), p.mat);
                    mesh.position.set(...p.pos);
                    mesh.rotation.set(...p.rot);
                    scene.add(mesh);
                });

                // Данные пула кубов (мировые координаты относительно маркера)
                // Ось Z отрицательная - "вперёд" в камеру (AR.js смотрит вниз по Z)
                this.cubes = [];
                for (let i = 0; i < MAX_CUBES; i++) {
                    this.cubes.push({ active: false, x: 0, y: 0, z: 0 });
                }
                this.cameraZ = 0; // Виртуальная позиция камеры относительно маркера

                // Временный объект для матрицы
                this.dummy = new THREE.Object3D();
                this.instancedMesh = instancedMesh;
            },

            tick: function (time, timeDelta) {
                const dt = Math.min(timeDelta / 1000, 0.1);
                const speed = 4.0;
                
                // Двигаем "виртуальную камеру" вперёд (отрицательный Z)
                this.cameraZ -= speed * dt;

                // Обновляем кубы
                let activeCount = 0;
                for (let i = 0; i < this.cubes.length; i++) {
                    const c = this.cubes[i];
                    if (c.active) {
                        // Если куб оказался позади камеры, деактивируем
                        if (c.z > this.cameraZ + 2.0) {
                            c.active = false;
                        } else {
                            activeCount++;
                        }
                    }
                }

                // Спавним новые кубы
                while (activeCount < 5) {
                    const slot = this.cubes.find(c => !c.active);
                    if (!slot) break;
                    slot.active = true;
                    slot.x = (Math.random() - 0.5) * 2.5;
                    slot.y = (Math.random() - 0.5) * 1.5;
                    slot.z = this.cameraZ - 15.0 - Math.random() * 10.0; // Спавним далеко впереди
                    activeCount++;
                }

                // Обновляем InstancedMesh
                let idx = 0;
                const colorAttr = this.instancedMesh.instanceColor;
                for (let i = 0; i < this.cubes.length; i++) {
                    const c = this.cubes[i];
                    if (c.active) {
                        this.dummy.position.set(c.x, c.y, c.z);
                        this.dummy.updateMatrix();
                        this.instancedMesh.setMatrixAt(idx, this.dummy.matrix);
                        
                        // Случайный цвет
                        const r = 0.4 + Math.random() * 0.6;
                        const g = 0.4 + Math.random() * 0.6;
                        const b = 0.4 + Math.random() * 0.6;
                        colorAttr.setXYZ(idx, r, g, b);
                        
                        idx++;
                    }
                }
                // Скрываем неиспользуемые экземпляры (перемещаем далеко)
                for (let i = idx; i < this.cubes.length; i++) {
                    this.dummy.position.set(0, 0, 10000);
                    this.dummy.updateMatrix();
                    this.instancedMesh.setMatrixAt(i, this.dummy.matrix);
                }
                this.instancedMesh.count = idx;
                this.instancedMesh.instanceMatrix.needsUpdate = true;
                this.instancedMesh.instanceColor.needsUpdate = true;

                // Обновляем позицию "виртуальной камеры" относительно маркера
                // В AR.js маркер находится в начале координат, камера смотрит вниз по -Z
                // Мы не двигаем реальную камеру, а эмулируем движение, смещая всю сцену?
                // Нет, лучше просто не двигать камеру, а двигать кубы.
                // Логика выше уже двигает кубы относительно cameraZ.
                // Но чтобы визуально кубы летели на камеру, cameraZ должен уменьшаться,
                // а кубы спавниться в cameraZ - 15. Это создаёт эффект приближения.
            }
        });
	}
    }catch(e){alert(e);}
