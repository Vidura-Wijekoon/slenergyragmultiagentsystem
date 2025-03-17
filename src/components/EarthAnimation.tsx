
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface EnergyStats {
  received: string;
  generated: string;
  lost: string;
}

interface EarthAnimationProps {
  className?: string;
}

const EarthAnimation: React.FC<EarthAnimationProps> = ({ className = "" }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  
  // Energy statistics with units
  const energyStats: EnergyStats = {
    received: "173,000 TW",      // Solar energy hitting Earth
    generated: "18 TW",          // Human energy production
    lost: "122,000 TW",          // Energy radiated back to space
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunLight.position.set(5, 3, 5);
    scene.add(sunLight);

    // Earth geometry
    const earthGeometry = new THREE.SphereGeometry(2, 32, 32);
    
    // Earth texture
    const textureLoader = new THREE.TextureLoader();
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: textureLoader.load('/earth-texture.jpg', undefined, undefined, (err) => {
        // If the texture fails to load, use a blue material instead
        if (err) {
          sphere.material = new THREE.MeshPhongMaterial({
            color: 0x1a4d7c,
            emissive: 0x072534,
            side: THREE.FrontSide,
            shininess: 50
          });
        }
      }),
      bumpMap: textureLoader.load('/earth-bump.jpg', undefined, undefined, () => {}),
      bumpScale: 0.05,
      specularMap: textureLoader.load('/earth-specular.jpg', undefined, undefined, () => {}),
      specular: new THREE.Color('grey'),
      shininess: 10
    });

    // Create Earth sphere
    const sphere = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(sphere);

    // Create atmosphere
    const atmosphereGeometry = new THREE.SphereGeometry(2.05, 32, 32);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x4ca1ff,
      transparent: true,
      opacity: 0.2,
      side: THREE.FrontSide
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Energy flow visualization (incoming solar)
    const solarEnergyGeometry = new THREE.ConeGeometry(0.8, 2, 16);
    const solarEnergyMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xffd700,
      transparent: true,
      opacity: 0.6
    });
    
    const solarEnergy = new THREE.Mesh(solarEnergyGeometry, solarEnergyMaterial);
    solarEnergy.position.set(3, 3, 3);
    solarEnergy.lookAt(0, 0, 0);
    scene.add(solarEnergy);

    // Human energy visualization (small sphere near Earth)
    const humanEnergyGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const humanEnergyMaterial = new THREE.MeshBasicMaterial({ color: 0xff4500 });
    const humanEnergy = new THREE.Mesh(humanEnergyGeometry, humanEnergyMaterial);
    humanEnergy.position.set(2.3, 0, 0);
    scene.add(humanEnergy);

    // Energy outflow visualization
    const energyOutGeometry = new THREE.ConeGeometry(0.5, 1.5, 16);
    const energyOutMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x1e90ff,
      transparent: true,
      opacity: 0.6
    });
    
    const energyOut = new THREE.Mesh(energyOutGeometry, energyOutMaterial);
    energyOut.position.set(-3, -1, -2);
    energyOut.lookAt(0, 0, 0);
    energyOut.rotateX(Math.PI);
    scene.add(energyOut);

    // Position camera
    camera.position.z = 7;

    // Animation function
    const animate = () => {
      // Earth rotation
      sphere.rotation.y += 0.002;
      atmosphere.rotation.y += 0.0015;
      
      // Pulse energy visualizations
      const pulse = Math.sin(Date.now() * 0.002) * 0.2 + 0.8;
      solarEnergy.scale.set(pulse, pulse, pulse);
      energyOut.scale.set(pulse, pulse, pulse);
      
      // Orbit human energy indicator
      const time = Date.now() * 0.001;
      humanEnergy.position.x = Math.cos(time) * 2.3;
      humanEnergy.position.z = Math.sin(time) * 2.3;
      
      renderer.render(scene, camera);
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current !== null) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose materials and geometries
      earthMaterial.dispose();
      earthGeometry.dispose();
      atmosphereMaterial.dispose();
      atmosphereGeometry.dispose();
      solarEnergyMaterial.dispose();
      solarEnergyGeometry.dispose();
      humanEnergyMaterial.dispose();
      humanEnergyGeometry.dispose();
      energyOutMaterial.dispose();
      energyOutGeometry.dispose();
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Container for the 3D Earth */}
      <div 
        ref={mountRef} 
        className="w-full h-[300px] md:h-[400px] bg-gradient-radial from-transparent to-indigo-900/20 rounded-2xl"
      />
      
      {/* Energy statistics overlay */}
      <div 
        ref={statsRef}
        className="absolute inset-0 pointer-events-none flex flex-col items-center justify-end p-4 md:p-6"
      >
        <div className="glass px-6 py-3 rounded-xl flex flex-col md:flex-row gap-4 md:gap-10 text-center md:text-left mb-4 backdrop-blur-md">
          <div className="flex flex-col">
            <span className="text-xs text-indigo-400">Solar Energy Received</span>
            <span className="font-semibold text-lg text-indigo-600">{energyStats.received}/s</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-orange-400">Human Energy Generated</span>
            <span className="font-semibold text-lg text-orange-600">{energyStats.generated}/s</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-blue-400">Energy Radiated to Space</span>
            <span className="font-semibold text-lg text-blue-600">{energyStats.lost}/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarthAnimation;
