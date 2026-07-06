import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const pm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (pm) return

    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 30

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)

    const isM = window.innerWidth < 768
    const count = isM ? 500 : 1400
    const sGeo = new THREE.BufferGeometry()
    const sp = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 14 + Math.random() * 38
      const th = Math.random() * Math.PI * 2
      const ph = Math.acos(2 * Math.random() - 1)
      sp[i * 3] = r * Math.sin(ph) * Math.cos(th)
      sp[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th)
      sp[i * 3 + 2] = r * Math.cos(ph)
    }
    sGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3))
    const sMat = new THREE.PointsMaterial({
      color: 0xc8d8ff, size: 0.07, transparent: true, opacity: 0.6,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })
    const stars = new THREE.Points(sGeo, sMat)
    scene.add(stars)

    const oGrp = new THREE.Group()
    const oStars = [
      { x: 0, y: 4, z: 0, s: 0.55, c: 0xc8d8ff },
      { x: -3.2, y: 1.8, z: 0, s: 1.3, c: 0xffaa88 },
      { x: 3.3, y: 2, z: -0.2, s: 0.9, c: 0xc8d8ff },
      { x: -0.8, y: -1.3, z: 0.1, s: 0.8, c: 0xc8d8ff },
      { x: 0.1, y: -1.1, z: 0, s: 0.85, c: 0xc8d8ff },
      { x: 1, y: -1.3, z: -0.1, s: 0.7, c: 0xc8d8ff },
      { x: -3.2, y: -6, z: 0, s: 0.8, c: 0xc8d8ff },
      { x: 1.1, y: -6, z: -0.2, s: 1.2, c: 0xaaddff },
    ]
    const oEdges = [[0, 1], [0, 2], [1, 3], [2, 5], [3, 4], [4, 5], [3, 6], [5, 7]]
    const lMat = new THREE.MeshBasicMaterial({ color: 0xc8d8ff, transparent: true, opacity: 0.2, depthWrite: false })
    oEdges.forEach((e) => {
      const a = oStars[e[0]], b = oStars[e[1]]
      const dx = b.x - a.x, dy = b.y - a.y, dz = b.z - a.z
      const len = Math.sqrt(dx * dx + dy * dy + dz * dz)
      const lGeo = new THREE.CylinderGeometry(0.018, 0.018, len, 5)
      const line = new THREE.Mesh(lGeo, lMat)
      line.position.set((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2)
      line.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(dx, dy, dz).normalize(),
      )
      oGrp.add(line)
    })
    oStars.forEach((s) => {
      const gGeo = new THREE.SphereGeometry(s.s * 0.7, 12, 12)
      const gMat = new THREE.MeshBasicMaterial({ color: s.c, transparent: true, opacity: 0.25, depthWrite: false })
      const glow = new THREE.Mesh(gGeo, gMat)
      glow.position.set(s.x, s.y, s.z)
      oGrp.add(glow)
      const cGeo = new THREE.SphereGeometry(s.s * 0.22, 6, 6)
      const cMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85, depthWrite: false })
      const core = new THREE.Mesh(cGeo, cMat)
      core.position.set(s.x, s.y, s.z)
      oGrp.add(core)
    })
    oGrp.position.set(0, 0, -16)
    scene.add(oGrp)

    let mx = 0, my = 0, tmx = 0, tmy = 0, sy = 0

    const onMouseMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1
      my = -(e.clientY / window.innerHeight) * 2 + 1
    }
    const onScroll = () => { sy = window.scrollY }
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    document.addEventListener('mousemove', onMouseMove)
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)

    let animId: number
    function animate() {
      animId = requestAnimationFrame(animate)
      tmx += (mx - tmx) * 0.03
      tmy += (my - tmy) * 0.03
      stars.rotation.y += 0.0001
      stars.rotation.x += 0.00005
      oGrp.rotation.y += 0.0008
      oGrp.rotation.x = tmy * 0.04
      oGrp.rotation.y += tmx * 0.003
      const ss = sy * 0.00012
      stars.position.y = -ss * 2
      oGrp.position.y = -ss * 0.5
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      document.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div ref={containerRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
  )
}
