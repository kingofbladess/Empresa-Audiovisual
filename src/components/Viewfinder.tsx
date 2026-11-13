/** Marcas del visor de cámara: cuatro esquinas de encuadre y una cruz de centro. Son solo decoración. */
export function Viewfinder({ className = "", center = false }: { className?: string; center?: boolean }) {
  return (
    <div aria-hidden className={`vf ${className}`}>
      <i />
      <i />
      <i />
      <i />
      {center && <b />}
    </div>
  );
}
