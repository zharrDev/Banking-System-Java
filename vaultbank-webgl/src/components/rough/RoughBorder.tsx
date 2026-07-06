import React, { useEffect, useRef, useState } from 'react'
import rough from 'roughjs'
export const RoughBorder: React.FC<any> = ({children,className='',stroke='#bcccdc',strokeWidth=1.2,roughness=0.7,bowing=0.8,padding=1,seed,fill,fillStyle='hachure'})=>{
  const containerRef=useRef<HTMLDivElement>(null);const canvasRef=useRef<HTMLCanvasElement>(null);const [dims,setDims]=useState({width:0,height:0})
  useEffect(()=>{const u=()=>{if(containerRef.current){const r=containerRef.current.getBoundingClientRect();setDims({width:r.width,height:r.height})}};u();const o=new ResizeObserver(u);if(containerRef.current)o.observe(containerRef.current);return()=>o.disconnect()},[])
  useEffect(()=>{if(!canvasRef.current||!dims.width)return;const c=canvasRef.current;const dpr=window.devicePixelRatio||1;c.width=dims.width*dpr;c.height=dims.height*dpr;c.style.width=dims.width+'px';c.style.height=dims.height+'px';const ctx=c.getContext('2d');if(!ctx)return;ctx.setTransform(1,0,0,1,0,0);ctx.scale(dpr,dpr);ctx.clearRect(0,0,dims.width,dims.height);rough.canvas(c).rectangle(padding+1,padding+1,Math.max(0,dims.width-(padding+1)*2),Math.max(0,dims.height-(padding+1)*2),{stroke,strokeWidth,roughness,bowing,seed,fill,fillStyle:fill?fillStyle:undefined})},[dims,stroke,strokeWidth,roughness,bowing,padding,seed,fill,fillStyle])
  return <div ref={containerRef} className={`relative ${className}`}><canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-10"/><div className="relative z-20">{children}</div></div>
}
