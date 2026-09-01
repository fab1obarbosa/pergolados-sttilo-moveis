import { useEffect, useRef } from "react";
import type * as THREE from "three";

/**
 * Montagem do pergolado em 3D, em loop: pilares, vigas, travessas, cobertura e
 * a pintura varrendo a estrutura no fim. Portado do projeto de design, sem os
 * rótulos de etapa, a barra de progresso e o botão de rever.
 *
 * O three entra por import dinâmico: o herói pinta primeiro, a cena chega logo
 * depois, em um chunk separado.
 */

const CICLO = 13.6; // uma volta inteira
const SAI0 = 12.0; // quando a estrutura começa a sumir para recomeçar
const SAID = 1.4;

export function Pergolado3D({ className = "" }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    let morto = false;
    let limpar = () => {};

    (async () => {
      const T = await import("three");
      if (morto || !host.current) return;

      const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // grão de madeira gerado em canvas. A cor final vem do material.
      const grao = () => {
        const c = document.createElement("canvas");
        c.width = 256;
        c.height = 1024;
        const x = c.getContext("2d")!;
        x.fillStyle = "#f2ebe0";
        x.fillRect(0, 0, 256, 1024);
        for (let i = 0; i < 160; i++) {
          const w = 1 + Math.random() * 8;
          const px = Math.random() * 256;
          x.globalAlpha = 0.05 + Math.random() * 0.13;
          x.fillStyle = Math.random() > 0.4 ? "#a4906f" : "#ffffff";
          x.beginPath();
          x.moveTo(px, 0);
          for (let y = 0; y <= 1024; y += 64) x.lineTo(px + Math.sin(y * 0.011 + i) * 5, y);
          for (let y = 1024; y >= 0; y -= 64) x.lineTo(px + w + Math.sin(y * 0.011 + i) * 5, y);
          x.closePath();
          x.fill();
        }
        x.globalAlpha = 1;
        const tex = new T.CanvasTexture(c);
        tex.wrapS = tex.wrapT = T.RepeatWrapping;
        tex.colorSpace = T.SRGBColorSpace;
        return tex;
      };

      // perfil trapezoidal da telha ondulada
      const ondulada = (width: number, length: number, period: number, rib: number) => {
        const pts: [number, number][] = [];
        const trap = (u: number) => {
          u = ((u % 1) + 1) % 1;
          if (u < 0.14) return 0;
          if (u < 0.34) return (u - 0.14) / 0.2;
          if (u < 0.66) return 1;
          if (u < 0.86) return 1 - (u - 0.66) / 0.2;
          return 0;
        };
        const x0 = -width / 2;
        const x1 = width / 2;
        const s = new T.Shape();
        s.moveTo(x0, 0);
        s.lineTo(x1, 0);
        for (let x = x1; x >= x0; x -= 0.02) pts.push([x, 0.012 + rib * trap(x / period)]);
        pts.forEach((p) => s.lineTo(p[0], p[1]));
        s.lineTo(x0, 0);
        const g = new T.ExtrudeGeometry(s, { depth: length, bevelEnabled: false, steps: 1 });
        g.translate(0, 0, -length / 2);
        g.computeVertexNormals();
        return g;
      };

      const renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = T.PCFSoftShadowMap;
      renderer.toneMapping = T.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.outputColorSpace = T.SRGBColorSpace;
      el.appendChild(renderer.domElement);
      renderer.domElement.style.cssText = "width:100%;height:100%;display:block";

      const scene = new T.Scene();
      const camera = new T.PerspectiveCamera(34, 4 / 3, 0.1, 100);

      const hemi = new T.HemisphereLight(0xd8e8ff, 0x6b4a33, 0.85);
      scene.add(hemi);
      const key = new T.DirectionalLight(0xfff0d8, 2.9);
      key.position.set(6, 8.5, 5);
      key.castShadow = true;
      key.shadow.mapSize.set(2048, 2048);
      key.shadow.camera.left = -13;
      key.shadow.camera.right = 13;
      key.shadow.camera.top = 13;
      key.shadow.camera.bottom = -13;
      key.shadow.camera.far = 40;
      key.shadow.bias = -0.0012;
      key.shadow.radius = 3;
      scene.add(key);
      const fill = new T.DirectionalLight(0xbdd4ff, 0.8);
      fill.position.set(-6, 3.5, -5);
      scene.add(fill);
      const under = new T.PointLight(0xffb877, 0, 10, 2);
      under.position.set(0, 1.7, 0.4);
      scene.add(under);
      const keyBase = 2.9;

      // chão só de sombra: a peça encosta no fundo do site em vez de flutuar
      const chao = new T.Mesh(new T.PlaneGeometry(40, 40), new T.ShadowMaterial({ opacity: 0.34 }));
      chao.rotation.x = -Math.PI / 2;
      chao.receiveShadow = true;
      scene.add(chao);

      // paleta
      const RAW = 0xcfbda2; // madeira crua, antes da pintura
      const MEL = 0xd18a46; // pilares e travessas
      const RED = 0xac532b; // vigas
      const FORRO = 0x9e4726; // face inferior lisa da cobertura
      const TELHA = 0xc1592b; // telha ondulada pintada
      const GALV = 0xcfcfc8; // aço galvanizado, ainda cru

      const madeiraTex = grao();
      const pecas: THREE.Object3D[] = [];
      const mats: THREE.MeshStandardMaterial[] = [];

      const mkWood = (rep: [number, number], fin: number) => {
        const t = madeiraTex.clone();
        t.needsUpdate = true;
        t.repeat.set(rep[0], rep[1]);
        const m = new T.MeshStandardMaterial({
          map: t,
          color: RAW,
          roughness: 0.86,
          metalness: 0.02,
          transparent: true,
        });
        m.userData = { raw: new T.Color(RAW), fin: new T.Color(fin), rr: 0.86, fr: 0.44 };
        mats.push(m);
        return m;
      };
      const mkPaint = (raw: number, fin: number, rough: number) => {
        const m = new T.MeshStandardMaterial({ color: raw, roughness: 0.6, metalness: 0.22, transparent: true });
        m.userData = { raw: new T.Color(raw), fin: new T.Color(fin), rr: 0.6, fr: rough };
        mats.push(m);
        return m;
      };
      const sombra = (o: THREE.Object3D) =>
        o.traverse((n) => {
          const m = n as THREE.Mesh;
          if (m.isMesh) {
            m.castShadow = true;
            m.receiveShadow = true;
          }
        });
      const reg = (obj: THREE.Object3D, ms: THREE.MeshStandardMaterial[], delay: number, drop: number, rise: boolean) => {
        obj.userData = { y: obj.position.y, delay, drop, rise, mats: ms };
        pecas.push(obj);
        scene.add(obj);
        sombra(obj);
      };

      // dimensões
      const S = 1.55; // meio-vão
      const PS = 0.15; // seção do pilar
      const BT = 0.08; // vão aberto no topo do pilar, igual à espessura da viga
      const CK = (PS - BT) / 2; // orelha de cada lado
      const NH = 0.32; // altura da viga e do encaixe
      const H_HI = 2.62;
      const H_LO = 2.12; // pilares de trás mais altos: caimento
      const TW = 0.1;
      const TH = 0.2;
      const NW = 0.085;

      // 01 pilares, com o vão aberto no meio do topo para a viga entrar
      const pilares: [number, number][] = [
        [-S, -S],
        [S, -S],
        [S, S],
        [-S, S],
      ];
      pilares.forEach((p, i) => {
        const h = p[1] < 0 ? H_HI : H_LO;
        const g = new T.Group();
        const mat = mkWood([1, 4], MEL);
        const base = new T.Mesh(new T.BoxGeometry(PS, h - NH, PS), mat);
        base.position.y = (h - NH) / 2;
        g.add(base);
        [-1, 1].forEach((sz) => {
          const orelha = new T.Mesh(new T.BoxGeometry(PS, NH, CK), mat);
          orelha.position.set(0, h - NH / 2, sz * (BT / 2 + CK / 2));
          g.add(orelha);
        });
        g.position.set(p[0], 0, p[1]);
        reg(g, [mat], 0.15 + i * 0.17, 2.9, true);
      });

      // 02 vigas, entrando pelo meio do pilar entre as duas orelhas
      const apoios: { z: number; top: number }[] = [];
      const vigas: [number, number][] = [
        [-S, H_HI],
        [S, H_LO],
      ];
      vigas.forEach((v, i) => {
        const z = v[0];
        const y = v[1] - NH / 2;
        const mat = mkWood([6, 1], RED);
        const g = new T.Group();
        g.add(new T.Mesh(new T.BoxGeometry(2 * S + 0.5, NH, BT), mat));
        g.position.set(0, y, z);
        reg(g, [mat], 1.75 + i * 0.28, 1.35, false);
        apoios.push({ z, top: v[1] });
      });

      // plano de caimento, no topo das vigas
      const zB = apoios[0].z;
      const zF = apoios[1].z;
      const yB = apoios[0].top;
      const yF = apoios[1].top;
      const theta = Math.atan2(yB - yF, zF - zB);
      const D = Math.hypot(zF - zB, yB - yF);
      const midY = (yB + yF) / 2;
      const midZ = (zB + zF) / 2;

      // 03 travessas, com encaixe até o meio da peça, uma a uma
      const N = 9;
      for (let i = 0; i < N; i++) {
        const x = -S - 0.15 + (i / (N - 1)) * (2 * S + 0.3);
        const mat = mkWood([1, 6], MEL);
        const g = new T.Group();
        const seg = (z0: number, z1: number, entalhe: boolean) => {
          const len = z1 - z0;
          const h = entalhe ? TH / 2 : TH;
          const m = new T.Mesh(new T.BoxGeometry(TW, h, len), mat);
          m.position.set(0, entalhe ? TH / 4 : 0, (z0 + z1) / 2);
          g.add(m);
        };
        const a = -D / 2;
        const b = D / 2;
        seg(a - 0.28, a - NW / 2, false);
        seg(a - NW / 2, a + NW / 2, true);
        seg(a + NW / 2, b - NW / 2, false);
        seg(b - NW / 2, b + NW / 2, true);
        seg(b + NW / 2, b + 0.6, false);
        g.rotation.x = theta;
        g.position.set(x, midY, midZ);
        reg(g, [mat], 2.75 + i * 0.15, 0.85, false);
      }

      // 04 cobertura: forro liso amadeirado embaixo, telha ondulada em cima
      const rw = 2 * S + 0.86;
      const rl = D + 1.05;
      const cobertura = new T.Group();
      const forroMat = mkWood([5, 5], FORRO);
      const forro = new T.Mesh(new T.BoxGeometry(rw, 0.055, rl), forroMat);
      forro.position.y = 0.0275;
      const telhaMat = mkPaint(GALV, TELHA, 0.26);
      const telha = new T.Mesh(ondulada(rw, rl, 0.17, 0.05), telhaMat);
      telha.position.y = 0.055;
      cobertura.add(forro, telha);
      cobertura.rotation.x = theta;
      const off = TH / 2 / Math.cos(theta);
      cobertura.position.set(0, midY + off, midZ + 0.1);
      reg(cobertura, [forroMat, telhaMat], 4.55, 1.9, false);

      // render
      let radK = 1; // afasta a câmera quando a coluna é estreita
      const medir = () => {
        const w = el.clientWidth;
        const h = el.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        radK = camera.aspect >= 1.3 ? 1 : 1 + (1.3 - camera.aspect) * 0.5;
      };

      const cl = (v: number) => Math.max(0, Math.min(1, v));
      const eOut = (p: number) => 1 - Math.pow(1 - p, 3);
      const eBack = (p: number) => {
        const c = 1.5;
        return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2);
      };

      const quadro = (t: number) => {
        const saida = 1 - cl((t - SAI0) / SAID);

        pecas.forEach((o) => {
          const u = o.userData as { y: number; delay: number; drop: number; rise: boolean; mats: THREE.MeshStandardMaterial[] };
          const p = cl((t - u.delay) / (u.rise ? 0.95 : 0.85));
          const e = u.rise ? eBack(p) : eOut(p);
          o.position.y = u.y - (1 - e) * u.drop;
          o.visible = p > 0 && saida > 0;
          u.mats.forEach((m) => (m.opacity = cl(p * 2.4) * saida));
        });

        // 05 acabamento: a pintura varre a estrutura e o brilho sobe
        const we = eOut(cl((t - 6.0) / 2.1));
        mats.forEach((m) => {
          const d = m.userData as { raw: THREE.Color; fin: THREE.Color; rr: number; fr: number };
          m.color.lerpColors(d.raw, d.fin, we);
          m.roughness = d.rr + (d.fr - d.rr) * we;
        });
        under.intensity = we * 2.6;
        key.intensity = keyBase * (0.82 + 0.35 * we);
        hemi.intensity = 0.85 + 0.35 * we;
        renderer.toneMappingExposure = 1.06 + 0.34 * we;

        // câmera: dolly-in durante a montagem, órbita lenta depois
        const ce = eOut(cl(t / 8.4));
        const idle = Math.max(0, t - 8.4);
        const ang = -0.78 + ce * 0.36 + Math.sin(idle * 0.13) * 0.15;
        const rad = (13.0 - ce * 4.3) * radK;
        const hgt = 0.95 + ce * 1.6 + Math.sin(idle * 0.1) * 0.12;
        camera.position.set(Math.sin(ang) * rad, hgt, Math.cos(ang) * rad);
        camera.lookAt(0, 1.15 + ce * 0.28, 0);

        renderer.render(scene, camera);
      };

      medir();

      // com movimento reduzido, mostra a estrutura pronta e para por aí
      if (reduzido) {
        quadro(9.2);
        const ro = new ResizeObserver(() => {
          medir();
          quadro(9.2);
        });
        ro.observe(el);
        limpar = () => {
          ro.disconnect();
          renderer.dispose();
          renderer.domElement.remove();
        };
        return;
      }

      let t0 = performance.now() / 1000;
      let visivel = true;
      let anim = 0;
      const loop = () => {
        anim = requestAnimationFrame(loop);
        if (!visivel) return;
        quadro((performance.now() / 1000 - t0) % CICLO);
      };

      const ro = new ResizeObserver(() => medir());
      ro.observe(el);

      // fora da tela não gasta GPU, e volta sempre do começo da montagem
      const io = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (e.isIntersecting && !visivel) t0 = performance.now() / 1000;
            visivel = e.isIntersecting;
          }),
        { threshold: 0.08 }
      );
      io.observe(el);

      loop();

      limpar = () => {
        cancelAnimationFrame(anim);
        ro.disconnect();
        io.disconnect();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      morto = true;
      limpar();
    };
  }, []);

  return <div ref={host} className={className} aria-hidden="true" />;
}
